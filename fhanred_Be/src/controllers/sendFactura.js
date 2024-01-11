const { User, Contract, Plan } = require('../data');

module.exports = async () => {
  try {
    const usuarios = await User.findAll({
      include: [
        {
          model: Contract,
          include: [Plan, Delivery], // Incluir la relación con Plan y Delivery en Contract
        },
      ],
    });

    // Función para obtener el nombre del mes a partir de su número
    function obtenerNombreMes(month) {
      const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
      return meses[month];
    }

    usuarios.forEach(async (usuario) => {
      // Obtener la fecha actual
      const today = new Date();

      // Formatear la fecha al formato (dd/MM/yyyy)
      const formattedDate = `${today.getDate()}/${
        today.getMonth() + 1
      }/${today.getFullYear()}`;
      const sevenDaysLater = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );

      // Obtener el día y el mes con ceros iniciales si es necesario
      const day = String(sevenDaysLater.getDate()).padStart(2, '0');
      const month = String(sevenDaysLater.getMonth() + 1).padStart(2, '0');
      const Year = sevenDaysLater.getFullYear();

      const payment_date = `${day}/${month}/${Year}`;
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      const nextMonth =
        lastDayOfMonth.getMonth() === 11 ? 0 : lastDayOfMonth.getMonth() + 1;
      const year =
        nextMonth === 0
          ? lastDayOfMonth.getFullYear() + 1
          : lastDayOfMonth.getFullYear();

      const name = usuario.name_razonSocial.split(','); // se necesita para las propiedades first_name y family_name en el json cuando es PERSONA NATURAL
      const tipo_persona = usuario.tipo_persona;
      const first_name = name[1].trim();
      const family_name = name[0].trim();
      const description = `${obtenerNombreMes(nextMonth)
        .slice(0, 3)
        .toUpperCase()}/${year}`; // se utiliza en la propiedad prepayments que es una array de objetos con la propiedad description

      // ... lógica para obtener contratos y crear el JSON por cada usuario
      let jsonUsuario = {
        actions: {
          send_dian: true, //
          send_email: true,
          email: usuario.email, // Correos destinados para el envío de la factura. Para múltiples correos se separa usando punto y coma (;), en FHANRED solo se maneja un correo por usuario
        },
        invoice: {
          issue_date: formattedDate,
          invoice_type_code: 'FACTURA_VENTA',
          items: [],
          payment_means_type: 'CREDITO',
          prepayments: [
            {
              amount: 0, // valor del pago, preguntar si aca se resta el descuento, se suma el iva y se resta el retefuente, preguntar si aca va lo que tiene que pagar el cliente
              description: description,
            },
          ],
          number: '1801', // numero de la factura el string es a modo de ejemplo toca mirar la facturacion de fhanred
          numbering: {
            resolution_number: '18764062692113', // numero resolucion expedida por la DIAN
            prefix: 'FHA', // prefijo asosiado a la resolucion
            flexible: false,
          },
          dataico_account_id: '002979c5-7c23-43ab-aa98-3fa7dce6e4d0', // Identificador de la cuenta del cliente en DATAICO, el string que coloco es a modo de ejemplo toca reemplazar por el de fhanred
          payment_date: payment_date,
          env: 'PRUEBAS', // Existen dos ambiente: PRUEBAS para mandar documentos electrónicos para la Habilitación ante la DIAN y PRODUCCION para el envío definitivo.
          notes: ['Después del 15 se procedera a suspender el servicio'],
          customer: {
            department: 'META',
            address_line: usuario.Contracts[0].Delivery.direccion, // Direccion del contrato
            party_type: usuario.tipo_persona === 'P.NATURAL' ? 'PERSONA_NATURAL' : 'PERSONA_JURIDICA',// PERSONA_JURIDICA, PERSONA_NATURAL
            city: usuario.Contracts[0].Delivery.municipio, // se puede enviar codigo o nombre
            tax_level_code: 'COMUN', //SIMPLIFICADO, RESPONSABLE_DE_IVA, NO_RESPONSABLE_DE_IVA, COMUN
            email: usuario.email, // correo cliente
            country_code: 'CO',
            phone: usuario.Contracts[0].tel1,
            party_identification_type: usuario.tipo_documento, //TE, PEP, TI, RC, CC, CE, PASAPORTE, IE, NIT_OTRO_PAIS, NIT
            regimen: 'ORDINARIO', //AUTORRETENEDOR, AGENTE_RETENCION_IVA, ORDINARIO, SIMPLE, GRAN_CONTRIBUYENTE
            party_identification: usuario.n_documento,
          },
          payment_means: 'CASH',
        },
      };

      // Iterar sobre todos los contratos del usuario actual
      usuario.Contracts.forEach((contrato) => {
        // Crear un objeto item para cada contrato y agregarlo al array items
        const item = {
          sku: 'SKU_101', // SKU puede ser diferente por contrato
          quantity: 1,
          price: contrato.Plan.costo,
          descripcion: contrato.Plan.name_plan,
        };

        // Agregar taxes si idStratus es mayor o igual a 4
        if (contrato.idStratus >= 4) {
          if (!item.taxes) {
            item.taxes = []; // Inicializar el array si no existe
          }
          item.taxes.push({
            'tax-category': 'IVA',
            'tax-rate': '19',
            'tax-base': 100,
            'base-amount': contrato.Plan.costo,
          });
        }

        // Agregar retentions si retefuente es igual a 4
        if (contrato.retefuente === 4) {
          if (!item.retentions) {
            item.retentions = []; // Inicializar el array si no existe
          }
          item.retentions.push({
            'tax-category': 'RET_FUENTE',
            'tax-rate': 4,
          });
        }
        
        // Agregar discount-rate según el valor de descuento
        if (contrato.descuento === 0) {
          item['discount-rate'] = 0;
        } else {
          item['discount-rate'] = descuento; // Asignar el valor de descuento a discount-rate
        }

        // Agregar el objeto item al array items del jsonUsuario
        jsonUsuario.invoice.items.push(item);
      });

      // Verificar el tipo de persona y establecer la propiedad correspondiente
      if (tipo_persona === 'P.NATURAL') {
        jsonUsuario.invoice.customer.first_name = first_name;
        jsonUsuario.invoice.customer.family_name = family_name; // Asignar el nombre en caso de ser persona natural
      } else if (tipo_persona === 'P.JURIDICA') {
        jsonUsuario.customer.company_name = usuario.name_razonSocial; // Asignar el nombre de la empresa en caso de ser persona jurídica
      }
    });
  } catch (error) {}
};

// ----------------------------------------JSON PARA HACER PRUEBAS EN POSTMAN A LA URL DE DATAICO -----------------------

// {
//     "actions":{
//         "send_dian": false,
//         "send_email": false,
//         "email": "herreraf.danilo@gmail.com", // Correos destinados para el envío de la factura. Para múltiples correos se separa usando punto y coma (;)
//     },
//     "invoice": {
//         "issue_date": "06/01/2024", //Fecha de Expedición: formato dd/MM/yyyy o dd/MM/yyyy HH:mm:ss, se generan las facturas el último día de cada mes
//         "invoice_type_code": "FACTURA_VENTA",
//         "items" : // array de objetos, cada objeto es un contrato
//         [{
//             "sku": "SKU_101", // string SKU_ + CODIGO DE PRODUCTO
//             "taxes": // los contratos con estrato 4 y mayor se les cobra iva
//             [{
//                 "tax-category": "IVA",
//                 "tax-rate": "19",
//                 "tax-base": 100,
//                 "base-amount": 56000 // valor base contrato plan + otros cobros
//             }],
//             "quantity": 1,
//             "retentions":
//             [{
//                 "tax-category": "RET_FUENTE",
//                 "tax-rate": 4,
//             }],
//             "discount-rate": 0, // existe un contrato que maneja descuento el contrato 133
//             "price": 56000,
//             "descripcion": "5 MG - PLATA", // nombre del plan
//         }]
//         "payment_means_type": "CREDITO",
//         "prepayments": [{
//             "amount": 56000, // valor del pago
//             "description": "ENE/2024"
//         }],
//         "number": "1801", // numero de la factura
//         "numbering": {
//             "resolution_number": "18760000001", // numero resolucion expedida por la DIAN
//             "prefix": "YR", // prefijo asosiado a la resolucion
//             "flexible": false,
//         },
//         "dataico_account_id": "002979c5-7c23-43ab-aa98-3fa7dce6e4d0", // Identificador de la cuenta del cliente en DATAICO
//         "payment_date": "01/07/2024" // fecha vencimiento o fecha de pago oportuno
//         "env": "PRUEBAS", // Existen dos ambiente: PRUEBAS para mandar documentos electrónicos para la Habilitación ante la DIAN y PRODUCCION para el envío definitivo.
//         "notes": ["Después del 15 se procedera a suspender el servicio"],
//         "customer": {
//             "department": "META",
//             "address_line": "Calle 12", // Direccion del contrato
//             "party_type": "PERSONA_JURIDICA",  // PERSONA_JURIDICA, PERSONA_NATURAL
//             "city": "CUMARAL", // se puede enviar codigo o nombre
//             "tax_level_code": "COMUN", //SIMPLIFICADO, RESPONSABLE_DE_IVA, NO_RESPONSABLE_DE_IVA, COMUN
//             "email": "correo1@datico.com", // correo cliente
//             "country_code": "CO",
//             "first_name": "Pedro", //Necesario si el tipo de identificación es 'PERSONA_NATURAL'
//             "phone": "42112315",
//             "party_identification_type": "CC", //TE, PEP, TI, RC, CC, CE, PASAPORTE, IE, NIT_OTRO_PAIS, NIT
//             "company_name": "NOMBRE_EMPRESA",//Necesario si el tipo de identificación es 'PERSONA_JURIDICA'
//             "family_name": "Perez", //Necesario si el tipo de identificación es 'PERSONA_NATURAL'
//             "regimen": "ORDINARIO", //AUTORRETENEDOR, AGENTE_RETENCION_IVA, ORDINARIO, SIMPLE, GRAN_CONTRIBUYENTE
//             "party_identification": "900555556",
//         },
//         "payment_means": "CASH",
// }
// }
