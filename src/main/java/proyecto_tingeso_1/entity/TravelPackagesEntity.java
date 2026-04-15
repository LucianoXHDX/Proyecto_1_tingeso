package proyecto_tingeso_1.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import proyecto_tingeso_1.Enums.EnumSeason;
import proyecto_tingeso_1.Enums.EnumStatusPackage;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "TravelPackages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackagesEntity {
    @Id
    @Column(unique = true, nullable = false)
    private long idPackage;

    private String namePackage;
    private String destinationPackage;
    private String descriptionPackage;
    private LocalDate startDatePackage;
    private LocalDate endDatePackage;
    private int pricePackage;
    @ElementCollection
    private Set<String> includedServicesPackage;
    private String travelConditionsPackage;
    private int availableSlotsPackage;
    // esto igual deberia se con un enums que permite la validacion de los datos entregado
    private String travelType;

    @Enumerated(EnumType.STRING)
    private EnumSeason enumSeason;
    // categoria tambien o si no el front jugar con botones o lista como fingeso
    private String categoryPackage;

    @Enumerated(EnumType.STRING)
    private EnumStatusPackage statusPackage;



}
