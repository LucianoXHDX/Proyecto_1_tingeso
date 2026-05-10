package proyecto_tingeso_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_tingeso_1.entity.UserEntity;
import proyecto_tingeso_1.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

   @GetMapping("/rut/{rut}")
   
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<UserEntity> getUserByRut(@PathVariable String rut) {
        UserEntity user = userService.getUserByRut(rut);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }
    @PreAuthorize("hasRole('admin_client_role')")
    @GetMapping("/email/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        UserEntity user = userService.findByEmail(email);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }
}
