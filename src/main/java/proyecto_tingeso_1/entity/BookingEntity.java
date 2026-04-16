package proyecto_tingeso_1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name= "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingEntity {
    @Id

    @Column(unique = true,nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idBooking;

    private String emailClientBooking;
    private List<UserEntity> passengerBooking;
    private String preferencePassengerBooking;
    private Integer DiscountedPriceBooking;
    private String discountTypeBooking;
    private Boolean PaidBooking;

    @ManyToOne
    @JoinColumn(name = "idPackage")
    private TravelPackagesEntity travelPackagesEntity;

    @OneToOne(mappedBy = "idBooking")
    private PaymentsEntity paymentsEntity;



}
