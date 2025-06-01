from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData

# Konvensi nama yang disarankan oleh Alembic
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

# Inisialisasi metadata dengan konvensi penamaan
metadata = MetaData(naming_convention=NAMING_CONVENTION)
Base = declarative_base(metadata=metadata)

# Konfigurasi session SQLAlchemy
DBSession = scoped_session(sessionmaker())

# Fungsi untuk menghubungkan SQLAlchemy dengan Pyramid
def includeme(config):
    settings = config.get_settings()
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
