const { Contract, Documentation, User } = require('../data');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

// En esta función estoy obteniendo la documentación para poder verla, la misma se guarda en una ruta específica dentro de la computadora para poder observar los pdf, hay que modificarla solo para que se envíe los datos al frontend
module.exports = async (req, res) => {
    const { n_documento, id_Contract } = req.body;

    try {
        // Buscar el contrato y la documentación asociada
        const contracts = await Contract.findAll({
            where: { 'estado_contrato': 'ACTIVO', 'n_documento': n_documento },
            include: [{
                model: Documentation,
            }]
        });
        // console.log(contracts)
        if (!contracts || contracts.length === 0) {
            console.log("CONTRATOS NO ENCONTRADOS")
            return res.status(404).json({ message: 'Contratos no encontrado' });
        }

        const id_num = parseInt(id_Contract, 10);
        const contractToSign = contracts.find(contract => contract.n_contrato === id_num);
        // console.log(contractToSign)
        if (!contractToSign) {
            console.log("CONTRATO A MODIFICAR NO ENCONTRADO")
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        const documentation = contractToSign.Documentation;
        
        if (!documentation) {
            console.log("DOCUMENTACIÓN NO ENCONTRADA")
            return res.status(404).json({ message: 'Documentación no encontrada' });
        }

        const dniBuffer = documentation.dni;
        const signBuffer = documentation.sign;
    
        // Enviar el PDF al frontend
        res.setHeader('Content-Type', 'application/pdf');
        res.send({ dniBuffer, signBuffer });
        
        
        // Guardar los Buffers como archivos en la ubicación especificada, estas líneas deben eliminarse cuando solo se envíen los datos al frontend.
        const desktopPath = 'C:/Users/Admin/OneDrive/Escritorio';
        const dniFilePath = path.join(desktopPath, 'ejemplo', 'dni_temp.pdf');
        const signFilePath = path.join(desktopPath, 'ejemplo', 'sign_temp.pdf');
        fs.writeFileSync(dniFilePath, dniBuffer);
        fs.writeFileSync(signFilePath, signBuffer);
        
    } catch (error) {
        console.error("Error al obtener documentos en formato PDF:", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

