const express=require('express');
const userControler=require('../controler/usercontroler');
const router=express.Router();
router.post('/login',userControler.login);
//router.use(userControler.authorize);



module.exports=router;