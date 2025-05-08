import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
