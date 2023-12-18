package soa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import soa.entities.Client;
import soa.entities.Produit;
import soa.metier.ClientService;
import soa.metier.ProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {

    @Autowired
    private ClientService clientsService;

    @GetMapping
    public List<Client> getAllClients() {
        return clientsService.getAllClients();
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientsService.getClientById(id);
    }

    @PostMapping
    public Client saveClient(@RequestBody Client client) {
        return clientsService.saveClient(client);
    }

    @DeleteMapping("/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientsService.deleteClient(id);
    }
}
