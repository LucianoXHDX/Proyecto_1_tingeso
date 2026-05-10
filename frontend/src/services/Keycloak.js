import Keycloak from 'keycloak-js';
// this is for the test, u need make enviroment variable for later
const keycloak = new Keycloak({
    url: 'http://localhost:9090',
    realm: 'spring-boot-realm-tingeso',
    clientId: 'spring-client-api-rest',
});

export default keycloak;