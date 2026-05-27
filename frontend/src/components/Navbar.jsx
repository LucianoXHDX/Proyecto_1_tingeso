import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const Navbar = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    if (!initialized) return null;

    const isAuthenticated = keycloak.authenticated;
    const username = keycloak.tokenParsed?.preferred_username;
    const roles = keycloak.tokenParsed?.resource_access?.['spring-client-api-rest']?.roles || [];
    const isAdmin = roles.includes('admin_client_role');

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <span className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                ✈ Tingeso Travel
            </span>
            <div className="d-flex gap-2 me-auto ms-3">
                {isAuthenticated && (
                    <>
                        <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
                            Paquetes
                        </button>
                        {isAdmin && (
                            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/admin')}>
                                Panel de administracion
                            </button>
                        )}
                    </>
                )}
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/my-bookings')}>
                Mis Reservas
            </button>
            <div className="d-flex align-items-center gap-2">
                {isAuthenticated ? (
                    <>
                        <span className="text-white">
                            <i className="bi bi-person-circle"></i>
                            <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/profile')}>
                                {username}
                            </button>
                            {isAdmin && <span className="badge bg-danger">ADMIN</span>}
                        </span>
                        <button className="btn btn-outline-light btn-sm" onClick={() => keycloak.logout({ redirectUri: import.meta.env.VITE_APP_URL })}>
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-outline-light btn-sm" onClick={() => keycloak.login()}>
                            Iniciar sesión
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => keycloak.register()}>
                            Registrarse
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;