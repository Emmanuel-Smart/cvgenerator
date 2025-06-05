import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import pool from '../db.js';
import { generatePDF } from '../services/pdfService.js';
import templates from '../data/templates.js';
const router = express.Router();

// Save CV
router.post('/', verifyToken, async (req, res) => {
    try {
        console.log("Incoming CV Data:", req.body);         // Add this
        console.log("User ID:", req.user?.id);              // And this

        const { cvData } = req.body;

        const result = await pool.query(
            'INSERT INTO cvs (user_id, cv_data) VALUES ($1, $2) RETURNING *',
            [req.user.id, cvData]
        );


        res.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to save CV:", error);          // And this
        res.status(500).json({ message: 'Failed to save CV' });
    }
});


// GET single CV by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const result = await pool.query(
            'SELECT * FROM cvs WHERE id = $1 AND user_id = $2',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "CV not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching CV:", err);
        res.status(500).json({ error: "Error fetching CV" });
    }
});

// Example in Express.js (cvRoutes.js or similar)
router.put('/cv/:id', async (req, res) => {
    const { id } = req.params;
    const { cvData } = req.body;

    try {
        const updatedCV = await CV.findByIdAndUpdate(id, { cv_data: cvData }, { new: true });

        if (!updatedCV) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json(updatedCV);
    } catch (err) {
        res.status(500).json({ message: "Error updating CV", error: err.message });
    }
});




// Add this new route
router.get('/pdf', verifyToken, async (req, res) => {
    try {
        const cv = await pool.query(
            'SELECT cv_data FROM cvs WHERE user_id = $1',
            [req.user.id]
        );

        const pdfBytes = await generatePDF(cv.rows[0].cv_data);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).json({ message: 'PDF generation failed' });
    }
});

// Add this new route
router.get('/templates', verifyToken, (req, res) => {
    res.json(templates);
});

// Get all CVs for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            'SELECT id, cv_data, created_at FROM cvs WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching CVs:", err);
        res.status(500).json({ error: "Failed to fetch CVs" });
    }
});


// Delete CV by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Delete CV only if it belongs to the logged-in user
        const result = await pool.query(
            'DELETE FROM cvs WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'CV not found or unauthorized' });
        }

        res.json({ message: 'CV deleted successfully' });
    } catch (error) {
        console.error('Error deleting CV:', error);
        res.status(500).json({ message: 'Failed to delete CV' });
    }
});



export default router;