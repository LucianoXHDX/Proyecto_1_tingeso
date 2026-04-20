package proyecto_tingeso_1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_tingeso_1.DTOS.BookingResponseDTO;
import proyecto_tingeso_1.entity.BookingEntity;
import proyecto_tingeso_1.entity.UserEntity;
import proyecto_tingeso_1.repository.BookingRepository;
import proyecto_tingeso_1.service.BookingService;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    BookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository){
        this.bookingRepository=bookingRepository;
    }


    










    // metodos


}
