package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import soa.entities.DetailsFacture;
import soa.metier.DetailFactureService;

import java.util.List;

@RestController
@RequestMapping("/api/DetailFactures")
@CrossOrigin(origins = "http://localhost:3000")
public class DetailFactureController {

    @Autowired
    private DetailFactureService detailFactureService;
    @DeleteMapping("/deleteByFactureId/{factureId}")
    public ResponseEntity<String> deleteDetailsFactureByFactureId(@PathVariable Long factureId) {
        try {
            detailFactureService.deleteDetailsFactureByFactureId(factureId);
            return ResponseEntity.ok("DetailsFacture rows deleted successfully for factureId: " + factureId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting DetailsFacture rows: " + e.getMessage());
        }
    }
    @GetMapping
    public List<DetailsFacture> getAllDetailFactures() {
        return detailFactureService.getAllDetailFactures();
    }

    @GetMapping("/{id}")
    public DetailsFacture getDetailFactureById(@PathVariable Long id) {
        return detailFactureService.getDetailFactureById(id);
    }

    @PostMapping
    public DetailsFacture saveDetailFacture(@RequestBody DetailsFacture DetailFacture) {
        return detailFactureService.saveDetailFacture(DetailFacture);
    }

    @DeleteMapping("/{id}")
    public void deleteDetailFacture(@PathVariable Long id) {
        detailFactureService.deleteDetailFacture(id);
    }
}
