import express from "express";

const app = express();
// MODIFICATION RENDER : On laisse Render choisir le port, sinon on utilise 3000
const port = process.env.PORT || 3000;

// Pour que l'API comprenne le JSON
app.use(express.json());

// --- NOTRE BASE DE DONNÉES (En mémoire) ---
let comptes = [
    { id: 1, nom: "Alice", solde: 5000 },
    { id: 2, nom: "Bob", solde: 10000 }
];

// --- NOUVELLE PAGE D'ACCUEIL POUR LE PROFESSEUR ---
app.get('/', (req, res) => {
    // J'ai mis un peu de style (HTML/CSS) pour que ça fasse très professionnel
    res.send(`
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f7f6; min-height: 100vh;">
            <div style="max-width: 600px; margin: 40px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h1 style="color: #2c3e50; margin-bottom: 5px;">Bienvenue sur l'API Bancaire ! 🚀</h1>
                <h2 style="color: #2980b9; margin-top: 0;">Réalisé par : <strong>TSAKEM CHELLA</strong></h2>
                <p style="font-size: 16px; color: #7f8c8d;">L'API est en ligne et fonctionne parfaitement.</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                
                <h3 style="color: #27ae60;">Test rapide (Navigateur) :</h3>
                <a href="/api/comptes" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 25px;">
                    👉 Cliquez ici pour voir la liste des comptes
                </a>
                
                <h3 style="color: #2c3e50; text-align: left; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px;">Test Avancé (Postman / Thunder Client) :</h3>
                <ul style="text-align: left; background: #ecf0f1; padding: 20px 30px; border-radius: 5px; list-style-type: none;">
                    <li style="margin-bottom: 15px;">
                        <b>Créer un compte :</b> <br>
                        <code style="background: #fff; padding: 4px 8px; border-radius: 3px; color: #c0392b; display: inline-block; margin-top: 5px;">POST /api/comptes</code><br> 
                        <i style="color: #555;">Body (JSON): { "nom": "Nouveau", "solde": 1000 }</i>
                    </li>
                    <li>
                        <b>Transaction (Dépôt/Retrait) :</b> <br>
                        <code style="background: #fff; padding: 4px 8px; border-radius: 3px; color: #c0392b; display: inline-block; margin-top: 5px;">POST /api/transaction</code><br> 
                        <i style="color: #555;">Body (JSON): { "id": 1, "montant": 500, "type": "retrait" }</i>
                    </li>
                </ul>
            </div>
        </div>
    `);
});

// --- ROUTE 1 : Voir tous les comptes ---
app.get('/api/comptes', (req, res) => {
    res.status(200).json(comptes);
});

// --- ROUTE 2 : Créer un compte ---
app.post('/api/comptes', (req, res) => {
    const nouveauCompte = {
        id: comptes.length + 1,
        nom: req.body.nom,
        solde: req.body.solde || 0
    };
    comptes.push(nouveauCompte);
    res.status(201).json(nouveauCompte);
});

// --- ROUTE 3 : Transactions (Dépôts et Retraits) ---
app.post('/api/transaction', (req, res) => {
    const { id, montant, type } = req.body;
    let compte = comptes.find(c => c.id === id);

    if (!compte) return res.status(404).json({ erreur: "Compte non trouvé" });

    if (type === 'depot') {
        compte.solde += montant;
        return res.status(200).json({ message: "Dépôt réussi", nouveauSolde: compte.solde });
    } 
    else if (type === 'retrait') {
        if (compte.solde < montant) return res.status(400).json({ erreur: "Solde insuffisant !" });
        compte.solde -= montant;
        return res.status(200).json({ message: "Retrait réussi", nouveauSolde: compte.solde });
    } 
    else {
        return res.status(400).json({ erreur: "Type invalide (utilisez 'depot' ou 'retrait')" });
    }
});

// --- ALLUMER LE SERVEUR ---
app.listen(port, () => {
    console.log(`Serveur démarré avec succès sur le port ${port}`);
});