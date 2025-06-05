import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';

export const generatePDF = async (cvData) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    // Add content to PDF
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText(`CV: ${cvData.name}`, {
        x: 50,
        y: height - 50,
        size: fontSize + 4,
        color: rgb(0, 0, 0),
    });

    // Add more content dynamically...

    return await pdfDoc.save();
};