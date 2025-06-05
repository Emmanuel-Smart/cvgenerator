import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import './db.js'; // Initialize DB connection
import cvRoutes from './routes/cv.js';



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/cv', cvRoutes);


// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});