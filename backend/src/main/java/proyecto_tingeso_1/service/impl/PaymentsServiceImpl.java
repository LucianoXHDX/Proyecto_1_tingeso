package proyecto_tingeso_1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.PaymentsDTO;
import proyecto_tingeso_1.Enums.EnumStatusBooking;
import proyecto_tingeso_1.Enums.EnumStatusPackage;
import proyecto_tingeso_1.entity.BookingEntity;
import proyecto_tingeso_1.entity.PaymentsEntity;
import proyecto_tingeso_1.entity.TravelPackagesEntity;
import proyecto_tingeso_1.repository.BookingRepository;
import proyecto_tingeso_1.repository.PaymentsRepository;
import proyecto_tingeso_1.repository.TravelPackagesRepository;
import proyecto_tingeso_1.service.PaymentsService;


import java.util.List;
import java.util.Optional;

@Service
public class PaymentsServiceImpl implements PaymentsService {



    private final PaymentsRepository paymentsRepository;
    private final BookingRepository bookingRepository;
    private final TravelPackagesRepository travelPackagesRepository;
    @Autowired
    public PaymentsServiceImpl(PaymentsRepository paymentsRepository,
                               BookingRepository bookingRepository, TravelPackagesRepository travelPackagesRepository) {
        this.paymentsRepository = paymentsRepository;
        this.bookingRepository = bookingRepository;
        this.travelPackagesRepository = travelPackagesRepository;
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
    public PaymentsEntity create(PaymentsDTO dto) {
        // search for bookinh
        BookingEntity booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // make entity
        PaymentsEntity payment = new PaymentsEntity();
        payment.setCardCodePayment(dto.getCardCodePayment());
        payment.setCardExpirationPayment(dto.getCardExpirationPayment());
        payment.setNameCardPayment(dto.getNameCardPayment());
        payment.setCVVPayment(dto.getCVVPayment());
        payment.setApprovedPayment(true);  // its for aproved apyment
        payment.setBookingEntity(booking); // fk of booking

        PaymentsEntity saved = paymentsRepository.save(payment);

        //this its for update booking
        booking.setPaidBooking(true);
        booking.setBookingStatus(EnumStatusBooking.CONFIRMED);
        booking.setPaymentsEntity(saved);
        bookingRepository.save(booking);
        //this its for discount avalaible slots
        TravelPackagesEntity travelPackage = booking.getTravelPackagesEntity();
        int nuevoscupos = travelPackage.getAvailableSlotsPackage() - booking.getNumberOfPassengers();
        travelPackage.setAvailableSlotsPackage(nuevoscupos);
        if (nuevoscupos == 0) {
            travelPackage.setStatusPackage(EnumStatusPackage.AGOTADO);
        }
        travelPackagesRepository.save(travelPackage);

        return saved;
    }

}
