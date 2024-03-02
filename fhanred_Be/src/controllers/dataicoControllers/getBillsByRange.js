const axios = require('axios');
const { Bill } = require('../../data');
const response = require("../../utils/response");
const { DATAICO_AUTHTOKEN } = require("../../config/envs");
const moment = require('moment');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 0; 
    const endNumber = 900; 
    const successfulBills = [];
    const failedBills = [];

    
    for (let i = startNumber; i <= endNumber; i++) {
      try {
        const response = await axios.get(`https://api.dataico.com/dataico_api/v2/invoices?number=FHA${i}`, {
          headers: {
            'Auth-Token': authToken
          }
        });

        if (response.status === 200) {
          const billData = response.data.invoice;

          
          const existingBill = await Bill.findOne({
            where: {
              numberI: billData.number
            }
          });

          if (!existingBill) {
            
            const formattedIssueDate = moment(billData.issue_date, 'DD/MM/YYYY HH:mm:ss').toDate();
            const createdBill = await Bill.create({
              numberI: billData.number,
              issue_date: formattedIssueDate,
              party_identification: billData.customer.party_identification,
              price: billData.items[0].price,
              qrcode: billData.qrcode,
              
            });
            successfulBills.push(createdBill);
          } else {
            console.log(`La factura ${billData.number} ya existe en la base de datos. No se guarda.`);
          }
        } else {
          failedBills.push({ number: `FHA${i}`, error: `Error al obtener la factura FHA${i}: Status ${response.status}` });
        }
      } catch (error) {
        failedBills.push({ number: `FHA${i}`, error: `Error al obtener la factura FHA${i}: ${error.message}` });
      }
    }

   
    response(res, 200, { successfulBills, failedBills });
  } catch (error) {
    console.error('Error:', error);
  
    response(res, 500, 'Error interno del servidor');
  }
};




