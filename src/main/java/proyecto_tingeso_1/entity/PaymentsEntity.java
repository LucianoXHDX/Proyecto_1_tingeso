package proyecto_tingeso_1.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PaymentsEntity{
    @Id
    @Column(unique = true,nullable = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPayments;

    private Integer CardCodePayment;
    private Date cardExpirationPayment;
    private String nameCardPayment;
    private Integer CVVPayment;
    private boolean approvedPayment;


    @OneToOne
    @JoinColumn(name = "idBooking", unique = true)
    private BookingEntity bookingEntity;



}
