package proyecto_tingeso_1.service;

import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.PaymentsDTO;
import proyecto_tingeso_1.entity.PaymentsEntity;


import java.util.List;
import java.util.Optional;

@Service
public interface PaymentsService {

    //CRUD
    PaymentsEntity create(PaymentsDTO dto);


    List<PaymentsEntity> findAll(); // ready


    Optional<PaymentsEntity> findById(Long id); // ready

    PaymentsEntity update(Long id, PaymentsDTO dto);

    void deleteById(Long id); // ready






}
