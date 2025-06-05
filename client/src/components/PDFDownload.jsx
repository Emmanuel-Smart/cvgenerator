export default function PDFDownload() {
    const downloadPDF = async () => {
        const response = await fetch('http://localhost:5000/api/cv/pdf', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-cv.pdf';
        a.click();
    };

    return <button onClick={downloadPDF}>Download PDF</button>;
}