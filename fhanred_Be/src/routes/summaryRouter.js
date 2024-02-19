   const Router = require("express");
   const {
   
    getSummaryByUser
} = require('../controllers');

const router = Router();
 



router.get('/:n_documento', getSummaryByUser);



 module.exports = router;