package proyecto_tingeso_1.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_tingeso_1.entity.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByRut(String rut); // ya aplicada
    boolean existsByRut(String rut); 

    UserEntity findByEmail(String email);
    boolean existsByEmail(String email);


    List<UserEntity> findAllByNationality(String nationality);

    List<UserEntity> findAll(); // ya aplicada
}
