package proyecto_tingeso_1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import proyecto_tingeso_1.Enums.EnumStatusBooking;

import java.util.List;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingEntity {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBooking;

    private String emailClientBooking;


    @ElementCollection
    @CollectionTable(name = "booking_passenger_ruts", joinColumns = @JoinColumn(name = "id_booking"))
    @Column(name = "passenger_rut")
    private List<String> passengerRuts;

    private Integer numberOfPassengers;

    private String preferencePassengerBooking;

    private Integer originalPriceBooking;
    private Integer discountedPriceBooking;
    private double discountPercentage;
    private String discountTypeBooking;

    private Boolean paidBooking;

    @Enumerated(EnumType.STRING)
    private EnumStatusBooking bookingStatus;

    @ManyToOne
    @JoinColumn(name = "id_package")
    private TravelPackagesEntity travelPackagesEntity;

    @OneToOne(mappedBy = "bookingEntity")
    private PaymentsEntity paymentsEntity;
}