from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from backend.models import DBSession
from backend.models.user import User
from backend.security import hash_password, check_password

@view_config(route_name='register', renderer='json', request_method='POST')
def register_view(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return Response(json_body={'error': 'Field tidak lengkap'}, status=400)

    user = User(username=username, password=hash_password(password))
    DBSession.add(user)
    try:
        DBSession.flush()
        return {'message': 'User berhasil dibuat'}
    except IntegrityError:
        DBSession.rollback()
        return Response(json_body={'error': 'Username sudah dipakai'}, status=409)

@view_config(route_name='login', renderer='json', request_method='POST')
def login_view(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')

    user = DBSession.query(User).filter_by(username=username).first()
    if not user or not check_password(password, user.password):
        return Response(json_body={'error': 'Username/password salah'}, status=401)

    request.session['user_id'] = user.id
    return {'message': 'Login berhasil'}
