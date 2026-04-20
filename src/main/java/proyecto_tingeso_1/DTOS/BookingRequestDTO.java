package proyecto_tingeso_1.DTOS;



// this class it s for send daata to backend, like the most importatn to create a booking

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private String emailClientBooking;
    private List<String> passangerRuts;
    private Integer numberOfPassanger;
    private String preferencePassangerBooking;
    private Long travelPackageId; // u will extract it from front, when usser select a package







}
