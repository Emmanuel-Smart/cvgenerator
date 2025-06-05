import { useState, useEffect } from 'react';

export default function TemplateSelector({ onSelect }) {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await fetch('http://localhost:5000/api/cv/templates', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTemplates(await response.json());
        };
        fetchTemplates();
    }, []);

    return (
        <select onChange={(e) => onSelect(templates[e.target.value])}>
            {Object.keys(templates).map((key) => (
                <option key={key} value={key}>
                    {templates[key].name}
                </option>
            ))}
        </select>
    );
}