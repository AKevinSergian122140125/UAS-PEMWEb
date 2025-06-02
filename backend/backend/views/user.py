from pyramid.view import view_config
from pyramid.response import Response
from ..models import DBSession, User
import json
import bcrypt

@view_config(route_name='create_user', renderer='json', request_method='POST')
def create_user(request):
    data = request.json_body
    hashed_pw = bcrypt.hashpw(data.get('password').encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    user = User(
        username=data.get('username'),
        nama_lengkap=data.get('nama_lengkap'),
        password=hashed_pw
    )
    DBSession.add(user)
    DBSession.flush()
    return {
        'id': user.id,
        'username': user.username,
        'nama_lengkap': user.nama_lengkap
    }
