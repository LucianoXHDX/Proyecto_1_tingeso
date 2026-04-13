package proyecto_tingeso_1.controller;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_tingeso_1.DTOS.UserDTO;
import proyecto_tingeso_1.service.IKeycloakService;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/keycloak/user")
@PreAuthorize("hasRoles('admin_client_role')")

public class KeycloakController {
    @Autowired
    private IKeycloakService keycloakService;

    @GetMapping("/search")
    public ResponseEntity<?> findAllUsers(){

        return ResponseEntity.ok(keycloakService.findAllUser());
    }


    @GetMapping("/search/{username}")

    public ResponseEntity<?> finAllUsers(@PathVariable String username){
        return ResponseEntity.ok(keycloakService.searchUserByUsername(username));
    }

    @PostMapping("/create")

    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) throws URISyntaxException{
        String response = keycloakService.createUser(userDTO);
        return ResponseEntity.created(new URI("/keycloak/user/create")).body(response);

    }

    @PutMapping("/update/{userId}")


    public ResponseEntity<?> updateUser(@PathVariable String userId, @RequestBody UserDTO userDTO){
        keycloakService.updateUser(userId,userDTO);
        return ResponseEntity.ok("User update successfully");
    }



    @DeleteMapping("/update/{userId}")


    public ResponseEntity<?> deleteUser(@PathVariable String userId){
        keycloakService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }


}
