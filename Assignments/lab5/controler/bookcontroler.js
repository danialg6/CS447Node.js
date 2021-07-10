const Book= require('../models/book');
// router uses controler// return all the middleware

module.exports.getAllBooks=(req,res,next)=>{
    res.status(200).json(Book.getAll());
}
//id, title, ISBN, publishedDate, author
exports.save=(req,res,next)=>{
    //console.log(req.body)
    const myBook=new Book(null,req.body.title,req.body.ISBN,req.body.publishedDate,req.body.author);
    res.status(200).json(myBook.save());
}
exports.findBookById=(req,res,next)=>{
    res.status(200).json(Book.findById(req.params.bookId))
}
exports.update = (req, res, next) => {
    const book = req.body;
    const updatedBook = new Book(req.params.bookId, book.title, book.ISBN, book.publishedDate, book.author).update();
    res.status(200).json(updatedBook);
}
exports.deleteById = (req, res, next) => {
    Book.deleteById(req.params.bookId);
    res.status(200).end();
}