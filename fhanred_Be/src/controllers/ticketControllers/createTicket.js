const {
  User,
  Contract,
  Delivery,
  Ticket,
  //Inventory,
} = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {

  const ticketProperties = [
    "ticket_type",
    "served_by",
    "observations",
    "phone",
    "poste",
    "field_39",
    "status",
    "created_by",
    "closed_by",
    "opening_datetime",
    "closing_datetime",
    "used_materials",
    "collected_materials",
    "n_contrato"
  ];
  for (const field of ticketProperties) {
    if (!(field in req.body)) {
      return response(res, 400, `El campo '${field}' es obligatorio.`, true);
    }
  }

  const ticketObject = {
      reception_datetime: new Date(),
      ...req.body
    };
  console.log(ticketObject);

  //Crear ticket
  const createdTicket = await Ticket.create(ticketObject);

  //res.json(createdTicket);

  //relacion entre ticket y contrato
  let n_contrato = req.body.n_contrato;

  const findContractQueryResult = await Contract.findByPk(n_contrato); // Busca el contrato por id
  console.log({ findContractQueryResult });
  if (findContractQueryResult) {
    await createdTicket.setContract(findContractQueryResult); // Establece la relación entre ticket y contrato
  } else {
    console.log("Contrato no encontrado");
  }

  
  //Relacion entre ticket y user/tecnico   ESTO TIENE QUE IR EN EL UPDATE
/*   const { userId } = req.body;
  const findUserQueryResult = await User.findByPk({ userId }); */
  console.log(createdTicket)
  return res.json(createdTicket);

  
};
