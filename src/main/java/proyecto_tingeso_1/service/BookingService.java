package proyecto_tingeso_1.service;

import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.BookingRequestDTO;
import proyecto_tingeso_1.DTOS.BookingResponseDTO;

import java.util.List;

@Service
public interface BookingService {
    // CRUD

    BookingResponseDTO createBooking(BookingRequestDTO requestDTO);

    BookingResponseDTO getBookingById(Long id);

    List<BookingResponseDTO> getAllBooking();

    List<BookingResponseDTO> getBookingByEmail(String email);

    BookingResponseDTO updateBooking(Long id,BookingRequestDTO requestDTO);

    void deleteBooking(Long id);


}
