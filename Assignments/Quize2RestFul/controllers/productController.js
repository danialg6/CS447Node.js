
const Product = require('../models/product');


module.exports.save=(req,res,next)=>{
   //req.body;
   res.json(new Product(null, req.body.title, req.body.price, req.body.description).saveProduct());  

}
module.exports.getProductById=(req,res,next)=>{
    const productId=Number(req.params.productId);
    res.json(Product.getProductById(productId));
}
