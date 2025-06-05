import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../utils/api';
import { CVPreview } from '../components/CVPreview';

export function CVDetailPage() {
    const { id } = useParams();
    const [cv, setCv] = useState(null);

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const res = await API.get(`/api/cv/${id}`);
                setCv(res.data);
            } catch (err) {
                console.error("Failed to fetch CV:", err);
            }
        };

        fetchCV();
    }, [id]);

    if (!cv) return <p>Loading...</p>;

    return (
        <div className="cv-detail">
            <h2>CV Details</h2>
            <CVPreview cvData={cv.cv_data} />
        </div>
    );
}
