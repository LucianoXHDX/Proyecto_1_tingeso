package proyecto_tingeso_1.service;

import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.BookingRequestDTO;
import proyecto_tingeso_1.DTOS.BookingResponseDTO;

import java.util.List;

@Service
public interface BookingService {
    // CRUD
    // alredy implement
    BookingResponseDTO createBooking(BookingRequestDTO requestDTO);
    // ready implent
    BookingResponseDTO getBookingById(Long id);
    // ready implemnted
    List<BookingResponseDTO> getAllBooking();
    // ready
    // BookingResponseDTO getBookingByEmail(String email);

    // BookingResponseDTO updateBooking(Long id,BookingRequestDTO requestDTO);
    // ready implemnte
    void deleteBooking(Long id);


}
