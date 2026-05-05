package proyecto_tingeso_1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_tingeso_1.Enums.EnumStatusPackage;
import proyecto_tingeso_1.entity.TravelPackagesEntity;

import java.util.List;

public interface TravelPackagesRepository extends JpaRepository<TravelPackagesEntity,Long> {

    //ready getters and setter

    // with this i can find without case sensitive (CHILE=chile)
    List<TravelPackagesEntity> findByDestinationPackageContainingIgnoreCase(String destination);
    // whit this i can find by status(can be DISPONIBLE,AGOTADOO,NOVIGENTE,CANCELADO;) of package
    List<TravelPackagesEntity> findByStatusPackage(EnumStatusPackage status);


}
