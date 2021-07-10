const User=require('../models/user');
const jwt= require('jsonwebtoken');
const key='@45rh_fki_op'
exports.login=async (req,res,next)=>{
    try{
        const user= await new User(null,null,null,req.body.userName,req.body.password,null).login(); 
        //console.log(user)
        if(user){
            const jwtToken=jwt.sign({userName:user.userName,role:user.role},key)
            res.json({jwtToken:jwtToken})
        } else{
            res.json({error:"invalid username and password"})
        } 
    }catch(err){
       next(err)
    }
   
}
exports.authorize=(req,res,next)=>{
const token=req.headers.authorization;
  if(token){
    const jwtToken=token.split(' ')[1];
    try{
     const data=jwt.verify(jwtToken,key)
      req.user=data;
        next()
    }catch(error){
     res.status(403).json({error:"Forbidden"})
    }
  }else{
   res.status(401).json({error:"unauthorize"})
  }
}
exports.authorizeAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
      console.log("inside admin bank")
        next()
    }else{
     res.status(401).json({error:"unauthorize"})  
    }
}

exports.getAllUser= async (req,res,next)=>{
    const users= await User.findAll();
    console.log(users)
   res.status(200).json(users)
}
exports.save= async (req,res,next)=>{
  try{
    console.log("request comes")
    const userBody=req.body;
    // console.log(req.body)
    // console.log(req.body.userName==="")
    const check=await User.checkUserName(req.body.userName)
    //if the user exists it will data 
    //if no exists it will return null 
    console.log(check)
    if(!check){
        const user= await new User(null,userBody.firstName,userBody.lastName,userBody.userName,userBody.password,userBody.role).save() 
        res.status(201).json(user.ops);
    }else{
        res.status(201).json({error:"user name must be unique"});   
    }
  }catch(err){
      next(err)
  }
}
exports.update= async (req,res,next)=>{
  try{
    const user=await User.findByUserName(req.params.username)
    console.log(user._id)
    //const id=req.params.id;
    const userBody=req.body;
    // console.log(req.body)
    if(user.userName===req.body.userName){
        const updateUser= new User(user._id,userBody.firstName,userBody.lastName,userBody.userName,userBody.password,userBody.role);        
        await updateUser.update()
       res.status(200).json(updateUser)
    }else{
        res.status(200).json({error:"you can not updated user name"})
    }
  }catch(err){
     next(err)
  }
}
exports.delete= async (req,res,next)=>{
  try{
    await User.deleteById(req.params.id)
    res.status(200).end()
  }catch(err){
     next(err)
  }
}
exports.getByUserName= async (req,res,next)=>{
  try{
    console.log(req.params.username)
    const user=await User.findByUserName(req.params.username)
    console.log(user)
    res.status(200).json(user);
  }catch(err){
   next(err);
  }    
}