import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import animalRoutes from './routes/Animal.routes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

// Routes FIRST
app.use('/api/animals', animalRoutes);

// Static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all AFTER routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });



app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
})