# PayEra - Aplikasi Pengelolaan Keuangan Pribadi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12-green.svg)](https://www.python.org/)
[![Pyramid](https://img.shields.io/badge/Pyramid-2.0.2-orange.svg)](https://trypyramid.com/)

> **UAS PEMWEB - A Kevin Sergian (122140125)**

PayEra adalah aplikasi web modern untuk pengelolaan keuangan pribadi yang membantu pengguna mencatat, melacak, dan menganalisis pemasukan serta pengeluaran secara real-time. Dengan antarmuka yang intuitif dan responsif, aplikasi ini dirancang untuk meningkatkan kesadaran finansial dan membantu pengguna membuat keputusan keuangan yang lebih baik.

## 📖 Deskripsi Aplikasi

PayEra merupakan solusi komprehensif untuk manajemen keuangan pribadi yang menggabungkan teknologi modern dengan desain yang user-friendly. Aplikasi ini menyediakan dashboard interaktif untuk memvisualisasikan kondisi keuangan, sistem kategorisasi transaksi yang fleksibel, dan fitur pelaporan yang membantu analisis pola pengeluaran.

### 🎯 Keunggulan Utama:

- **Real-time Dashboard** dengan visualisasi data yang menarik
- **Dual Mode Operation** (API Mode & Local Mode) untuk fleksibilitas penggunaan
- **Responsive Design** yang optimal di desktop dan mobile
- **Sistem Autentikasi** yang aman menggunakan JWT
- **Kategorisasi Otomatis** untuk berbagai jenis transaksi
- **Filter & Search** yang powerful untuk analisis data

## 🛠️ Dependensi Paket (Library)

### Backend Dependencies (Python)

```txt
# Framework Web
pyramid==2.0.2                 # Web framework utama
pyramid-debugtoolbar==4.12.1   # Tools debugging untuk development
waitress==3.0.0                # WSGI server untuk production

# Database & ORM
psycopg2==2.9.9               # PostgreSQL adapter
SQLAlchemy==2.0.23            # ORM untuk database operations
alembic==1.13.1               # Database migration tool

# Authentication & Security
pyramid-jwt==1.6.1            # JWT authentication support
bcrypt==4.1.2                 # Password hashing
python-jose[cryptography]==3.3.0  # JWT token handling

# API & Middleware
pyramid-tm==2.5               # Transaction manager untuk CORS
marshmallow==3.20.2           # Serialization/deserialization

# Development & Testing
pytest==7.4.3                # Unit testing framework
pytest-cov==4.1.0            # Code coverage
webtest==3.0.0               # Web application testing
python-dotenv==1.0.0         # Environment variables management
```

### Frontend Dependencies (React)

```json
{
  "dependencies": {
    "react": "^19.1.0", // Framework UI utama
    "react-dom": "^19.1.0", // DOM rendering untuk React
    "react-router-dom": "^7.6.0", // Routing system
    "react-scripts": "5.0.1", // Build tools dan scripts

    "axios": "^1.9.0", // HTTP client untuk API calls
    "react-toastify": "^11.0.5", // Notification system

    "bootstrap": "^5.3.6", // CSS framework
    "bootstrap-icons": "^1.13.1", // Icon library

    "@testing-library/react": "^16.3.0", // Testing utilities
    "@testing-library/jest-dom": "^6.6.3", // Jest matchers
    "@testing-library/user-event": "^13.5.0", // User interaction testing
    "@testing-library/dom": "^10.4.0", // DOM testing utilities
    "web-vitals": "^2.1.4" // Performance monitoring
  }
}
```

## ✨ Fitur Aplikasi

### 🔐 1. Sistem Autentikasi

- **User Registration**: Pendaftaran akun baru dengan validasi email dan username
- **Secure Login**: Login menggunakan JWT token dengan session management
- **Protected Routes**: Perlindungan halaman dengan sistem authorization
- **User Profile Management**: Pengelolaan profil pengguna

### 💰 2. Manajemen Transaksi (CRUD)

- **Tambah Transaksi**: Form input untuk pemasukan/pengeluaran dengan validasi
- **Edit Transaksi**: Modifikasi data transaksi yang sudah ada
- **Hapus Transaksi**: Penghapusan dengan konfirmasi keamanan
- **Lihat Transaksi**: Daftar lengkap dengan pagination dan sorting

### 📊 3. Dashboard Keuangan Interaktif

- **Summary Cards**: Total pemasukan, pengeluaran, dan saldo real-time
- **Visual Indicators**: Indikator warna untuk status keuangan
- **Quick Stats**: Statistik cepat seperti rasio pengeluaran dan tingkat tabungan
- **Filtered Summary**: Ringkasan berdasarkan filter yang dipilih

### 🏷️ 4. Sistem Kategorisasi

- **Kategori Pemasukan**: Gaji, Bonus, Investasi, Bisnis, Lainnya
- **Kategori Pengeluaran**: Makanan, Transportasi, Belanja, Tagihan, Hiburan, Kesehatan, Lainnya
- **Auto-categorization**: Kategori otomatis berdasarkan jenis transaksi
- **Custom Categories**: Fleksibilitas untuk menambah kategori baru

### 🔍 5. Filter & Search System

- **Filter by Type**: Filter berdasarkan jenis (semua/pemasukan/pengeluaran)
- **Real-time Search**: Pencarian transaksi berdasarkan deskripsi
- **Date Range Filtering**: Filter berdasarkan rentang waktu
- **Combined Filters**: Kombinasi multiple filter untuk analisis detail

### 📱 6. Responsive Design

- **Mobile-First Approach**: Dioptimalkan untuk perangkat mobile
- **Adaptive Layout**: Layout yang menyesuaikan dengan ukuran layar
- **Touch-Friendly Interface**: Elemen UI yang mudah digunakan di touchscreen
- **Cross-Browser Compatibility**: Kompatibel dengan berbagai browser modern

### 🔄 7. Dual Mode Operation

- **API Mode**: Koneksi ke backend dengan real-time synchronization
- **Local Mode**: Fallback mode menggunakan localStorage untuk offline usage
- **Automatic Detection**: Deteksi otomatis ketersediaan API
- **Seamless Switching**: Perpindahan mode yang transparan untuk user

### 🧪 8. Testing & Quality Assurance

- **Unit Testing**: Coverage minimal 60% untuk komponen kritis
- **Integration Testing**: Testing API endpoints dan database operations
- **UI Testing**: Testing interaksi user dengan React Testing Library
- **Error Handling**: Comprehensive error handling dan user feedback

## 📁 Struktur Proyek

```
uaspemweb/
├── README.md                          # Dokumentasi utama
├── payera-backend/                    # Backend Python Pyramid
│   ├── alembic.ini                   # Konfigurasi database migration
│   ├── create_db.py                  # Script pembuatan database
│   ├── development.ini               # Konfigurasi development
│   ├── production.ini                # Konfigurasi production
│   ├── requirements.txt              # Dependencies Python
│   ├── run.py                        # Entry point aplikasi
│   ├── setup.py                      # Setup script
│   ├── test_api.py                   # API testing
│   ├── migrations/                   # Database migrations
│   │   ├── env.py
│   │   └── versions/
│   │       └── 039b9646e06a_initial_migration_users_and_transactions.py
│   └── payera_backend/               # Main application package
│       ├── __init__.py               # Package initialization
│       ├── routes.py                 # Route configuration
│       ├── models/                   # Data models
│       │   ├── __init__.py
│       │   ├── user.py              # User model
│       │   └── transaction.py        # Transaction model
│       ├── views/                    # API endpoints
│       │   ├── __init__.py
│       │   ├── auth.py              # Authentication endpoints
│       │   ├── default.py           # Default views
│       │   ├── transactions.py      # Transaction endpoints
│       │   └── users.py             # User management endpoints
│       └── scripts/                  # Utility scripts
│           ├── __init__.py
│           └── initialize_db.py      # Database initialization
├── payera-frontend/                   # Frontend React Application
│   ├── package.json                  # NPM dependencies
│   ├── public/                       # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── build/                        # Production build
│   └── src/                          # Source code
│       ├── App.js                    # Main application component
│       ├── App.css                   # Global styles
│       ├── index.js                  # Application entry point
│       ├── components/               # Reusable components
│       │   ├── ErrorBoundary.jsx    # Error handling component
│       │   ├── LoadingSpinner.jsx   # Loading indicator
│       │   ├── Navbar.jsx           # Navigation bar
│       │   ├── PrivateRoute.jsx     # Route protection
│       │   ├── SummaryCard.jsx      # Financial summary cards
│       │   ├── TransactionForm.jsx  # Transaction input form
│       │   └── TransactionList.jsx  # Transaction display list
│       ├── context/                  # React Context providers
│       │   ├── AuthContext.js       # Authentication context
│       │   └── TransactionContext.js # Transaction state management
│       ├── pages/                    # Page components
│       │   ├── Dashboard.jsx        # Main dashboard page
│       │   ├── Login.jsx            # Login page
│       │   └── NotFound.jsx         # 404 error page
│       └── services/                 # API services
│           └── api.js               # HTTP client configuration
```

## 📚 Referensi

### Framework & Libraries

1. **React Documentation** - [https://reactjs.org/docs](https://reactjs.org/docs)
2. **Pyramid Web Framework** - [https://trypyramid.com/](https://trypyramid.com/)
3. **SQLAlchemy ORM** - [https://www.sqlalchemy.org/](https://www.sqlalchemy.org/)
4. **Bootstrap 5** - [https://getbootstrap.com/docs/5.3/](https://getbootstrap.com/docs/5.3/)
5. **React Router** - [https://reactrouter.com/](https://reactrouter.com/)

### Authentication & Security

6. **JWT.io** - [https://jwt.io/](https://jwt.io/)
7. **bcrypt Documentation** - [https://pypi.org/project/bcrypt/](https://pypi.org/project/bcrypt/)
8. **OWASP Security Guidelines** - [https://owasp.org/](https://owasp.org/)

### Testing & Development Tools

9. **React Testing Library** - [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
10. **pytest Documentation** - [https://docs.pytest.org/](https://docs.pytest.org/)
11. **Alembic Migrations** - [https://alembic.sqlalchemy.org/](https://alembic.sqlalchemy.org/)

### UI/UX Design

12. **Bootstrap Icons** - [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)
13. **React Toastify** - [https://fkhadra.github.io/react-toastify/](https://fkhadra.github.io/react-toastify/)
14. **Material Design Guidelines** - [https://material.io/design](https://material.io/design)

### Database & API

15. **PostgreSQL Documentation** - [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
16. **RESTful API Design** - [https://restfulapi.net/](https://restfulapi.net/)
17. **Axios HTTP Client** - [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

### Development Best Practices

18. **Clean Code Principles** - Robert C. Martin
19. **React Patterns** - [https://reactpatterns.com/](https://reactpatterns.com/)
20. **Python PEP 8 Style Guide** - [https://peps.python.org/pep-0008/](https://peps.python.org/pep-0008/)

---

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 18+
- PostgreSQL 13+ (optional, SQLite included for development)

### Backend Setup

```bash
cd payera-backend
pip install -r requirements.txt
python run.py
```

### Frontend Setup

```bash
cd payera-frontend
npm install
npm start
```

### Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:6543

---

**Dikembangkan dengan ❤️ oleh Kevin Sergian (122140125) untuk UAS Pemrograman Web**
