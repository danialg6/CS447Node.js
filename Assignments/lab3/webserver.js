
const http=require('http');
//const url=require('url');
const fs=require('fs');
http.createServer((req,res)=>{
    //const url=req.url;
    //const method=req.method;
    if(req.url==='/'){
        fs.createReadStream('index.html').pipe(res);
            console.log('Hello World');
    }else if(req.url==='/anymessage' && req.method==="POST"){
        const body=[];
        //consile.log(body);
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log(body);
         })
         req.on('end',()=>{
            const postData=Buffer.concat(body).toString();
            const postDataArr=postData.split('=');
            console.log(postDataArr);
            fs.writeFileSync('myfile.txt',postDataArr[1]);
        })
         res.statusCode = 302;
         res.setHeader("Location", "/");
          res.end();
    }
}).listen(3020,()=>{
    console.log('listening to 3020');
});
