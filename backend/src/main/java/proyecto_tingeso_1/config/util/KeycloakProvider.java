package proyecto_tingeso_1.config.util;

import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;

public class KeycloakProvider {
    // setting for conexion with keycloack
    private static final String SERVEL_URL = "http://localhost:9090";

    private static final String REALM_NAME = "spring-boot-realm-tingeso";

    private static final String REAL_MASTER = "master";

    private static final String ADMIN_CLI="admin-cli";

    private static final String USER_CONSOLE = "admin";

    private static final String PASSWORD_CONSOLE = "admin";

    private static final String CLIENT_SECRET = "7cdGIdqcPYB9P4eDK5v1g6g3wfiqqk8X";



    public static RealmResource getRealResource(){
        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(SERVEL_URL)
                .realm(REAL_MASTER)
                .clientId(ADMIN_CLI)
                .username(USER_CONSOLE)
                .password(PASSWORD_CONSOLE)
                .clientSecret(CLIENT_SECRET)
                .resteasyClient(new ResteasyClientBuilderImpl()
                        .connectionPoolSize(10)
                        .build())
                .build();

        return keycloak.realm(REALM_NAME);

    }


    public static UsersResource getUserResource(){
        RealmResource realmResource = getRealResource();
        return realmResource.users();
    }








}
