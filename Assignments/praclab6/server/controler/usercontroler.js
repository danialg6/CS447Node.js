const User=require('../models/user');
const jwt=require('jsonwebtoken');
const secret='BookStore';
exports.login=(req,res,next)=>{
    const user=new User(req.body.username,req.body.password,null).login();
    if(user){
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        //if you use 
        const jwtToken=jwt.sign({username:user.username,role:user.role},secret)
        res.json({jwtToken});
        //res.json({'success':'true'});

    }else{
        res.json({'error':'Invalid username and password'});
    }
}
exports.authorize=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
      const jwtToken=authHeader.split(' ')[1];
    //   jwt.verify(jwtToken,secret,(err,user)=>{//(err,data(the data is payload))
    //     if(err){
    //    res.status(403).json({error:'Forbiden'});
    //     }else{
    //         next();
    //     }
    //   });
    // }else{
    //     res.status(401).json({error:'unauthorized'})
    // }
    try{
        const payload= jwt.verify(jwtToken,secret)
        req.user=payload;
        next();
    }catch(err){
        res.status(403).json({error:'Forbiden'});
    }
}else{
    res.status(401).json({error:'unauthorized'})
}
}
//for delete,update
exports.authorizeAdmin=(req,res,next)=>{
    
if(req.user.role==="admin"){
    next();
}else{
    res.status(401).json({error:'Forbiden'});
}
}