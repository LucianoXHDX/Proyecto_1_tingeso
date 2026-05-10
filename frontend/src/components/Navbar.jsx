import React from 'react';
import { useAuth } from '../context/AuthContext';
import keycloak from '../services/Keycloak';

const Navbar = ({ currentPage, setCurrentPage }) => {
    const { isAuthenticated, userInfo, logout, isAdmin } = useAuth();

    return (
        <nav style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            borderBottom: '2px solid #e94560',
            padding: '0.8rem 1.5rem',
        }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">

                {/* Logo */}
                <span
                    className="fw-bold"
                    style={{ color: '#e94560', fontSize: '1.5rem', cursor: 'pointer', letterSpacing: '2px' }}
                    onClick={() => setCurrentPage('packages')}
                >
          ✈ TINGESO TRAVEL
        </span>

                {/* Links de navegación — solo visibles si está autenticado */}
                <div className="d-flex gap-3">
                    {isAuthenticated && (
                        <>
                            <button
                                className="btn btn-link"
                                style={{ color: currentPage === 'packages' ? '#e94560' : '#ccc', textDecoration: 'none' }}
                                onClick={() => setCurrentPage('packages')}
                            >
                                Paquetes
                            </button>
                            {isAdmin() && (
                                <button
                                    className="btn btn-link"
                                    style={{ color: currentPage === 'bookings' ? '#e94560' : '#ccc', textDecoration: 'none' }}
                                    onClick={() => setCurrentPage('bookings')}
                                >
                                    Reservas
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* Botones derecha */}
                <div className="d-flex align-items-center gap-2">
                    {isAuthenticated ? (
                        // Usuario logueado
                        <>
              <span style={{ color: '#ccc', fontSize: '0.9rem' }}>
                👤 {userInfo?.username}
                  {isAdmin() && (
                      <span className="badge ms-2" style={{ background: '#e94560', fontSize: '0.7rem' }}>
                    ADMIN
                  </span>
                  )}
              </span>
                            <button
                                className="btn btn-sm"
                                style={{ border: '1px solid #e94560', color: '#e94560', background: 'transparent' }}
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        // Usuario NO logueado
                        <>
                            <button
                                className="btn btn-sm"
                                style={{ border: '1px solid #ccc', color: '#ccc', background: 'transparent' }}
                                onClick={() => keycloak.login()}
                            >
                                Iniciar sesión
                            </button>
                            <button
                                className="btn btn-sm"
                                style={{ background: '#e94560', color: '#fff', border: 'none' }}
                                onClick={() => keycloak.register()}
                            >
                                Registrarse
                            </button>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;