const User = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



class AuthService {
    constructor(repository){
        this.repository = repository
    }

    async register(name, userName, email, password, document){
        const userExists = await this.repository.findByEmail(email);
        if (userExists) throw new Error("This email whas already used by another user.");

        const newUser = new User({name, userName, email, password, document});
        newUser.password = bcrypt.hashSync(newUser.password,10);
        await this.repository.save(newUser);
        return newUser;
    }

    async login(email, password){
        const user = await this.repository.findByEmail(email);
        if (!user) throw new Error("User not found.");

        const isSamePassword = bcrypt.compareSync(password, user.password);
        if(!isSamePassword) throw new Error("Wrong password.")


        const token = jwt.sign({id: user.id, email: user.email}, "apiProtection", {expiresIn: "1d"});
        user.password = undefined
        return {token, user};
    }
    async verifyToken(token){
        const decodedToken = jwt.verify(token,"apiProtection");
        const user = await this.repository.findByEmail(decodedToken.email);
        return user;
    }

}
module.exports = AuthService