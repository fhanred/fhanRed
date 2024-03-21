const nodemailer = require("nodemailer");
const { Contract, User, Plan, Vivienda, Delibery } = require("../data");
const sendEmail = require("../helpers/sendEmail.js");
const response = require("../utils/response");



module.exports = async (req, res) => {
  try {
    const { name_plan, ...contractData } = req.body;
    console.log(contractData)
    let user = await User.findOne({
      where: { n_documento: contractData.n_documento },
    });

    if (!user) {
      user = await User.create({
        n_documento: contractData.n_documento,
        sexo: contractData.sexo,
        tipo_documento: contractData.tipo_documento,
        tipo_persona: contractData.tipo_persona,
        email: contractData.email,
        fecha_cumple: contractData.fecha_cumple,
        
      });
    }

    const plan = await Plan.findOne({ where: { name_plan: name_plan } });

    if (!plan) {
      return response(res, 404, "Plan no encontrado");
    }

    const lastContract = await Contract.findOne({ order: [['n_contrato', 'DESC']] });

    let nextContractNumber;
    if (lastContract) {
      nextContractNumber = lastContract.n_contrato + 1;
    } else {
      nextContractNumber = 1;
    }
    
    const newContract = await Contract.create({
      ...contractData,
      n_contrato: nextContractNumber,
      name_plan: name_plan,
      

    
    });

    // Enviar correos electrónicos al usuario y al administrador
    const userEmailAddress = "mercedeslobeto@gmail.com" //contractData.email; 
    console.log(userEmailAddress)
    const adminEmailAddress = "yanicorc@gmail.com"; // Reemplaza con el correo del administrador

    const contractLink = `http://localhost:3001/contract/${newContract.n_contrato}`; // URL del contrato creado

    const userMailSubject = "Contrato creado exitosamente";
    const userMailHTML = `<p>Hola,</p><p>Se ha creado exitosamente tu contrato. Puedes acceder al contrato haciendo clic en el siguiente enlace: <a href="${contractLink}">Ver contrato</a></p>`;

    const adminMailSubject = "Nuevo contrato creado";
    const adminMailHTML = `<p>Hola,</p><p>Se ha creado un nuevo contrato. Puedes revisarlo haciendo clic en el siguiente enlace: <a href="${contractLink}">Ver contrato</a></p>`;

    await sendEmail({
      email: userEmailAddress,
      subject: userMailSubject,
      message: userMailHTML,
    
    });
    await sendEmail({
      email: adminEmailAddress,
      subject: adminMailSubject,
      message: adminMailHTML,
    });

    response(res, 201, "Contrato creado exitosamente", newContract);
  } catch (error) {
    console.error("Error al crear contrato:", error);
    response(res, 500, "Error al crear contrato");
  }
};
