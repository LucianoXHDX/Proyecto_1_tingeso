package proyecto_tingeso_1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.BookingRequestDTO;
import proyecto_tingeso_1.DTOS.BookingResponseDTO;
import proyecto_tingeso_1.Enums.EnumStatusBooking;
import proyecto_tingeso_1.Enums.EnumStatusPackage;
import proyecto_tingeso_1.entity.BookingEntity;
import proyecto_tingeso_1.entity.TravelPackagesEntity;
import proyecto_tingeso_1.entity.UserEntity;
import proyecto_tingeso_1.repository.BookingRepository;
import proyecto_tingeso_1.repository.TravelPackagesRepository;
import proyecto_tingeso_1.service.BookingService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final TravelPackagesRepository travelPackagesRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              TravelPackagesRepository travelPackagesRepository) {
        this.bookingRepository = bookingRepository;
        this.travelPackagesRepository = travelPackagesRepository;
    }



    @Override
    public List<BookingResponseDTO> getAllBooking(){
        List<BookingEntity> bookingEntitiesList = bookingRepository.findAll();

        return bookingEntitiesList.stream()
                .map(booking-> this.mapToDTO(booking))
                .collect(Collectors.toList());
    }
    @Override
    public BookingResponseDTO getBookingById(Long id){
        BookingEntity bookingEntity = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró la reserva con ID: " + id));
        BookingResponseDTO responseDTO = this.mapToDTO(bookingEntity);
        return responseDTO;
    }

    @Override
    public BookingResponseDTO getBookingByEmail(String email){
        BookingEntity bookingEntity = bookingRepository.findByEmail( email)
                .orElseThrow(()-> new RuntimeException("no hay una resrva asociada a ese email"));
        BookingResponseDTO responseDTO = this.mapToDTO(bookingEntity);
        return responseDTO;
    }
    @Override
    public void deleteBooking(Long id){
        if(!bookingRepository.existsById(id)){
            throw new RuntimeException("No hay una resreva asociada a ese id");
        }
        bookingRepository.deleteById(id);
    }

@Override
        public BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO){
            TravelPackagesEntity travelPackages = travelPackagesRepository
                    .findById(bookingRequestDTO.getTravelPackageId())
                    .orElseThrow(()-> new RuntimeException("paquete no ecnotrado"));



            if(travelPackages.getStatusPackage() != EnumStatusPackage.DISPONIBLE){
                throw new RuntimeException("Packete no disponible en este momento");
            }
            int numberOfPassenger = bookingRequestDTO.getNumberOfPassanger();

            if(numberOfPassenger > travelPackages.getAvailableSlotsPackage()){
                throw new RuntimeException("La cantidad de pasajeros supera los cupos disponibles.");
            }

            travelPackages.setAvailableSlotsPackage(travelPackages.getAvailableSlotsPackage() - numberOfPassenger);
            if(travelPackages.getAvailableSlotsPackage() == 0){
                travelPackages.setStatusPackage(EnumStatusPackage.AGOTADO);
            }
            travelPackagesRepository.save(travelPackages);

            BookingEntity bookingEntity = new BookingEntity();
            int originalPrice = travelPackages.getPricePackage() * numberOfPassenger;
            if(numberOfPassenger >= 4 ) {
            bookingEntity.setDiscountPercentage(10);
            int discountedPriceBooking = (int) (originalPrice * 0.90);
            bookingEntity.setDiscountedPriceBooking(discountedPriceBooking);
            bookingEntity.setDiscountTypeBooking("Descuento por gente");

            }else {
                bookingEntity.setDiscountPercentage(0);
                bookingEntity.setDiscountedPriceBooking(originalPrice);
                bookingEntity.setDiscountTypeBooking("NONE");
            }

            bookingEntity.setEmailClientBooking(bookingRequestDTO.getEmailClientBooking());
            bookingEntity.setPassengerRuts(bookingRequestDTO.getPassangerRuts());
            bookingEntity.setNumberOfPassengers(numberOfPassenger);
            bookingEntity.setPreferencePassengerBooking(bookingRequestDTO.getPreferencePassangerBooking());
            bookingEntity.setTravelPackagesEntity(travelPackages);
            bookingEntity.setOriginalPriceBooking(originalPrice);


            bookingEntity.setPaidBooking(false);
            bookingEntity.setBookingStatus(EnumStatusBooking.PENDING);

            BookingEntity saved = bookingRepository.save(bookingEntity);

            //now i need make a dto response to show in front

            return new BookingResponseDTO(
                    saved.getIdBooking(),
                    saved.getEmailClientBooking(),
                    saved.getPassengerRuts(),
                    saved.getNumberOfPassengers(),
                    saved.getPreferencePassengerBooking(),
                    saved.getTravelPackagesEntity().getIdPackage(),
                    saved.getTravelPackagesEntity().getNamePackage(),
                    saved.getOriginalPriceBooking(),
                    saved.getDiscountedPriceBooking(),
                    saved.getDiscountPercentage(),
                    saved.getDiscountTypeBooking(),
                    saved.getPaidBooking(),
                    saved.getBookingStatus().name(),
                    null
            );


        }

    // Entity → bookingResponseDTO mapper
    private BookingResponseDTO mapToDTO(BookingEntity entity) {
        BookingResponseDTO dto = new BookingResponseDTO();

        dto.setIdBooking(entity.getIdBooking());
        dto.setEmailClientBooking(entity.getEmailClientBooking());
        dto.setPassengerRuts(entity.getPassengerRuts());
        dto.setNumberOfPassengers(entity.getNumberOfPassengers());
        dto.setPreferencePassengerBooking(entity.getPreferencePassengerBooking());

        dto.setTravelPackageId(entity.getTravelPackagesEntity().getIdPackage());
        dto.setPackageName(entity.getTravelPackagesEntity().getNamePackage());

        dto.setOriginalPriceBooking(entity.getOriginalPriceBooking());
        dto.setDiscountedPriceBooking(entity.getDiscountedPriceBooking());
        dto.setDiscountPercentage(entity.getDiscountPercentage());
        dto.setDiscountTypeBooking(entity.getDiscountTypeBooking());

        dto.setPaidBooking(entity.getPaidBooking());
        dto.setBookingStatus(entity.getBookingStatus().name());


        if (entity.getPaymentsEntity() != null) {
            dto.setPaymentId(entity.getPaymentsEntity().getIdPayments());
        } else {
            dto.setPaymentId(null);
        }

        return dto;
    }



}
