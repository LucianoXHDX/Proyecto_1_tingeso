package proyecto_tingeso_1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_tingeso_1.entity.PaymentsEntity;

public interface PaymentsRepository extends JpaRepository<PaymentsEntity, Long> {

    //here must be SQL query

    // exmanple of query for the future
    /*@Query("SELECT p FROM PaymentsEntity p WHERE p.method = :metodoPago AND p.amount >= :montoMinimo")
    List<PaymentsEntity> buscarPorMetodoYMontoMinimo(
            @Param("metodoPago") String metodoPago,
            @Param("montoMinimo") Double montoMinimo
    );*/

}
