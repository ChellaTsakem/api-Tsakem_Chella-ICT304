import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './src/docs/swagger.js';
import compteRoutes from './src/routes/compte.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import { renderHome } from './src/views/home.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// UI et Documentation
app.get('/', renderHome);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes Métier (Importées depuis les dossiers)
app.use('/api', compteRoutes);
app.use('/api', transactionRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`🚀 Serveur démarré sur le port ${port}`);
    });
}

export default app;