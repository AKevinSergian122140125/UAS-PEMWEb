from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from backend.models.user import User
from backend.security import hash_password, check_password
import logging # Import modul logging

log = logging.getLogger(__name__) # Inisialisasi logger

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')
    nama_lengkap = data.get('nama_lengkap', '')

    log.info(f"Permintaan registrasi diterima untuk username: '{username}'") # Log input

    if not username or not password:
        log.warning("Field tidak lengkap: username atau password kosong.") # Log peringatan
        return Response(json_body={'error': 'Field tidak lengkap'}, status=400)

    # 🔍 Gunakan request.dbsession, bukan DBSession langsung
    existing_user = request.dbsession.query(User).filter_by(username=username).first()
    log.info(f"Hasil query untuk username '{username}': {existing_user}") # Log hasil query

    if existing_user:
        log.info(f"Username '{username}' sudah dipakai. Mengembalikan 409 Conflict.") # Log konflik
        return Response(json_body={'error': 'Username sudah dipakai'}, status=409)

    user = User(
        username=username,
        password=hash_password(password),
        nama_lengkap=nama_lengkap
    )
    try:
        request.dbsession.add(user)
        # Karena Anda menggunakan pyramid_tm, commit akan terjadi secara otomatis
        # saat request.tm.commit() dieksekusi di akhir request.
        # Jadi, tidak perlu dbsession.flush() atau dbsession.commit() di sini.
        log.info(f"User '{username}' berhasil ditambahkan ke sesi database.") # Log sukses add
        return {'message': 'User berhasil dibuat'}
    except IntegrityError as e:
        request.dbsession.rollback()
        log.error(f"IntegrityError saat menyimpan user '{username}': {e}") # Log error Integrity
        return Response(json_body={'error': 'Terjadi kesalahan saat menyimpan'}, status=500)
    except Exception as e:
        request.dbsession.rollback()
        log.error(f"Kesalahan tak terduga saat menyimpan user '{username}': {e}") # Log error umum
        return Response(json_body={'error': 'Terjadi kesalahan tak terduga'}, status=500)
    
@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')

    log.info(f"Login attempt for username: '{username}'")

    user = request.dbsession.query(User).filter_by(username=username).first()
    if not user:
        log.warning(f"User '{username}' not found.")
        return Response(json_body={'error': 'Username/password salah'}, status=401)

    if not check_password(password, user.password):
        log.warning(f"Password salah untuk user '{username}'.")
        return Response(json_body={'error': 'Username/password salah'}, status=401)

    request.session['user_id'] = user.id
    log.info(f"User '{username}' berhasil login.")
    return {'message': 'Login berhasil'}
