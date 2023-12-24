import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditFactureForm = () => {
    const navigate = useNavigate();
    const { factureId } = useParams();
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        setLoading(true);

        // Fetch facture details by ID
        axios.get(`http://localhost:8080/api/factures/${factureId}`)
            .then(response => {
                setFacture(response.data);
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching facture details:', error))
            .finally(() => setLoading(false));
           
            axios.get(`http://localhost:8080/api/DetailFactures`)
            .then(response => {
             setFacture(prevFacture => ({ ...prevFacture, produits: response.data.filter(el=>el.facture.id==factureId)}))})
            .catch(error => console.error('Error fetching details:', error));
         

        // Fetching produits
        axios.get('http://localhost:8080/api/produits')
            .then(response => setProduits(response.data))
            .catch(error => console.error('Error fetching produits:', error));

        // Fetching clients
        axios.get('http://localhost:8080/api/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, [factureId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    const handleAddProduct = () => {
        if (selectedProduit && quantite > 0) {
            const produitToAdd = produits.find(produit => produit.id.toString() === selectedProduit);

            if (produitToAdd) {
                let factureDetails={
                    quantite:quantite,
                    prixUnitaire:produitToAdd.prix,
                    facture:facture,
                    produitName:produitToAdd.designation

                }
             axios.post("http://localhost:8080/api/DetailFactures",factureDetails).then(res=>console.log(res.data)).then(res=>
             
             {
                let  newfacture={
                    id:facture.id,
                    dateF: facture.dateF,
                    client: facture.client,
                    totale: facture.totale+(produitToAdd.prix*quantite),
              
                }
                axios.post(`http://localhost:8080/api/factures`,newfacture)
                .then(
                    res=>{
                 
                        axios.get(`http://localhost:8080/api/factures/${factureId}`)
                        .then(response => {
                            setFacture(response.data);
                            console.log(response.data)
                            axios.get(`http://localhost:8080/api/DetailFactures`)
                            .then(response => {
                             setFacture(prevFacture => ({ ...prevFacture, produits: response.data.filter(el=>el.facture.id==factureId)}))
                            
                            
                            })
                            .catch(error => console.error('Error fetching details:', error));
                        })
                        .catch(error => console.error('Error fetching facture details:', error))
                                .finally(() => setLoading(false));
            
                      
                    }
                )
             }
             )
            }
        }
    };

    const handleDeleteProduct = (item) => {
      let x= window.confirm('Êtes-vous sûr de vouloir supprimer cet élément de la facture ?')
if(x){
    axios.delete('http://localhost:8080/api/DetailFactures/'+item.id).then(res=>
 
  {
    let  newfacture={
        id:facture.id,
        dateF: facture.dateF,
        client: facture.client,
        totale: facture.totale-(item.prixUnitaire*item.quantite),
  
    }
    axios.post(`http://localhost:8080/api/factures`,newfacture)
    .then(
        res=>{
     
            axios.get(`http://localhost:8080/api/factures/${factureId}`)
            .then(response => {
                setFacture(response.data);
                console.log(response.data)
                axios.get(`http://localhost:8080/api/DetailFactures`)
                .then(response => {
                 setFacture(prevFacture => ({ ...prevFacture, produits: response.data.filter(el=>el.facture.id==factureId)}))
                
                
                })
                .catch(error => console.error('Error fetching details:', error));
            })
            .catch(error => console.error('Error fetching facture details:', error))
                    .finally(() => setLoading(false));

          
        }
    )
   
   
}
    )
}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting Edited Facture:', facture);
    };

    return (
        loading ? "loading" :
            <div style={{textAlign:"center",display:"flex",justifyContent:"center",flexDirection:"column"}} className="">
                <h2  style={{textAlign:"center"}} >Edit Facture {factureId}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="dateF" className="form-label">Date:</label>
                        <br/>
                        <input type="text" id="dateF"  className='inputs' disabled value={facture.dateF} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="clientName" className="form-label">Client Name:</label>
                        <br/>
                        <input type="text" id="clientName"  className='inputs' disabled value={facture.client} />
                    </div>

                
                 

                 

                    <h3 className="mt-4">Facture Details:</h3>
                    <table className="table table-bordered" border={1} width={"300px"}>
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Quantite</th>
                                <th>Prix</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {facture.produits && facture.produits.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.produitName}</td>
                                    <td>{item.quantite}</td>
                                    <td>{item.prixUnitaire}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteProduct(item)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mb-3">
                        <label htmlFor="selectedProduit" className="form-label">Ajouter Nouveau Produit</label>
                        <br/>
                        <select id="selectedProduit"  className='inputs' value={selectedProduit} onChange={handleProduitChange}>
                            <option value="" disabled>Select a produit</option>
                            {produits.map(produit => (
                                <option key={produit.id} value={produit.id}>{produit.designation}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantite" className="form-label">Quantite:</label>
                        <br/>
                        <input type="number" id="quantite"  className='inputs' value={quantite} onChange={handleQuantiteChange} min="1" required />
                    </div>
                    <button type="button" className='buttons' onClick={handleAddProduct}>Ajouter Nouveau Produit</button>

                    <p>Total: {facture.totale}</p>

                    <button type="submit" className='buttons'>Update Facture</button>
                </form>
            </div>
    );
};

export default EditFactureForm;
