const express= require('express');

const bookcontroler= require('../controler/bookcontroler');
const router=express.Router();

//
router.get('/books',bookcontroler.getAllBooks);
router.post('/books',bookcontroler.save);


//findbyid
router.get('/books/:Id',bookcontroler.findBookById);
//router.post('/books/:Id',bookcontroler.findById);
router.put('/books/:bookId', bookcontroler.update);
//router.post('/books/:Id',bookcontroler.updateFile);
router.delete('/:bookId', bookcontroler.deleteById);
module.exports=router;