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
    private String rut;//listo

    private String firstName;//listp
    private String lastName;//listp
    private String email;//listp
    private String password;//listp
    private String nationality;//The minimum length
    private String phoneNumber; // ready
    private boolean statusActive; // como mrda lo desactivo

    @ElementCollection
    private Set<String> role;


}
