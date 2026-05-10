import React, { createContext, useContext, useState, useEffect } from 'react';
import keycloak from '../services/Keycloak.js';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        keycloak
            .init({
                onLoad: 'check-sso',
                checkLoginIframe: false,
            })
            .then((authenticated) => {
                setIsAuthenticated(authenticated);

                if (authenticated) {

                    const tokenParsed = keycloak.tokenParsed;
                    setUserInfo({
                        username: tokenParsed?.preferred_username,
                        email: tokenParsed?.email,
                        name: tokenParsed?.name,
                    });


                    const clientRoles =
                        tokenParsed?.resource_access?.['spring-client-api-rest']?.roles || [];
                    setRoles(clientRoles);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error inicializando Keycloak:', err);
                setLoading(false);
            });
    }, []);

    const logout = () => {
        keycloak.logout({
            redirectUri: 'http://localhost:5173'
        });
    };

    const isAdmin = () => roles.includes('admin_client_role');
    const isUser = () => roles.includes('user_client_role');

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, userInfo, roles, loading, logout, isAdmin, isUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);