import express from "express";
import swaggerUi from "swagger-ui-express"; // NOUVEAU : Import de Swagger

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// --- CONFIGURATION SWAGGER (Le plan de ton API) ---
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Bancaire - TSAKEM CHELLA",
    version: "1.0.0",
    description: "Documentation de l'API Bancaire pour le TP ICT304"
  },
  paths: {
    "/api/comptes": {
      get: {
        summary: "Obtenir la liste de tous les comptes",
        responses: { "200": { description: "Succès" } }
      },
      post: {
        summary: "Créer un nouveau compte",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { nom: { type: "string", example: "Chella" }, solde: { type: "number", example: 5000 } }
              }
            }
          }
        },
        responses: { "201": { description: "Compte créé" } }
      }
    },
    "/api/transaction": {
      post: {
        summary: "Effectuer un dépôt ou un retrait",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { id: { type: "number", example: 1 }, montant: { type: "number", example: 1000 }, type: { type: "string", example: "retrait" } }
              }
            }
          }
        },
        responses: { "200": { description: "Transaction réussie" }, "400": { description: "Solde insuffisant ou erreur" }, "404": { description: "Compte non trouvé" } }
      }
    }
  }
};

// On dit à l'API d'afficher Swagger sur la route /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- NOTRE BASE DE DONNÉES (En mémoire) ---
let comptes = [
    { id: 1, nom: "Alice", solde: 5000 },
    { id: 2, nom: "Bob", solde: 10000 }
];

// --- PAGE D'ACCUEIL MISE À JOUR AVEC LE LIEN SWAGGER ---
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f7f6; min-height: 100vh;">
            <div style="max-width: 600px; margin: 40px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h1 style="color: #2c3e50; margin-bottom: 5px;">Bienvenue sur l'API Bancaire !!</h1>
                <h2 style="color: #2980b9; margin-top: 0;">Réalisé par : <strong>TSAKEM CHELLA</strong></h2>
                <p style="font-size: 16px; color: #7f8c8d;">L'API est en ligne et fonctionne parfaitement.</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                
                <h3 style="color: #27ae60;">Interface de Test Interactive (Swagger) :</h3>
                <a href="/api-docs" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #8e44ad; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 25px;">
                     TESTER L'API AVEC SWAGGER UI
                </a>
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

app.listen(port, () => {
    console.log(`Serveur démarré avec succès sur le port ${port}`);
});