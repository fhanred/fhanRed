require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = require("../config/envs");


//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------

  // const sequelize = new Sequelize(
  //   `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  //  {
  //    logging: false, // set to console.log to see the raw SQL queries
  //    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  //  }
  // );
// // -------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
 
const sequelize = new Sequelize(DB_DEPLOY, {

      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      },
    }
);
 

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Summary, CreditN, DebitN, Receipt, Bill, Role, Inventory, Contract, Delivery, Facturacion, Plan, Vivienda, Documentation, Cash, Task, TaskAsign,  Ticket} =
  sequelize.models;

// Aca vendrian las relaciones
User.belongsTo(Role, { foreignKey: "id_role" });
Role.hasOne(User, { foreignKey: "id_role" });
User.belongsTo(Role, { foreignKey: "id_role" });
Role.hasOne(User, { foreignKey: "id_role" });

TaskAsign.belongsTo(Task, { foreignKey: "taskId" });
TaskAsign.belongsTo(User, { foreignKey: "n_documento" });



//contract ---> user
Contract.belongsTo(User, { foreignKey: "n_documento" });
User.hasMany(Contract, { foreignKey: "n_documento" });


// contract ---> plan
Contract.belongsTo(Plan, { foreignKey: "name_plan" });
Plan.hasOne(Contract, { foreignKey: "name_plan" });

// contract  ----> delivery
Contract.belongsTo(Delivery, { foreignKey: "id_delivery" });
Delivery.hasOne(Contract, { foreignKey: "id_delivery" });
//contract ---> inventory
Contract.belongsTo(Inventory, { foreignKey: "id_inventory" });
Inventory.hasOne(Contract, { foreignKey: "id_inventory" });

// delivery ----> tipovivienda
Delivery.belongsTo(Vivienda, { foreignKey: "id_vivienda"});
Vivienda.hasMany(Delivery, { foreignKey: "id_vivienda"});



// user ----> documentation
User.hasMany(Documentation, { foreignKey: "n_documento" });
Documentation.belongsTo(User, { foreignKey: 'n_documento' });

// contract ----> documentation
Contract.hasOne(Documentation, { foreignKey: "id_Contract" });

//TODO: Ticket - Crear relaciones: Contrato, User(tecnico), Vivienda?
// Contract ------> Ticket
Contract.hasMany(Ticket, { foreignKey: "n_ticket"});
Ticket.belongsTo(Contract, { foreignKey: "n_contrato" } );

//Ticket -----------> User
User.hasMany(Ticket, { foreignKey: "n_ticket" } )
Ticket.belongsTo(User, { foreignKey: "n_documento"})



// Relaciones  Summary
Summary.belongsTo(User, { foreignKey: 'n_documento', targetKey: 'n_documento', as: 'user' });
Summary.belongsTo(Contract, { foreignKey: 'n_contrato', targetKey: 'n_contrato', as: 'contract' });

Bill.belongsTo(User, { foreignKey: 'party_identification', targetKey: 'n_documento'});
User.hasMany(Cash, { foreignKey: 'n_documento' }); 
Bill.hasOne(CreditN, { foreignKey: 'billId', as: 'creditNote' });
CreditN.belongsTo(Bill, { foreignKey: 'billId', as: 'bill' });

//---------------------------------------------------------------------------------//
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};