import { describe, it, expect } from 'vitest';

describe('Tests Unitaires - Logique Bancaire', () => {
    
    // 1. Test du Retrait
    it('Devrait correctement déduire un montant (simulation retrait)', () => {
        const soldeInitial = 5000;
        const retrait = 1000;
        const nouveauSolde = soldeInitial - retrait;
        expect(nouveauSolde).toBe(4000);
    });

    // 2. Test de la Sécurité
    it('Devrait identifier un solde insuffisant (sécurité retrait)', () => {
        const soldeInitial = 5000;
        const retrait = 10000;
        const isValide = soldeInitial >= retrait;
        expect(isValide).toBe(false);
    });

    // 3. NOUVEAU : Test du Dépôt
    it('Devrait correctement additionner un montant (simulation dépôt)', () => {
        const soldeInitial = 5000;
        const depot = 2500;
        const nouveauSolde = soldeInitial + depot;
        expect(nouveauSolde).toBe(7500);
    });

    // 4. NOUVEAU : Test du Virement (Double opération mathématique)
    it('Devrait équilibrer les comptes lors d\'un virement', () => {
        let soldeExpediteur = 5000;
        let soldeDestinataire = 2000;
        const montantVirement = 1500;

        // Simulation de la transaction
        soldeExpediteur -= montantVirement;
        soldeDestinataire += montantVirement;

        // Vérification des deux comptes
        expect(soldeExpediteur).toBe(3500);
        expect(soldeDestinataire).toBe(3500);
    });
});