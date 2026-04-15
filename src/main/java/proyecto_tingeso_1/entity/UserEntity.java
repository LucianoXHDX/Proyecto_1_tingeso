package proyecto_tingeso_1.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    @Column(unique = true, nullable = false)
    private String rut;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String nationality;
    private String phoneNumber;
    private boolean statusActive;

    @ElementCollection
    private Set<String> role;


}
