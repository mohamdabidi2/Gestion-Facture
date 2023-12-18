// src/components/FactureForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FactureForm = () => {
    const navigate = useNavigate(); 
  const [facture, setFacture] = useState({
    dateF: '',
    clientId: '', 
    clientName: '', 
    produits: [],
    totale: 0,
  });

  const [produits, setProduits] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [ClientName, setclientName] = useState("");

  useEffect(() => {
    // Fetching produits
    axios.get('http://localhost:8080/api/produits')
      .then(response => setProduits(response.data))
      .catch(error => console.error('Error fetching produits:', error));

    // Fetching clients
    axios.get('http://localhost:8080/api/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    if(name==="clientId"){
        setclientName(value)
        
    }
    setFacture(prevFacture => ({
      ...prevFacture,
      [name]: value,
    }));
  };

  const handleProduitChange = (e) => {
    setSelectedProduit(e.target.value);
  };

  const handleQuantiteChange = (e) => {
    setQuantite(parseInt(e.target.value, 10));
  };

  const handleAddProduit = () => {
    if (selectedProduit && quantite > 0) {
      const produitToAdd = produits.find(produit => produit.id.toString() === selectedProduit);
      if (produitToAdd) {
        setFacture(prevFacture => ({
          ...prevFacture,
          produits: [...prevFacture.produits, { produit: produitToAdd, quantite }],
          totale: prevFacture.totale + produitToAdd.prix * quantite,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Facture:', facture);
  
    try {
     
      const factureResponse = await axios.post('http://localhost:8080/api/factures', {
        dateF: facture.dateF,
        client: facture.clientId,
        totale: facture.totale,
        produits: facture.produits.map(item => ({
          quantite: item.quantite,
          prix: item.produit.prix,
          designation: item.produit.designation,
        })),
      });
  
      console.log('Facture Response:', factureResponse.data);
  
      const factureId =  factureResponse.data;
      for (let i = 0; i < facture.produits.length; i++) {
        const detailsResponse = await axios.post('http://localhost:8080/api/DetailFactures', {
          quantite: facture.produits[i].quantite,
          prixUnitaire: facture.produits[i].produit.prix,
          produitName: facture.produits[i].produit.designation,
          facture: factureId,
        });
  
        console.log(`Details Response ${i + 1}:`, detailsResponse.data);
      }
  
      console.log('Facture and details created successfully!');
      navigate("/factures")
      

    } catch (error) {
      console.error('Error creating facture and details:', error);
    }
  };
  

  return (
    <div className='factures'>
      <h2  style={{textAlign:"center"}} >Create Facture</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input className='inputs' type="date" name="dateF" value={facture.dateF} onChange={handleChange} required />

        <label>Client:</label>
        <select  className='inputs'  name="clientId" value={facture.clientId} onChange={handleChange} required>
          <option value="" disabled>Select a client</option>
          {clients.map(client => (
            <option key={client.id} value={client.name}>{client.name}</option>
          ))}
        </select>

        <label>Produits:</label>
        <select  className='inputs'  value={selectedProduit} onChange={handleProduitChange}>
          <option value="" disabled>Select a produit</option>
          {produits.map(produit => (
            <option key={produit.id} value={produit.id}>{produit.designation}</option>
          ))}
        </select>

        <label>Quantite:</label>
        <input  className='inputs'  type="number" name="quantite" value={quantite} onChange={handleQuantiteChange} min="1" required />

        <button type="button" onClick={handleAddProduit}  className='buttons'>Add Produit</button>

        <h3>Facture Details:</h3>
        <table border={1} width={"300px"}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantite</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {facture.produits.map((item, index) => (
              <tr key={index}>
                <td>{item.produit.designation}</td>
                <td>{item.quantite}</td>
                <td>{item.produit.prix}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>Total: {facture.totale}</p>

        <button className='buttons' type="submit">Create Facture</button>
      </form>
    </div>
  );
};

export default FactureForm;
