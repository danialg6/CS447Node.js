const { json } = require("body-parser");
const { title } = require("process");

window.onload=function(){
    document.getElementById('addBtn').onclick=function(event){
        event.preventDefault();
     
        document.getElementById('id').value;
     document.getElementById('title').value;
     document.getElementById('ISBN').value;
     document.getElementById('publishedDate').value;
     document.getElementById('author').value;
//id,title,ISBN,publishedDate,author
     fetch('http://localhost:3000/books',{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
         },
         body:json.toString({
             id:id,
             title:title,
             ISBN:ISBN,
             publishedDate:publishedDate,
             author:author
         })

     }).then(data=>data.json())
       .then(data=>{
         console.log(data);
         //document.getElementById('add-form').reset();
       

     })

    }
}