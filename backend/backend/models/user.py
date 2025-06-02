from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .meta import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    nama_lengkap = Column(String(150), nullable=False)
    password = Column(String(128), nullable=False)

    transactions = relationship("Transaction", back_populates="user")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"
