const Book=require('../models/book')
exports.getAllBook= async (req,res,next)=>{
    const books= await Book.findAll();;
   res.status(200).json(books)
}
exports.save= async (req,res,next)=>{
  try{
    const book=req.body;
    const newBook= await new Book(null,book.title,book.ISBN,book.publishDate,book.author,book.price).save() 
  //newBook is un object returned from the data base ops is property
    res.status(201).json(newBook.ops); 
  }catch(err){
      next(err)
  }
 
}
exports.update= async (req,res,next)=>{
  try{
    const id=req.params.id;
    const book=req.body;
    const updateBook= new Book(id,book.title,book.ISBN,book.publishDate,book.author,book.price);        
     await updateBook.update()
    res.status(200).json(updateBook) 
  }catch(err){
     next(err)
  }
}
exports.delete= async (req,res,next)=>{
  try{
    await Book.deleteById(req.params.id)
    res.status(200).json({deleted:"successfully"})
  }catch(err){
     next(err)
  }
}
exports.getById= async (req,res,next)=>{
  try{
    console.log(req.params)
    const book=await Book.findById(req.params.id)
    res.status(200).json(book);
  }catch(err){
   next(err);
  }    
}
