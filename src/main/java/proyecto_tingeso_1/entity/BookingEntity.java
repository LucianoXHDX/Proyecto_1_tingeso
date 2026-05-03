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

    // Simpler than @ManyToMany — you already receive ruts as strings from the frontend
    @ElementCollection
    @CollectionTable(name = "booking_passenger_ruts", joinColumns = @JoinColumn(name = "id_booking"))
    @Column(name = "passenger_rut")
    private List<String> passengerRuts;

    private Integer numberOfPassengers; // derived from passengerRuts.size(), but stored for queries

    private String preferencePassengerBooking;

    private Integer originalPriceBooking;   // price before discounts (pricePackage * numberOfPassengers)
    private Integer discountedPriceBooking; // final price after discounts
    private Integer discountPercentage;     // total % applied
    private String discountTypeBooking;     // e.g. "GROUP, FREQUENT_CLIENT"

    private Boolean paidBooking;            // true once payment is confirmed

    @Enumerated(EnumType.STRING)
    private EnumStatusBooking bookingStatus; // PENDING, CONFIRMED, CANCELLED, EXPIRED

    @ManyToOne
    @JoinColumn(name = "id_package")
    private TravelPackagesEntity travelPackagesEntity;

    @OneToOne(mappedBy = "bookingEntity")
    private PaymentsEntity paymentsEntity;
}