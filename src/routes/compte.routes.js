import express from 'express';
import { getAllComptes, createCompte, deleteCompte, searchCompte, getHistorique } from '../controllers/compte.controller.js';

const router = express.Router();

router.get('/comptes', getAllComptes);
router.post('/comptes', createCompte);
router.delete('/comptes/:id', deleteCompte);
router.get('/recherche', searchCompte);
router.get('/comptes/:id/historique', getHistorique); 

export default router;