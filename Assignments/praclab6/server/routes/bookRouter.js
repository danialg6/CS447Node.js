const express= require('express');

const bookcontroler= require('../controler/bookcontroler');
const router=express.Router();
const userControler=require('../controler/usercontroler');
//
router.get('/books',bookcontroler.getAllBooks);
router.post('/books',bookcontroler.save);


//findbyid
router.get('/books/:Id',bookcontroler.findBookById);
//router.post('/books/:Id',bookcontroler.findById);
//router.put('/books/:bookId', bookcontroler.update);
router.put('/books/:bookId',userControler.authorizeAdmin, bookcontroler.update);

//router.post('/books/:Id',bookcontroler.updateFile);
//router.delete('/:bookId', bookcontroler.deleteById);
router.delete('/books/:bookId', userControler.authorizeAdmin,bookcontroler.deleteById);

module.exports=router;