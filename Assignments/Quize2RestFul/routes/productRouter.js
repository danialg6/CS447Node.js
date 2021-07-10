const express=require('express');
const router=express.Router();

const productController=require('../controllers/productController');

router.get('/:productId',productController.getProductById);
router.post('/',productController.save);


module.exports=router;