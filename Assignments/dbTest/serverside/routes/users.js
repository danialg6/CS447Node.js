const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController')

router.post('/users',userController.save)
router.post('/login',userController.login)
router.use(userController.authorize)
router.get('/users',userController.getAllUser)
router.get('/users/:username',userController.getByUserName)
router.put('/users/:username',userController.authorizeAdmin,userController.update)
router.delete('/users/:id',userController.authorizeAdmin,userController.delete)
module.exports = router;