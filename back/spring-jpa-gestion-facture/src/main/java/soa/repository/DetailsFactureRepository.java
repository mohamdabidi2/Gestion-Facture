package soa.repository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import soa.entities.DetailsFacture;


public interface DetailsFactureRepository extends JpaRepository<DetailsFacture, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM DetailsFacture df WHERE df.facture.id = :factureId")
    void deleteByFactureId(Long factureId);
}