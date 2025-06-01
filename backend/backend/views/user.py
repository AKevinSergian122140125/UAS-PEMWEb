from pyramid.view import view_config
from pyramid.response import Response
from ..models import DBSession, User
import json

@view_config(route_name='create_user', renderer='json', request_method='POST')
def create_user(request):
    data = request.json_body
    user = User(
        username=data.get('username'),
        nama_lengkap=data.get('nama_lengkap'),
        password=data.get('password')  # Note: belum di-hash
    )
    DBSession.add(user)
    DBSession.flush()
    return {
        'id': user.id,
        'username': user.username,
        'nama_lengkap': user.nama_lengkap
    }
