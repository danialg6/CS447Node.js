const getDb = require("../util/database").getDB;
const { ObjectID } = require("mongodb");
class Bank{
    constructor(id,email,SSN,firstName,lastName,cardNumber,expDate,csv,balance){
        this._id= id; 
        this.email=email 
        this.SSN=SSN; 
        this.firstName=firstName;
        this.lastName=lastName;
        this.cardNumber=cardNumber;
        this.expDate= new Date(expDate) ;
        this.csv=csv;
        this.balance=balance;
    }
  static verifyBank(lastName,cardNumber,csv){
    console.log("verify banks")
    return getDb()
    .collection("banks")
    .findOne({cardNumber:cardNumber,lastName:lastName,csv:csv});
  }
  static checkCardNumber(cardNumber){
    return getDb()
    .collection("banks")
    .findOne({cardNumber:cardNumber}); 
  }
  save() {
    //console.log(this)
    return getDb().collection("banks").insertOne(this);
  }
  update() {
    return getDb()
      .collection("banks")
      .updateOne(
        { _id: new ObjectID(this._id) },
        {
          $set: { 
        email: this.email, 
        SSN:this.SSN, 
        firstName:this.firstName,
        lastName:this.lastName,
        cardNumber:this.cardNumber,
        expDate: this.expDate ,
        csv:this.csv,
        balance:this.balance
          },
        }
      );
  }
}

module.exports=Bank;