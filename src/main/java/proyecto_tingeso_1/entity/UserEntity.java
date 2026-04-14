package proyecto_tingeso_1.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long rut;

    private String name;
    private String lastName;
    private String email;
    private String numberPhone;
    private String nationality;

    private String role;


}
