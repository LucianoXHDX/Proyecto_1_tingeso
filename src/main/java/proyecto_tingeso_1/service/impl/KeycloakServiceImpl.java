package proyecto_tingeso_1.service.impl;

import proyecto_tingeso_1.config.util.KeycloakProvider;
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
import proyecto_tingeso_1.service.IKeycloakService;

import java.util.*;


@Service
@Slf4j
public class KeycloakServiceImpl implements IKeycloakService {

    /**
     *
     * @return
     */
    @Override
    public List<UserRepresentation> findAllUser() {
       return KeycloakProvider.getRealResource()
               .users()
               .list();
    }

    /**
     *
     * @param username
     * @return
     */

    @Override
    public List<UserRepresentation> searchUserByUsername(String username) {
        return KeycloakProvider.getRealResource()
                .users()
                .searchByUsername(username, true);
    }

    /**
     *
     * @param userDTO
     * @return
     */
    @Override
    public String createUser(@NonNull UserDTO userDTO) {
        int status =0;
        UsersResource usersResource = KeycloakProvider.getUserResource();

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(userDTO.getEmail());
        userRepresentation.setFirstName(userDTO.getFirstName());
        userRepresentation.setLastName(userDTO.getLastName());

        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);

        // Atributos custom (rut, teléfono, nacionalidad)
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("rut", List.of(String.valueOf(userDTO.getRut())));
        attributes.put("phoneNumber", List.of(userDTO.getPhoneNumber()));
        attributes.put("nationality", List.of(userDTO.getNationality()));
        userRepresentation.setAttributes(attributes);



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

    /**
     *
     * @param userId
     */
    @Override
    public void deleteUser(String userId) {

        KeycloakProvider.getUserResource()
                .get(userId)
                .remove();

    }

    /**
     *
     * @param userId
     * @param userDTO
     */
    @Override
    public void updateUser(String userId, @NonNull   UserDTO userDTO) {

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(OAuth2Constants.PASSWORD);
        credentialRepresentation.setValue(userDTO.getPassword());

        UserRepresentation userRepresentation = new UserRepresentation();
        userRepresentation.setUsername(userDTO.getEmail());
        userRepresentation.setFirstName(userDTO.getFirstName());
        userRepresentation.setLastName(userDTO.getLastName());

        userRepresentation.setEnabled(true);
        userRepresentation.setEmailVerified(true);

        // Atributos custom (rut, teléfono, nacionalidad)
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("rut", List.of(String.valueOf(userDTO.getRut())));
        attributes.put("phoneNumber", List.of(userDTO.getPhoneNumber()));
        attributes.put("nationality", List.of(userDTO.getNationality()));
        userRepresentation.setAttributes(attributes);


        userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));

        UserResource userResource = KeycloakProvider.getUserResource().get(userId);

        userResource.update(userRepresentation);




    }
}
