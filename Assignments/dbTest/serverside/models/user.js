//const users=[]
const getDb = require("../util/database").getDB;
const { ObjectID } = require("mongodb");
 class User{
    constructor(id,firstName,lastName,userName,password,role){
        this._id=id;
        this.firstName=firstName;
        this.lastName=lastName
        this.userName=userName;
        this.password=password;
        this.role=role;
    }
login(){
    return getDb().collection('users').findOne({ userName: this.userName, password: this.password });
}
save() {
    return getDb().collection("users").insertOne(this);
  }
  static findAll() {
    return getDb().collection("users").find().toArray();
  }
  static findByUserName(userName) {
    return getDb()
      .collection("users")
      .findOne({userName:userName});
  }
  static checkUserName(userName){
    return getDb()
    .collection("users")
    .findOne({userName:userName}); 
  }
  update() {
    return getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectID(this._id) },
        {
          $set: {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            role: this.role
          },
        }
      );
  }
  static deleteById(id) {
    return getDb()
      .collection("users")
      .deleteOne({ _id: new ObjectID(id) });
  }
}
module.exports=User;