# backend/__init__.py

from pyramid.session import SignedCookieSessionFactory
from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession, Base

import logging
log = logging.getLogger(__name__)

def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Setup Jinja2
    config.include('pyramid_jinja2')
    config.include('pyramid_tm')

    # Setup Database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)

    # ✅ Routes Umum
    config.add_route('home', '/')

    # ✅ Routes Autentikasi
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')

    # ✅ Routes User CRUD
    config.add_route('create_user', '/api/users')             # POST
    config.add_route('get_users', '/api/users')               # GET
    config.add_route('get_user', '/api/users/{id}')           # GET by ID
    config.add_route('update_user', '/api/users/{id}')        # PUT
    config.add_route('delete_user', '/api/users/{id}')        # DELETE

    # ✅ Routes Transaksi
    config.add_route('transactions', '/api/transactions')              # GET, POST
    config.add_route('transaction_id', '/api/transactions/{id}')      # PUT, DELETE

    # ✅ Include semua view dan models
    config.include('backend.models')
    config.include('backend.views')

    # ✅ Scan decorator @view_config
    config.scan()

    log.info("Route 'login' telah ditambahkan.")

    my_session_factory = SignedCookieSessionFactory('ini_rahasia_kunci_session')
    config.set_session_factory(my_session_factory)


    return config.make_wsgi_app()
