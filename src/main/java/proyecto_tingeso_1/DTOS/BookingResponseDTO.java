package proyecto_tingeso_1.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {

    private Long idBooking;
    private String emailClientBooking;
    private List<String> passengerRuts;
    private Integer numberOfPassengers;

    private String preferencePassengerBooking;
    private Long travelPackageId;
    private String packageName;


    private Integer originalPriceBooking;
    private Integer discountedPriceBooking;
    private Integer discountPercentage;
    private String discountTypeBooking;


    private Boolean paidBooking;
    private String bookingStatus;


    private Long paymentId;
}