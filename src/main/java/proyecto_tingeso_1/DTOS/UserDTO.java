package proyecto_tingeso_1.DTOS;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.Set;
@Value
@RequiredArgsConstructor
@Builder 


public class UserDTO {
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private String password;
    private Set<String> roles;





}
