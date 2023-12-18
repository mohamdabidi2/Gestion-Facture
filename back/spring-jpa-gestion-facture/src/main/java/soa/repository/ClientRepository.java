package soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import soa.entities.Client;



public interface ClientRepository extends JpaRepository<Client, Long> {
}