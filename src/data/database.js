// Simulation de notre base de données en mémoire
export let comptes = [
    { id: 1, nom: "Alice", solde: 5000, historique: [] },
    { id: 2, nom: "Bob", solde: 10000, historique: [] }
];

// Fonction utilitaire pour générer des IDs uniques
export const generateId = () => comptes.length > 0 ? Math.max(...comptes.map(c => c.id)) + 1 : 1;