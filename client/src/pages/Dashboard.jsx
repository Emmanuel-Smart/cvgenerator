import React from 'react';
import { useNavigate } from 'react-router-dom';
import CVList from '../components/CVList';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleViewCV = (cvId) => {
        navigate(`/view-cv/${cvId}`);
    };

    const handleGenerateNew = () => {
        navigate('/generate-cv');
    };

    return (
        <div>
            <h1>Welcome to Your CV Generator</h1>
            <CVList onViewCV={handleViewCV} onGenerateNew={handleGenerateNew} />
        </div>
    );
};

export default Dashboard;
