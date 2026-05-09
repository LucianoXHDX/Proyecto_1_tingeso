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

    private String rut;
    private String firstName;
    private String lastName;
    private String email;

    private String phoneNumber;
    private String nationality;







}
