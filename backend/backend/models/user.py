from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship  # ✅ tambahkan ini
from .meta import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    nama_lengkap = Column(String)
    password = Column(String)

    transactions = relationship("Transaction", back_populates="user")
