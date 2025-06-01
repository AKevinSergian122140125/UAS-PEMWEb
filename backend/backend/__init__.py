# backend/__init__.py

from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession, Base

def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Setup Jinja2
    config.include('pyramid_jinja2')

    # Setup Database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)

    # ✅ Tambahkan semua route yang digunakan
    config.add_route('home', '/')
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.add_route('create_user', '/api/users')  # jika ada view user
    config.add_route('transactions', '/api/transactions')
    config.add_route('transaction_id', '/api/transactions/{id}')  # ✅ ini penting

    config.include('backend.models')
    config.include('backend.views')

    config.scan()
    return config.make_wsgi_app()
