class AuthController{
    constructor(service){
        this.service = service;
    }

    register(request){
        let{name, userName, email, password, document} = request.body;

      
        if (!name || !email || !password){
            return {code: 400, body: {message:"name, email and password are required."}};
           
        }
        try{
            if(!userName){ // se nao for informado nome de usuario, sera atribuido o nome como nome de usuario
                userName = name
            }
            const user = this.service.register(name, userName, email, password, document);
            return{code: 201, body: user};
        }catch (error){
            return {code: 400, body: {message: error.message} };
        }
    }
    login(request){
        const{email, password} = request.body;
        if (!email || !password){
            return {code: 400, body: {message:"email and password are required."}};
        }
        try{
            const body = this.service.login(email,password);
            return {code: 200, body}
            
        }catch(error){
            return {code: 400, body: {message: error.message} };
        }
    }
}
module.exports = AuthController
