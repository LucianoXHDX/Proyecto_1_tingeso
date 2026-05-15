import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
})

// This interceptor adds the Keycloak token to every request automatically
api.interceptors.request.use((config) => {
    
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});
export default api