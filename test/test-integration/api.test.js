import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../index.js';

describe('Tests d\'Intégration - Couverture 100% API Bancaire', () => {
    
    // --- TESTS DES COMPTES ---
    describe('Gestion des Comptes', () => {
        it('GET /api/comptes - Devrait retourner la liste des comptes', async () => {
            const response = await request(app).get('/api/comptes');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('POST /api/comptes - Devrait créer un compte avec succès', async () => {
            const response = await request(app).post('/api/comptes').send({ nom: 'TestUser', solde: 1500 });
            expect(response.status).toBe(201);
            expect(response.body.compte.nom).toBe('TestUser');
        });

        it('POST /api/comptes - Devrait bloquer si les données manquent', async () => {
            const response = await request(app).post('/api/comptes').send({ nom: 'SansSolde' });
            expect(response.status).toBe(400);
        });

        it('GET /api/recherche - Devrait trouver un compte par son nom', async () => {
            const response = await request(app).get('/api/recherche?nom=alice');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('GET /api/comptes/:id/historique - Devrait retourner l\'historique', async () => {
            const response = await request(app).get('/api/comptes/1/historique');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('historique');
        });

        it('GET /api/comptes/:id/historique - Devrait retourner 404 pour un faux compte', async () => {
            const response = await request(app).get('/api/comptes/999/historique');
            expect(response.status).toBe(404);
        });

        /*it('DELETE /api/comptes/:id - Devrait supprimer un compte', async () => {
            // On supprime un compte existant
            const response = await request(app).delete('/api/comptes/1');
            expect(response.status).toBe(200);
        });*/
        it('DELETE /api/comptes/:id - Devrait supprimer un compte', async () => {
            // On supprime le compte TestUser (ID 3) créé au début des tests pour préserver Alice (ID 1)
            const response = await request(app).delete('/api/comptes/3');
            expect(response.status).toBe(200);
        });

        it('DELETE /api/comptes/:id - Devrait retourner 404 si compte introuvable', async () => {
            const response = await request(app).delete('/api/comptes/999');
            expect(response.status).toBe(404);
        });
    });

    // --- TESTS DES TRANSACTIONS ---
    describe('Transactions et Virements', () => {
        it('POST /api/transaction - Devrait bloquer une transaction avec montant <= 0', async () => {
            const response = await request(app).post('/api/transaction').send({ id: 2, montant: -50, type: 'depot' });
            expect(response.status).toBe(400);
        });

        it('POST /api/transaction - Devrait bloquer si le compte n\'existe pas', async () => {
            const response = await request(app).post('/api/transaction').send({ id: 999, montant: 500, type: 'depot' });
            expect(response.status).toBe(404);
        });

        it('POST /api/transaction - Devrait réussir un dépôt', async () => {
            const response = await request(app).post('/api/transaction').send({ id: 2, montant: 2000, type: 'depot' });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Dépôt réussi');
        });

        it('POST /api/transaction - Devrait réussir un retrait', async () => {
            const response = await request(app).post('/api/transaction').send({ id: 2, montant: 500, type: 'retrait' });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Retrait réussi');
        });

        it('POST /api/transaction - Devrait bloquer un retrait sans provision', async () => {
            const response = await request(app).post('/api/transaction').send({ id: 2, montant: 999999, type: 'retrait' });
            expect(response.status).toBe(400);
        });
        
        it('POST /api/virement - Devrait bloquer si un compte est introuvable', async () => {
            const response = await request(app).post('/api/virement').send({ fromId: 999, toId: 2, montant: 500 });
            expect(response.status).toBe(404);
        });

        it('POST /api/virement - Devrait bloquer si solde insuffisant', async () => {
            const response = await request(app).post('/api/virement').send({ fromId: 2, toId: 1, montant: 999999 });
            expect(response.status).toBe(400);
        });
    });
});