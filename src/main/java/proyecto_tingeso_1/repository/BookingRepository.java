package proyecto_tingeso_1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_tingeso_1.entity.BookingEntity;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookingEntity,Long> {
    // W this repo I have getters and setter


    Optional<BookingEntity> findByEmail(String email);
}
