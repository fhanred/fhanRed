const nodemailer = require("nodemailer");
const { Contract, User, Plan, Vivienda, Delivery } = require("../data");
const sendEmail = require("../helpers/sendEmail.js");
const response = require("../utils/response");

async function createContractWithDelivery(contractData) {
  // Crear el contrato
  const contract = await Contract.create({
    ...contractData,
    name_plan: contractData.name_plan,
  });
  console.log(contractData)

  // Crear el registro de entrega (Delivery) asociado al contrato
  const delivery = await Delivery.create({
    municipio: contractData.municipio,
    barrio_vereda: contractData.barrio_vereda,
    direccion: contractData.combinedAddress,
  });

  // Asociar el registro de entrega al contrato creado
  await contract.setDelivery(delivery);

  return contract;
}

module.exports = async (req, res) => {
  try {
    const { name_plan, ...contractData } = req.body;

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

    const lastContract = await Contract.findOne({
      order: [["n_contrato", "DESC"]],
    });

    let nextContractNumber;
    if (lastContract) {
      nextContractNumber = lastContract.n_contrato + 1;
    } else {
      nextContractNumber = 1;
    }

    // Crear el contrato con entrega asociada
    const newContract = await createContractWithDelivery({
      ...contractData,
      n_contrato: nextContractNumber,
      name_plan: name_plan,
    });

    // Enviar correos electrónicos al usuario y al administrador
    const userEmailAddress = "mercedeslobeto@gmail.com";
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
