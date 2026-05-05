package proyecto_tingeso_1.service;

import org.keycloak.representations.idm.UserRepresentation;
import proyecto_tingeso_1.DTOS.UserDTO;
import java.util.List;

public interface IKeycloakService {
    List<UserRepresentation> findAllUser();                           // ← corregido
    List<UserRepresentation> searchUserByUsername(String username);   // ← corregido
    String createUser(UserDTO userDTO);
    void deleteUser(String userId);
    void updateUser(String userId, UserDTO userDTO);
}