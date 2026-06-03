package proyecto_tingeso_1.service;

import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.TravelPackagesDTO;
import proyecto_tingeso_1.entity.TravelPackagesEntity;

import java.util.List;
import java.util.Optional;

@Service
public interface TravelPackagesService {
//C-> create
TravelPackagesEntity create(TravelPackagesDTO dto);


// R-> read
List<TravelPackagesEntity> findAll();

Optional<TravelPackagesEntity> findById(Long id);


// U-> update
TravelPackagesEntity update(Long id, TravelPackagesDTO dto);
// D-> delete
void deleteById(Long id);
boolean hasBookings(Long id);



}
