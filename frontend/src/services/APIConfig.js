import axios from 'axios';
import keycloak from './Keycloak';


const api = axios.create({
    baseURL: '/api/v1',
});


api.interceptors.request.use(
    async (config) => {

        if (keycloak.isTokenExpired(30)) {
            await keycloak.updateToken(30);
        }

        if (keycloak.token) {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            keycloak.login();
        }
        if (error.response?.status === 403) {
            console.error('Sin permisos para esta acción');
        }
        return Promise.reject(error);
    }
);

export default api;
