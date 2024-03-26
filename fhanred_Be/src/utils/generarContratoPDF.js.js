const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

async function agregarDatosContrato(datosContrato, rutaPlantilla, rutaArchivo) {
    // Leer el archivo PDF de la plantilla
    const plantillaBytes = fs.readFileSync("../PDF");
    const pdfDoc = await PDFDocument.load(plantillaBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    
    firstPage.drawText(`Contrato No ${datosContrato.n_contrato}`, { x: 50, y: 550 });
    firstPage.drawText(`Nombre o razón social ${datosContrato.User.name_razonSocial}`, { x: 50, y: 525 });
    // Continuar agregando datos...

    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(rutaArchivo, pdfBytes);
}

// Ejemplo de uso
const datosContratoEjemplo = {
    // Datos del contrato (mismo objeto que antes)
};
const rutaPlantillaPDF = 'ruta/a/plantilla.pdf';
const rutaArchivoPDF = 'ruta/del/archivo_con_datos.pdf';

agregarDatosContrato(datosContratoEjemplo, rutaPlantillaPDF, rutaArchivoPDF);
