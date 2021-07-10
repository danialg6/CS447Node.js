const products=[];
let count=1;
module.exports=class Product{
    constructor(pid,title,price,description){
        this.pid=pid;
        this.title=title;
        this.price=price;
        this.description=description;
    }
    // static getAll(){
    //     return products;
    // }
    saveProduct(){
        this.pid=count;
        products.push(this);
        counter++;
        return this;
    }
    
    static getProductById(pid){
       
        return products.find(prod=>prod.pid===pid)
    }
}
// //=Product;

// const products=[];
// module.exports=class Product{
//         constructor(id,title,price,description){
//             this.id=id;
//             this.title=title;
//             this.price=price;
//             this.description=description;
//         }
//     }
