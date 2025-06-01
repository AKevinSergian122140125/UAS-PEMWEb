from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

from .meta import Base  # ✅ Gunakan Base dari meta
from .user import User
from .transaction import Transaction
from .mymodel import MyModel  # flake8: noqa

DBSession = scoped_session(sessionmaker())

configure_mappers()

def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)

def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory

def get_tm_session(session_factory, transaction_manager, request=None):
    dbsession = session_factory(info={"request": request})
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager
    )
    return dbsession

def includeme(config):
    settings = config.get_settings()
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    config.include('pyramid_tm')
    config.include('pyramid_retry')

    dbengine = settings.get('dbengine')
    if not dbengine:
        dbengine = get_engine(settings)

    session_factory = get_session_factory(dbengine)
    config.registry['dbsession_factory'] = session_factory

    def dbsession(request):
        dbsession = request.environ.get('app.dbsession')
        if dbsession is None:
            dbsession = get_tm_session(
                session_factory, request.tm, request=request
            )
        return dbsession

    config.add_request_method(dbsession, reify=True)
