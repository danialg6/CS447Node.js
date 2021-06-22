const myFilter=(arr)=>{
    setTimeout(()=>{
     console.log(arr.filter(e=>e%2===0));
}),5000}


console.log("start");
myFilter([1,2,3,4,5,6,7,8]);
//console.log(myFilter([1,2,3,4,5,6,7,8]));
console.log("end")