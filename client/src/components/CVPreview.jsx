import { usePDF } from 'react-to-pdf';
import './CVPreview.css';

export function CVPreview({ cvData }) {
    const { toPDF, targetRef } = usePDF({
        filename: `${cvData.name}-CV.pdf`,
        page: {
            margin: 20,
            format: 'A4'
        }
    });

    return (
        <div className="cv-preview-container">
            <button onClick={() => toPDF()} className="download-btn">
                Download PDF
            </button>

            <div ref={targetRef} className="cv-preview">
                {/* Header Section */}
                <header className="cv-header">
                    <h1 className="cv-name">{cvData.name}</h1>
                    <div className="contact-info">
                        <p><strong>Email:</strong> {cvData.email}</p>
                        {cvData.phone && <p><strong>Phone:</strong> {cvData.phone}</p>}
                    </div>
                </header>

                {/* Education Section */}
                {cvData.education?.length > 0 && (
                    <section className="cv-section">
                        <h2 className="section-title">Education</h2>
                        {cvData.education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <h3 className="institution">{edu.institution}</h3>
                                <p className="degree">{edu.degree}</p>
                                <p className="duration">{edu.year}</p>
                            </div>
                        ))}
                    </section>
                )}

                {/* Experience Section */}
                {cvData.experience?.length > 0 && (
                    <section className="cv-section">
                        <h2 className="section-title">Work Experience</h2>
                        {cvData.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <h3 className="company">{exp.company}</h3>
                                <p className="position">{exp.position}</p>
                                <p className="duration">{exp.duration}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}