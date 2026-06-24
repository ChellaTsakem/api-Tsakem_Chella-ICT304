import { comptes } from '../data/database.js';

export const processTransaction = (req, res) => {
    const { id, montant, type } = req.body;
    const compte = comptes.find(c => c.id === id);

    if (!compte) return res.status(404).json({ erreur: "Compte introuvable" });
    if (montant <= 0) return res.status(400).json({ erreur: "Montant invalide" });

    if (type === 'retrait') {
        if (compte.solde < montant) return res.status(400).json({ erreur: "Solde insuffisant !" });
        compte.solde -= montant;
        compte.historique.push({ date: new Date().toLocaleString(), type: "Retrait", montant: -montant });
        return res.status(200).json({ message: "Retrait réussi", nouveauSolde: compte.solde });
    } else if (type === 'depot') {
        compte.solde += montant;
        compte.historique.push({ date: new Date().toLocaleString(), type: "Dépôt", montant: montant });
        return res.status(200).json({ message: "Dépôt réussi", nouveauSolde: compte.solde });
    }
};

export const processVirement = (req, res) => {
    const { fromId, toId, montant } = req.body;
    const expediteur = comptes.find(c => c.id === fromId);
    const destinataire = comptes.find(c => c.id === toId);

    if (!expediteur || !destinataire) return res.status(404).json({ erreur: "Un des comptes est introuvable" });
    if (expediteur.solde < montant) return res.status(400).json({ erreur: "Solde insuffisant pour ce virement" });

    expediteur.solde -= montant;
    destinataire.solde += montant;

    expediteur.historique.push({ date: new Date().toLocaleString(), type: `Virement envoyé vers ID:${toId}`, montant: -montant });
    destinataire.historique.push({ date: new Date().toLocaleString(), type: `Virement reçu de ID:${fromId}`, montant: montant });

    res.status(200).json({ message: "Virement réussi", nouveauSoldeExpediteur: expediteur.solde });
};