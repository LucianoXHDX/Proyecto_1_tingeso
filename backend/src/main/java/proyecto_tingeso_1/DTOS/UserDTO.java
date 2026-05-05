package proyecto_tingeso_1.DTOS;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.Set;
@Value
@RequiredArgsConstructor
@Builder
@Data


public class UserDTO {
    private Long rut;

    private String firstName;
    private String lastName;
    private String email; // en algunos puntos sera el username

    private String phoneNumber;
    private String nationality;

    private String password;
    private Set<String> roles;





}
