/**
 * Utility to generate and download a PDF from HTML content.
 * Uses html-to-image for high-fidelity rendering (supporting modern CSS like oklch)
 * and jsPDF for PDF generation.
 */

declare global {
  interface Window {
    jspdf: any;
    htmlToImage: any;
  }
}

interface PdfExportOptions {
  filename?: string;
  elementId?: string;
}

export const exportToPdf = async ({ 
  filename = `website-export-${new Date().toISOString().split('T')[0]}.pdf`,
  elementId 
}: PdfExportOptions = {}) => {
  if (!window.jspdf || !window.htmlToImage) {
    throw new Error('PDF libraries not loaded. Please ensure jsPDF and html-to-image are included.');
  }

  const element = (elementId 
    ? document.getElementById(elementId) 
    : document.querySelector('main') || document.body) as HTMLElement;

  if (!element) {
    throw new Error('Target element for PDF export not found.');
  }

  try {
    // 1. Prepare the document for printing (force animations to end state, etc.)
    document.body.classList.add('is-printing');
    
    // Small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 100));

    // 2. Capture the element as a high-quality PNG
    const dataUrl = await window.htmlToImage.toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#000000',
    });

    // 3. Remove printing state immediately after capture
    document.body.classList.remove('is-printing');

    // 4. Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // 3. Calculate dimensions to fit A4
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    let heightLeft = pdfHeight;
    let position = 0;

    // 4. Add the image to the PDF, handling multi-page splitting
    // First page
    pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent pages
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // 5. Download the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw error;
  }
};
