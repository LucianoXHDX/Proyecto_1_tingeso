package proyecto_tingeso_1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.PaymentsDTO;
import proyecto_tingeso_1.entity.PaymentsEntity;
import proyecto_tingeso_1.repository.PaymentsRepository;
import proyecto_tingeso_1.service.PaymentsService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentsServiceImpl implements PaymentsService {
    PaymentsRepository paymentsRepository;

    @Autowired

    public PaymentsServiceImpl(PaymentsRepository paymentsRepository){
        this.paymentsRepository=paymentsRepository;
    }

    @Override
    public List<PaymentsEntity> findAll(){
        return this.paymentsRepository.findAll();
    }
    @Override
    public Optional<PaymentsEntity> findById(Long id){
        return this.paymentsRepository.findById(id);
    }
    @Override
    public void deleteById(Long id){
        this.paymentsRepository.deleteById(id);
    }


    //these need make work
    @Override
    public PaymentsEntity update(Long id, PaymentsDTO dto) {
        PaymentsEntity payment = paymentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No hay pagos con ese id " ));
        payment.setCardCodePayment(dto.getCardCodePayment());
        payment.setCardExpirationPayment(dto.getCardExpirationPayment());
        payment.setNameCardPayment(dto.getNameCardPayment());
        payment.setCVVPayment(dto.getCVVPayment());
        payment.setApprovedPayment(dto.isApprovedPayment());
        return paymentsRepository.save(payment);
    }
    //these need make work

    @Override
    public PaymentsEntity create(PaymentsDTO dto){

            PaymentsEntity payment = new PaymentsEntity();
            payment.setCardCodePayment(dto.getCardCodePayment());
            payment.setCardExpirationPayment(dto.getCardExpirationPayment());
            payment.setNameCardPayment(dto.getNameCardPayment());
            payment.setCVVPayment(dto.getCVVPayment());
            payment.setApprovedPayment(dto.isApprovedPayment());
            return paymentsRepository.save(payment);
    }

}
