package proyecto_tingeso_1.DTOS;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import proyecto_tingeso_1.Enums.EnumSeason;
import proyecto_tingeso_1.Enums.EnumStatusPackage;
import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TravelPackagesDTO {
    private String namePackage;
    private String destinationPackage;
    private String descriptionPackage;
    private LocalDate startDatePackage;
    private LocalDate endDatePackage;
    private int pricePackage;
    private Set<String> includedServicesPackage;
    private String travelConditionsPackage;
    private int availableSlotsPackage;
    private String travelType;
    private EnumSeason enumSeason;
    private String categoryPackage;
    private EnumStatusPackage statusPackage;
}