/*
Create a simple Node script that converts 'www.miu.edu'
 domain name to the equivalent IP address.
 (Search and learn 'dns' module, resolve4)
*/
// const dns=require('dns');
// dns.lookup( '192.249.118.206', (err,value)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(value);
// } );

//resolve4

const dns=require('dns');
dns.resolve4('www.miu.edu', (err,value)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(value);

} );

//reverse

// const dns=require('dns');
// dns.resolve4('www.miu.edu' ,(err,value)=>{
//     console.log(value)
// dns.reverse(value, (err,hostname)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(hostname);

// } );
// });