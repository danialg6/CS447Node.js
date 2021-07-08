class User{
    constructor(username,password,role){
        this.username=username;
        this.password=password;
        this.role=role;
    }
    login(){
            return users.find(u=>{return u.username===this.username && u.password===this.password})
    }
}
    const users=[new User('john','admin123','admin'),new User('edward','edward567','user')];

module.exports=User;