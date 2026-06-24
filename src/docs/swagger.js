export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "ChellaBank API",
    version: "2.0.0",
    description: "Documentation complète de l'API Bancaire (Architecture MVC, Couverture 100%)"
  },
  tags: [
    { name: "Comptes", description: "Gestion des clients" },
    { name: "Transactions", description: "Opérations financières" }
  ],
  paths: {
    "/api/comptes": {
      get: {
        tags: ["Comptes"],
        summary: "Lister tous les comptes",
        responses: { "200": { description: "Succès" } }
      },
      post: {
        tags: ["Comptes"],
        summary: "Créer un nouveau compte",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { nom: { type: "string" }, solde: { type: "number" } } } } }
        },
        responses: { "201": { description: "Créé avec succès" }, "400": { description: "Données manquantes" } }
      }
    },
    "/api/comptes/{id}": {
      delete: {
        tags: ["Comptes"],
        summary: "Supprimer un compte par son ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "Supprimé avec succès" }, "404": { description: "Compte introuvable" } }
      }
    },
    "/api/comptes/{id}/historique": {
      get: {
        tags: ["Comptes"],
        summary: "Voir l'historique d'un compte",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { "200": { description: "Historique récupéré" }, "404": { description: "Compte introuvable" } }
      }
    },
    "/api/recherche": {
      get: {
        tags: ["Comptes"],
        summary: "Rechercher un compte par nom",
        parameters: [{ name: "nom", in: "query", required: false, schema: { type: "string" } }],
        responses: { "200": { description: "Résultats de la recherche" } }
      }
    },
    "/api/transaction": {
      post: {
        tags: ["Transactions"],
        summary: "Effectuer un dépôt ou un retrait",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { id: { type: "integer" }, montant: { type: "number" }, type: { type: "string", enum: ["depot", "retrait"] } } } } }
        },
        responses: { "200": { description: "Transaction réussie" }, "400": { description: "Erreur de montant / Solde insuffisant" }, "404": { description: "Compte introuvable" } }
      }
    },
    "/api/virement": {
      post: {
        tags: ["Transactions"],
        summary: "Effectuer un virement de compte à compte",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", properties: { fromId: { type: "integer" }, toId: { type: "integer" }, montant: { type: "number" } } } } }
        },
        responses: { "200": { description: "Virement réussi" }, "400": { description: "Solde insuffisant" }, "404": { description: "Comptes introuvables" } }
      }
    }
  }
};