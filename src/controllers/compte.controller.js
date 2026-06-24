import { comptes, generateId } from '../data/database.js';

export const getAllComptes = (req, res) => res.status(200).json(comptes);

export const createCompte = (req, res) => {
    const { nom, solde } = req.body;
    if (!nom || solde === undefined) return res.status(400).json({ erreur: "Nom et solde requis." });
    
    const nouveauCompte = {
        id: generateId(),
        nom,
        solde: parseFloat(solde),
        historique: [{ date: new Date().toLocaleString(), type: "Création", montant: parseFloat(solde) }]
    };
    comptes.push(nouveauCompte);
    res.status(201).json({ message: "Compte créé", compte: nouveauCompte });
};

export const deleteCompte = (req, res) => {
    const index = comptes.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erreur: "Compte non trouvé" });
    comptes.splice(index, 1);
    res.status(200).json({ message: "Compte supprimé avec succès" });
};

export const searchCompte = (req, res) => {
    const resultats = comptes.filter(c => c.nom.toLowerCase().includes((req.query.nom || "").toLowerCase()));
    res.status(200).json(resultats);
};

// NOUVELLE FONCTIONNALITÉ : Voir l'historique d'un compte
export const getHistorique = (req, res) => {
    const compte = comptes.find(c => c.id === parseInt(req.params.id));
    if (!compte) return res.status(404).json({ erreur: "Compte non trouvé" });
    res.status(200).json({ nom: compte.nom, historique: compte.historique });
};