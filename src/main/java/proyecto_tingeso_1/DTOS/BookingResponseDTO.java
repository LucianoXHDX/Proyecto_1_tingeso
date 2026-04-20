package proyecto_tingeso_1.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
// this DTO its to show the in the front
public class BookingResponseDTO {
    private Long idBooking;
    private String emailClientBooking;
    private List<String> passengerRuts;
    private int numberOfPassengers;
    private String preferencePassengerBooking;
    private Long travelPackageId;

   // these attributes its to show type of discount
    private Integer originalPrice;
    private Integer discountedPriceBooking;
    private String discountTypeBooking;
    private Integer discountPercentage;

    private Boolean paidBooking;
    private String bookingStatus;
    private Long paymentId;
}