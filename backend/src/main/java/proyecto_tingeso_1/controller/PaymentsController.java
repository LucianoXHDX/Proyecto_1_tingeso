package proyecto_tingeso_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proyecto_tingeso_1.DTOS.PaymentsDTO;
import proyecto_tingeso_1.entity.PaymentsEntity;
import proyecto_tingeso_1.service.PaymentsService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
public class PaymentsController {

    @Autowired
    private PaymentsService paymentsService;

    @GetMapping
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<List<PaymentsEntity>> getAllPayments() {
        return ResponseEntity.ok(paymentsService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('user_client_role') or hasRole('admin_client_role')")
    public ResponseEntity<PaymentsEntity> getPaymentById(@PathVariable Long id) {
        return paymentsService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('user_client_role') or hasRole('admin_client_role')")
    public ResponseEntity<PaymentsEntity> createPayment(@RequestBody PaymentsDTO paymentsDTO) {
        PaymentsEntity created = paymentsService.create(paymentsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<PaymentsEntity> updatePayment(@PathVariable Long id, @RequestBody PaymentsDTO paymentsDTO) {
        PaymentsEntity updated = paymentsService.update(id, paymentsDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin_client_role')")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentsService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
