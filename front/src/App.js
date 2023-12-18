// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FactureList from './components/FactureList';
import FactureForm from './components/FactureForm';
import './App.css'
import FactureView from './components/FactureView';
import EditFactureForm from './components/EditFactureForm';

function App() {
  return (
    <Router>
      <div>
        <nav style={{color:'white',background:"black",padding:"20px"}}>
          <ul style={{display:'flex',justifyContent:"space-around",listStyleType:"none"}}>
            <li>
              <Link style={{textDecoration:"none",color:"white"}} to="/">Home</Link>
            </li>
            <li>
              <Link style={{textDecoration:"none",color:"white"}}  to="/factures">Factures</Link>
            </li>
            <li>
              <Link style={{textDecoration:"none",color:"white"}}  to="/factures/new">Create Facture</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/factures" element={<FactureList />} />
          <Route path="/factures/new" element={<FactureForm />} />
          <Route path="/factures/:factureId" element={<FactureView />} />
          <Route path="/factures/:factureId/edit" element={<EditFactureForm />} />
          <Route path="/" element={<h2 style={{textAlign:'center'}}>Welcome to the Home Page</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
