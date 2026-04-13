package proyecto_tingeso_1.service.impl;

import com.api.rest.config.util.KeycloakProvider;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import jakarta.ws.rs.core.Response;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.UserDTO;
import proyecto_tingeso_1.service.IKeycloackService;

import java.util.List;


@Service
@Slf4j
public class KeycloakServiceImpl implements IKeycloackService {


    @Override
    public List<UserRepresentation> findAllUser() {
       return KeycloakProvider.getRealResource()
               .users()
               .list();
    }

    @Override
    public List<UserRepresentation> searchUserByUsername(String username) {
        return KeycloakProvider.getRealResource()
                .users()
                .searchByUsername(username, true);
    }

    @Override
    public String createUser(@NonNull UserDTO userDTO) {
        int status =0;
        UsersResource usersResource = KeycloakProvider.getUserResource();

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setFirstName(userDTO.getFirstname());
        userRepresentation.setLastName(userDTO.getLastname());
        userRepresentation.setEmail(userDTO.getEmail());
        userRepresentation.setUsername(userDTO.getUsername());
        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);


        Response response= usersResource.create(userRepresentation);
        status = response.getStatus();
        if (status == 201){
            String path = response.getLocation().getPath();

            String userId = path.substring(path.lastIndexOf("/") + 1);
            CredentialRepresentation credencialRepresentation = new CredentialRepresentation();
            credencialRepresentation.setTemporary(false);
            credencialRepresentation.setType(OAuth2Constants.PASSWORD);
            credencialRepresentation.setValue(userDTO.getPassword());

            usersResource.get(userId).resetPassword(credencialRepresentation);

            RealmResource realmResource = KeycloakProvider.getRealResource();

            List<RoleRepresentation> roleRepresentations = null;


            if(userDTO.getRoles()==null || userDTO.getRoles().isEmpty()){

                roleRepresentations = List.of(realmResource.roles().get("user").toRepresentation());

            }else{
                roleRepresentations = realmResource.roles()
                        .list()
                        .stream()
                        .filter(role -> userDTO.getRoles()
                                .stream()
                                .anyMatch(roleName -> roleName.equalsIgnoreCase(role.getName())))
                        .toList();
            }

            realmResource.users().get(userId)
                    .roles()
                    .realmLevel()
                    .add(roleRepresentations);
            return "User created";

        }else if(status == 409){
            log.error("User exists already");
            return  "user Exists already";
        } else {
            log.error("error creating user");
            return "error creating user";
        }





    }

    @Override
    public void deleteUser(String userId) {

    }

    @Override
    public void updateUser(String userId, UserDTO userDTO) {

    }
}
