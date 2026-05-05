package proyecto_tingeso_1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.TravelPackagesDTO;
import proyecto_tingeso_1.entity.TravelPackagesEntity;
import proyecto_tingeso_1.repository.TravelPackagesRepository;
import proyecto_tingeso_1.service.TravelPackagesService;

import java.util.List;
import java.util.Optional;

@Service
public class TravelPackagesServiceImpl implements TravelPackagesService {
    TravelPackagesRepository travelPackagesRepository;

    @Autowired
    public TravelPackagesServiceImpl(TravelPackagesRepository travelPackagesRepository){
        this.travelPackagesRepository=travelPackagesRepository;
    }

    @Override
    public List<TravelPackagesEntity> findAll(){

        return this.travelPackagesRepository.findAll();
    }

    @Override
    public Optional<TravelPackagesEntity> findById(Long id){
        return this.travelPackagesRepository.findById(id);
    }

    @Override
    public TravelPackagesEntity create(TravelPackagesDTO dto) {
        TravelPackagesEntity entity = new TravelPackagesEntity(
                0L, // database make this
                dto.getNamePackage(),
                dto.getDestinationPackage(),
                dto.getDescriptionPackage(),
                dto.getStartDatePackage(),
                dto.getEndDatePackage(),
                dto.getPricePackage(),
                dto.getIncludedServicesPackage(),
                dto.getTravelConditionsPackage(),
                dto.getAvailableSlotsPackage(),
                dto.getTravelType(),
                dto.getEnumSeason(),
                dto.getCategoryPackage(),
                dto.getStatusPackage(),
                null // bookingEntities
        );
        return travelPackagesRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        if (!travelPackagesRepository.existsById(id)) {
            throw new RuntimeException("TravelPackage no encontrado con id: " + id);
        }
        travelPackagesRepository.deleteById(id);
    }

    @Override
    public TravelPackagesEntity update(Long id, TravelPackagesDTO dto) {
        TravelPackagesEntity entity = travelPackagesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TravelPackage no encontrado con id: " + id));

        entity.setNamePackage(dto.getNamePackage());
        entity.setDestinationPackage(dto.getDestinationPackage());
        entity.setDescriptionPackage(dto.getDescriptionPackage());
        entity.setStartDatePackage(dto.getStartDatePackage());
        entity.setEndDatePackage(dto.getEndDatePackage());
        entity.setPricePackage(dto.getPricePackage());
        entity.setIncludedServicesPackage(dto.getIncludedServicesPackage());
        entity.setTravelConditionsPackage(dto.getTravelConditionsPackage());
        entity.setAvailableSlotsPackage(dto.getAvailableSlotsPackage());
        entity.setTravelType(dto.getTravelType());
        entity.setEnumSeason(dto.getEnumSeason());
        entity.setCategoryPackage(dto.getCategoryPackage());
        entity.setStatusPackage(dto.getStatusPackage());

        return travelPackagesRepository.save(entity);
    }



}
