const express=require('express')
const path=require('path')
const user=require('./router/user')
const product=require('./router/product')
const error=require('./router/error')
// const errorHandler=require('./router/errorHandler')
// const pageNotFound=require('./router/notFound')
let jsonParam=express.json()
//req.qury
//req.parema
let urlEncoder=express.urlencoded({extended:true})
//req.body
const app=express()
 app.use(urlEncoder)
app.use(user)
app.use(product)
app.use(error)
app.use((err ,req, res, next)=> { 
    res.sendFile(path.join(__dirname,'./','views','500.html'))
});
app.use((req, res, next) => { 
    res.status(404).sendFile(path.join(__dirname,'./','views','404.html'))
})
app.listen(300,()=>{
    console.log("listening on port 300")
})