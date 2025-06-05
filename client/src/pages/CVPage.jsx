import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import { CVForm } from '../components/CVForm';
import { CVPreview } from '../components/CVPreview';
import './CVPage.css';
import { useNavigate } from 'react-router-dom';

export function CVPage() {
    const { user, logout } = useContext(AuthContext);
    const [cvs, setCvs] = useState([]);
    const [currentCV, setCurrentCV] = useState(null);
    const [isEditing, setIsEditing] = useState(true); // Show form by default
    const navigate = useNavigate();

    const fetchCVs = async () => {
        try {
            const res = await API.get('/api/cv');
            setCvs(res.data);
        } catch (err) {
            console.error("Failed to fetch CVs:", err);
        }
    };

    useEffect(() => {
        fetchCVs();
    }, []);

    const handleGenerate = async (data) => {
        try {
            let res;
            if (isEditing && currentCV) {
                // Update existing CV
                res = await API.put(`/api/cv/${currentCV.id}`, { cvData: data });
            } else {
                // Create new CV
                res = await API.post('/api/cv', { cvData: data });
            }
            await fetchCVs();
            setCurrentCV(res.data);   // Set to preview updated/created CV
            setIsEditing(false);      // Switch to preview
        } catch (err) {
            console.error("Failed to generate CV:", err);
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // Open form with currentCV data
    };

    const handleBack = () => {
        setCurrentCV(null); // Clear selected CV
        setIsEditing(true); // Show empty form
    };

    const handleSelectCV = (cv) => {
        setCurrentCV(cv);
        setIsEditing(false); // Preview selected CV
    };

    return (
        <div className="cv-page">
            <button onClick={logout} className="logout-btn">Logout</button>

            <button onClick={() => navigate('/cv-list')} className="view-list-btn">
                View All Generated CVs
            </button>

            {/* CV Gallery */}
            {/* <div className="cv-gallery">
                {cvs.map(cv => (
                    <div
                        key={cv.id}
                        onClick={() => handleSelectCV(cv)}
                        style={{ cursor: 'pointer', marginBottom: '20px' }}
                    >
                        <CVPreview cvData={cv.cv_data} />
                    </div>
                ))}
            </div> */}

            {/* CV Form for creating or editing */}
            {isEditing && (
                <CVForm
                    onSubmit={handleGenerate}
                    defaultValues={currentCV ? currentCV.cv_data : {
                        name: '',
                        email: '',
                        phone: '',
                        education: [{ institution: '', degree: '', year: '' }],
                        experience: [{ company: '', position: '', duration: '' }]
                    }}
                />
            )}

            {/* CV Preview with Edit and Back */}
            {!isEditing && currentCV && (
                <div>
                    <CVPreview cvData={currentCV.cv_data} />
                    <button className='edit-button' onClick={handleEdit} style={{ marginRight: '10px' }}>Edit</button>
                    <button className='back-button' onClick={handleBack}>Back</button>
                </div>
            )}
        </div>
    );
}
