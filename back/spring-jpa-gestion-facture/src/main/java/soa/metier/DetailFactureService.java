package soa.metier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import soa.entities.DetailsFacture;
import soa.repository.DetailsFactureRepository;

import java.util.List;

@Service
public class DetailFactureService {

    @Autowired
    private DetailsFactureRepository detailFactureRepository;
    public void deleteDetailsFactureByFactureId(Long factureId) {
        detailFactureRepository.deleteByFactureId(factureId);}
    public List<DetailsFacture> getAllDetailFactures() {
        return detailFactureRepository.findAll();
    }

    public DetailsFacture getDetailFactureById(Long id) {
        return detailFactureRepository.findById(id).orElse(null);
    }

    public DetailsFacture saveDetailFacture(DetailsFacture detailFacture) {
        return detailFactureRepository.save(detailFacture);
    }

    public void deleteDetailFacture(Long id) {
        detailFactureRepository.deleteById(id);
    }
}