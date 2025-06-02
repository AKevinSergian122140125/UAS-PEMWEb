import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, user, logout, loading, isApiMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-wallet2 me-2"></i>
          PayEra
          {!isApiMode && (
            <span className="badge bg-warning text-dark ms-2 small">Demo</span>
          )}
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Link>
                </li>
                
                {user && (                  <li className="nav-item dropdown">
                    <button 
                      className="nav-link dropdown-toggle btn btn-link" 
                      id="navbarDropdown" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                      style={{border: 'none', background: 'none', color: 'inherit'}}
                    >
                      <i className="bi bi-person-circle me-1"></i>
                      {user.name || user.username}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><button className="dropdown-item" onClick={() => {/* Handle profile */}}><i className="bi bi-person me-1"></i>Profile</button></li>
                      <li><button className="dropdown-item" onClick={() => {/* Handle settings */}}><i className="bi bi-gear me-1"></i>Settings</button></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li>
                        <button 
                          className="dropdown-item text-danger" 
                          onClick={handleLogout}
                          disabled={loading}
                        >
                          <i className="bi bi-box-arrow-right me-1"></i>
                          {loading ? 'Logging out...' : 'Logout'}
                        </button>
                      </li>
                    </ul>
                  </li>
                )}

                {!user && (
                  <li className="nav-item">
                    <button 
                      className="btn btn-outline-light ms-3" 
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging out...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-right me-1"></i>
                          Logout
                        </>
                      )}
                    </button>
                  </li>
                )}
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
