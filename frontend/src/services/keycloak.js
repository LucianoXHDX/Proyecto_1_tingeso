import Keycloak from 'keycloak-js';

// Limpiar ISS duplicado de la URL al cargar
if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const issValues = hash.match(/iss=[^&]*/g);
    if (issValues && issValues.length > 1) {
        const cleanHash = hash.replace(/&iss=[^&]*/g, '').replace(/iss=[^&]*&/, '');
        window.history.replaceState(null, '', window.location.pathname + '#' + cleanHash);
    }
}

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export default keycloak;