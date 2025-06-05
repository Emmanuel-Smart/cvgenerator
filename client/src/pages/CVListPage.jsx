import { useEffect, useState } from 'react';
import API from '../utils/api';
import { CVPreview } from '../components/CVPreview';
import { useNavigate } from 'react-router-dom';
import './DeleteButton.css';

export function CVListPage() {
    const [cvs, setCvs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const res = await API.get('/api/cv');
                setCvs(res.data);
            } catch (err) {
                console.error("Failed to fetch CVs:", err);
            }
        };
        fetchCVs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this CV?")) return;

        try {
            await API.delete(`/api/cv/${id}`);
            setCvs(prev => prev.filter(cv => cv.id !== id));
        } catch (err) {
            console.error("Failed to delete CV:", err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Generated CVs</h2>
            <button
                className='back-button'
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px' }}
            >
                ← Back to Generator
            </button>
            <div>
                {cvs.map(cv => (
                    <div
                        key={cv.id}
                        style={{
                            marginBottom: '20px',
                            position: 'relative',
                            border: '1px solid #ddd',
                            padding: '15px',
                            borderRadius: '6px',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <CVPreview cvData={cv.cv_data} />
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(cv.id)}
                            style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
