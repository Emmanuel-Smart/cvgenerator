import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CVList = ({ onViewCV, onGenerateNew }) => {
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCVs = async () => {
            try {
                const response = await axios.get('/api/cv', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCvs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching CVs:', error);
                setLoading(false);
            }
        };

        fetchCVs();
    }, []);

    if (loading) return <p>Loading CVs...</p>;

    return (
        <div>
            <h2>Your Generated CVs</h2>
            {cvs.length === 0 ? (
                <p>No CVs found. Generate your first one!</p>
            ) : (
                <ul>
                    {cvs.map((cv) => (
                        <li key={cv.id}>
                            <p><strong>Date:</strong> {new Date(cv.created_at).toLocaleString()}</p>
                            <button onClick={() => onViewCV(cv.id)}>View CV</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={onGenerateNew} style={{ marginTop: '20px' }}>
                Generate New CV
            </button>
        </div>
    );
};

export default CVList;
