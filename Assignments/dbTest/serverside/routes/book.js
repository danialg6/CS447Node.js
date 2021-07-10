const express = require('express');
const router = express.Router();
const bookController=require('../controllers/bookController')
const userController=require('../controllers/userController')
router.get('/',bookController.getAllBook)
router.get('/:id',bookController.getById)
router.post('/',userController.authorizeAdmin,bookController.save)
router.put('/:id',userController.authorizeAdmin,bookController.update)
router.delete('/:id',userController.authorizeAdmin,bookController.delete)
module.exports = router;