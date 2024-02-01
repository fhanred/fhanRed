const { Contract, Documentation, User } = require('../data');
const response = require("../utils/response");
const PDFDocument = require('pdfkit');
const sharp = require('sharp');

module.exports = async (req, res) => {
    const {n_documento, id_Contract, dniFront, dniBack, sign} = req.body;
    
    const contracts = await Contract.findAll({
        where: { 'estado_contrato': 'ACTIVO', 'n_documento': n_documento },
        include: [{
            model: Documentation,
            attributes: ['id_Documentation'],
            include: [
                {
                    model:User
                }
            ],
        }]
    });
    
    if (!contracts || contracts.length === 0) {
        return res.status(404).json({ message: 'Contratos no encontrado' });
    }
    
    const id_num = parseInt(id_Contract, 10);
    const contractToSign = contracts.find(contract => contract.n_contrato === id_num);

    if (!contractToSign) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
    }
    
    let documentation = contractToSign.Documentation;

    if (!documentation) {
        documentation = await Documentation.create({
            dni: await convertImageToPDF(dniFront, dniBack),
            sign: await convertSignToPDF(sign),
        });

        // Asociar la nueva documentación al contrato existente
        await contractToSign.setDocumentation(documentation);

        const user = await User.findOne({where: {n_documento}});
        await documentation.setUser(user);

    } else {    
        if (dni) {
            const dniPdfBuffer = await convertImageToPDF(dniFront);
            documentation.dni = dniPdfBuffer;
        }
        if (sign) {
            const signPdfBuffer = await convertImageToPDF(sign);
            documentation.sign = signPdfBuffer;
        }
    }
    await documentation.save();
    
    const responsePayload = {
        contractToSign: {
            ...contractToSign.toJSON(),
            Documentation: {
                id_Documentation: documentation.id_Documentation,
            }
        }
    };
    response(res, 200, { responsePayload}); 
};

async function convertImageToPDF(dniFrontBase64, dniBackBase64) {
    const dniFrontBuffer = Buffer.from(dniFrontBase64, 'base64');
    const dniBackBuffer = Buffer.from(dniBackBase64, 'base64');

    // Utilizar sharp para redimensionar la imagen aunque es conveniente usar el mismo tamaño de la imagen original
    const resizedDniFrontBuffer = await sharp(dniFrontBuffer).resize(500, 300).toBuffer();
    const resizedDniBackBuffer = await sharp(dniBackBuffer).resize(500, 300).toBuffer();

    const doc = new PDFDocument();

    // Agregar nueva página para la imagen dniFront
    doc.image(resizedDniFrontBuffer, { width: 500 });
    // Agregar nueva página para la imagen dniBack
    doc.addPage().image(resizedDniBackBuffer, { width: 500 });
    
    
    return new Promise((resolve, reject) => {
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
        doc.end();
    });
}

async function convertSignToPDF(signBase64) {
    const signBuffer = Buffer.from(signBase64, 'base64');

    // Utilizar sharp para redimensionar la firma (opcional, según tus necesidades)
    const resizedSignBuffer = await sharp(signBuffer).resize(500, 300).toBuffer();

    const doc = new PDFDocument();

    // Agregar la firma a la página
    doc.image(resizedSignBuffer, { width: 500 });

    return new Promise((resolve, reject) => {
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
        doc.end();
    });
}