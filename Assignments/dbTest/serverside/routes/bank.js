const express = require('express');
const router = express.Router();
const bankController=require('../controllers/bankController')
const userController=require('../controllers/userController')
// console.log(userController.authorizeAdmin)
// console.log(bankController)
router.post('/placeOrder',bankController.verifyBank)
router.post('/banks',userController.authorizeAdmin,bankController.save)
module.exports = router;