// FactureView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FactureView = () => {
  const navigate = useNavigate();
  const { factureId } = useParams();
  const [facture, setFacture] = useState({});
  const [details, setDetails] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:8080/api/factures/${factureId}`)
      .then(response => {
        setFacture(response.data)})
      .catch(error => console.error('Error fetching facture:', error));


    axios.get(`http://localhost:8080/api/DetailFactures`)
      .then(response => {
        console.log(response.data.filter(el=>el.facture.id==factureId));setDetails(response.data.filter(el=>el.facture.id==factureId))})
      .catch(error => console.error('Error fetching details:', error));
  }, [factureId]);

  return (
    <div>
      <h2>Facture Details</h2>
      <p>Nom Client: {facture.client}</p>
      <p>Date: {facture.dateF}</p>
      <p>Totale: {facture.totale}</p>

      <h3>Facture Details:</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantite</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item, index) => (
            <tr key={index}>
              <td>{item.produitName}</td>
              <td>{item.quantite}</td>
              <td>{item.prixUnitaire}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactureView;
