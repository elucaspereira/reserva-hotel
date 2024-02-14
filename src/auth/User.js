const {v4:uuidv4}= require("uuid")

class User{
    constructor({id, name, userName, document, email, password}){
        this.id = id ?? uuidv4();
        this.name = name;
        this.userName = userName;
        this.document = document;
        this.email = email;
        this.password = password;
        
    }
}
module.exports = User;