import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FactureListItem from './FactureListItem';

const FactureList = () => {
  const [factures, setFactures] = useState([]);

  useEffect(() => {
    // Fetch factures from the API and set the state
    axios.get('http://localhost:8080/api/factures')
      .then(response => setFactures(response.data))
      .catch(error => console.error('Error fetching factures:', error));
  }, []);

  const handleDeleteFacture = (deletedFactureId) => {
    // Update the state by filtering out the deleted facture
    setFactures(prevFactures => prevFactures.filter(facture => facture.id !== deletedFactureId));
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Facture List</h2>
      <table border={1} width={'100%'}>
        <thead>
          <tr>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody style={{textAlign:'center'}}>
          {factures.map(facture => (
            <FactureListItem key={facture.id} facture={facture} onDeleteFacture={handleDeleteFacture} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactureList;
