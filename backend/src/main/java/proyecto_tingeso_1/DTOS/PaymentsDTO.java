package proyecto_tingeso_1.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PaymentsDTO {



    private long idPayments; // I will leave this, later I can give it to the user to query of her paymets

    private Integer CardCodePayment;
    private Date cardExpirationPayment;
    private String nameCardPayment;
    private Integer CVVPayment;
    private boolean approvedPayment;






}
