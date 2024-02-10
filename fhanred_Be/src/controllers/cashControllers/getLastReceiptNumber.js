// const { Cash } = require('../../data'); 
// const response = require("../../utils/response");

// module.exports = async (req, res) => {
//     try {
       
//         const lastReceipt = await Cash.findOne({
//           attributes: ['receipt'],
//           order: [['receipt', 'DESC']],
//           limit: 1
//         });
    
//         if (lastReceipt) {
//           res.json({ lastReceiptNumber: lastReceipt.receipt });
//         } else {

//           res.json({ lastReceiptNumber: 0 });
//         }
//       } catch (error) {
//         console.error('Error fetching last receipt number:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     }
  