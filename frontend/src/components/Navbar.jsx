import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const Navbar = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();

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
                        <button className= "btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
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

            <div className="d-flex align-items-center gap-2">
                {isAuthenticated ? (
                    <>
                        <span className="text-white">
                            <i className="bi bi-person-circle"></i>
                            {username}
                            {isAdmin && <span className="badge bg-danger">ADMIN</span>}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={() => keycloak.logout({ redirectUri: 'http://localhost:5173' })}>
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