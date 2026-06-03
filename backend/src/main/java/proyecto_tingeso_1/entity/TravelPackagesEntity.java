package proyecto_tingeso_1.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import proyecto_tingeso_1.Enums.EnumSeason;
import proyecto_tingeso_1.Enums.EnumStatusPackage;

import java.time.LocalDate;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "TravelPackages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackagesEntity {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private String travelType;

    @Enumerated(EnumType.STRING)
    private EnumSeason enumSeason;

    private String categoryPackage;

    @Enumerated(EnumType.STRING)
    private EnumStatusPackage statusPackage;

    @OneToMany(mappedBy = "travelPackagesEntity")
    @JsonManagedReference
    private List<BookingEntity> bookingEntities;



}
