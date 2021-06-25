const fs=require('fs');
const path=require('path');
const http=require('http');

const server=http.createServer();

// const readable=fs.createReadStream(path.join(__dirname,'jmm_6393.jpg'));
// const writable=fs.createWriteStream(path.join(__dirname,'plane.jpg'));
// readable.pipe(writable);
server.on('req',function(req,res){
    fs.readFile(path.join(__dirname,'jmm_6393.jpg'),function(err,data){
        if(err) throw err;
        res.end(data);
    })
})
server.listen(3000,()=>{
    console.log("Done");
})



