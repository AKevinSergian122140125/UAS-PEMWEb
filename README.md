# UAS-PEMWEB
# A KEVIN SERGIAN
# 122140125

# PayEra – Aplikasi Pengelolaan Keuangan Pribadi

PayEra adalah aplikasi web yang membantu pengguna mencatat dan mengelola pemasukan serta pengeluaran secara mudah dan terstruktur. Dengan tampilan antarmuka yang responsif dan fitur pelaporan sederhana, aplikasi ini ditujukan untuk meningkatkan kesadaran finansial pengguna secara harian.

---

## 🔧 Teknologi yang Digunakan

### Backend:
- Python Pyramid
- PostgreSQL
- SQLAlchemy
- Pyramid RESTful Routing
- Unit Testing (pytest)

### Frontend:
- React JS
- React Router DOM
- Axios
- Tailwind CSS (atau Bootstrap)

---

## ✨ Fitur Aplikasi

- **Autentikasi Pengguna**
  - Login sederhana untuk keamanan dasar.
  
- **Manajemen Transaksi (CRUD)**
  - Tambah, lihat, edit, dan hapus pemasukan/pengeluaran.
  
- **Manajemen Kategori Transaksi (CRUD)**
  - Kelompokkan transaksi dalam kategori seperti Makanan, Transportasi, Gaji, dll.
  
- **Dashboard Ringkasan Keuangan**
  - Menampilkan total pemasukan, pengeluaran, dan saldo akhir.
  - Diagram pie/bar untuk distribusi pengeluaran per kategori.

- **Responsif**
  - Tampilan UI adaptif untuk desktop dan mobile.

- **Unit Test**
  - Coverage minimal 60% untuk endpoint dan fungsi penting.

---

## 🗃️ Struktur Proyek
/backend
├── payera/
├── models/
├── routes/
├── tests/
└── main.py

/frontend
├── src/
├── components/
├── pages/
├── services/
└── App.jsx

