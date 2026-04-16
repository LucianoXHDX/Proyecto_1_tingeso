package proyecto_tingeso_1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_tingeso_1.entity.BookingEntity;

public interface BookingRepository extends JpaRepository<BookingEntity,Long> {
    // W this repo I have getters and setter
}
