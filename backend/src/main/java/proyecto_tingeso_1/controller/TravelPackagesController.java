package proyecto_tingeso_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import proyecto_tingeso_1.DTOS.TravelPackagesDTO;
import proyecto_tingeso_1.entity.TravelPackagesEntity;
import proyecto_tingeso_1.service.TravelPackagesService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/travel-packages")
public class TravelPackagesController {

    private final TravelPackagesService travelPackagesService;

    @Autowired
    public TravelPackagesController(TravelPackagesService travelPackagesService) {
        this.travelPackagesService = travelPackagesService;
    }


    @GetMapping
    // this will be the only one with public access
    public ResponseEntity<List<TravelPackagesEntity>> getAll() {
        return ResponseEntity.ok(travelPackagesService.findAll());
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('user_client_role') or hasRole('admin_client_role')")
    public ResponseEntity<TravelPackagesEntity> getById(@PathVariable Long id) {
        return travelPackagesService.findById(id)
                .map(travelPackage -> ResponseEntity.ok(travelPackage))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<TravelPackagesEntity> create(@RequestBody TravelPackagesDTO dto) {
        TravelPackagesEntity created = travelPackagesService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<TravelPackagesEntity> update(
            @PathVariable Long id,
            @RequestBody TravelPackagesDTO dto) {
        try {
            return ResponseEntity.ok(travelPackagesService.update(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            travelPackagesService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}