package proyecto_tingeso_1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_tingeso_1.entity.TravelPackagesEntity;

public interface TravelPackagesRepository extends JpaRepository<TravelPackagesEntity,Long> {

    //ready getters and setter
}
