package soa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import soa.entities.Categorie;
import soa.entities.Produit;
import soa.entities.Responsable;
import soa.entities.Stock;
import soa.metier.ProduitMetierInterface;
import soa.repository.CategorieRepository;
import soa.repository.ProduitRepository;
import soa.repository.ResponsableRepository;
import soa.repository.StockRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class SpringJpaApplication2 {

    public static void main(String[] args) {

        ApplicationContext contexte = SpringApplication.run(SpringJpaApplication2.class, args);

    }
}
