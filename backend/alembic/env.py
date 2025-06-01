from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# 🔧 Import model Base dan semua model
from backend.models import Base  # Ganti jika package-mu berbeda
from backend.models.user import User  # Tambahkan model lain jika ada

# Ambil konfigurasi dari alembic.ini
config = context.config

# Setup logger
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Penting: pastikan target_metadata menunjuk ke Base.metadata
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Jalankan migrasi dalam mode offline."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Jalankan migrasi dalam mode online (koneksi langsung DB)."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

# Deteksi mode dan jalankan fungsi migrasi yang sesuai
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
