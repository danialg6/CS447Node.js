
const http=require('http');
//const url=require('url');
const fs=require('fs');
http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        fs.createReadStream('index.html').pipe(res);
    }else if(url==='/anymessage'&method==="POST"){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const postData=Buffer.concat(body);
            const postDataArr=postData.split('=');
            fs.writeFileSync('myfile.txt',"postDataArr[1]");
        })
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
    }
}).listen(3030,()=>{
    console.log('listening to 3030');
});
