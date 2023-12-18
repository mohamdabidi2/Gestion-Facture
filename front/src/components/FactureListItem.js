import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FactureListItem = ({ facture, onDeleteFacture }) => {
  const deleteDetailsFactureByFactureId = async (factureId) => {
    try {
      await axios.delete(`http://localhost:8080/api/DetailFactures/deleteByFactureId/${factureId}`);
      await axios.delete(`http://localhost:8080/api/factures/${factureId}`);
      
      // Notify the parent component to update the list
      onDeleteFacture(factureId);
    } catch (error) {
      console.error('Error deleting DetailsFacture rows:', error.message);
    }
  };

  return (
    <tr>
      <td>{facture.client}</td>
      <td>{facture.dateF}</td>
      <td>{facture.totale}</td>
      <td>
        <Link to={`/factures/${facture.id}`}>View</Link>
      </td>
      <td>
        <Link to={`/factures/${facture.id}/edit`}>Edit</Link>
      </td>
      <td>
        <button onClick={() => { deleteDetailsFactureByFactureId(facture.id); }}>Delete</button>
      </td>
    </tr>
  );
};

export default FactureListItem;
