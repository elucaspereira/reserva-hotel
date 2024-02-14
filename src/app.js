const fastify = require("fastify")
const BookingRepository = require("./bookings/BookingRepository")
const BookingService = require("./bookings/BookingService")
const BookingController = require("./bookings/BookingController")
const AuthController = require("./auth/AuthController")
const UserRepository = require("./auth/UserRepository")
const AuthService = require("./auth/AuthService")

const app = fastify({logger: true})

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)
const userRepository = new UserRepository()
const authService = new AuthService(userRepository);
const authController = new AuthController(authService)

const authenticatedRouteOption = {
    preHandler:(request,reply,done) => {
        const token = request.headers.authorization?.replace(/^Bearer /,"");
        if(!token) reply.code(401).send({message: "Unauthorized: token missing."});

        const user = authService.verifyToken(token);
        if(!user) reply.code(404).send({message: "Unauthorized: invalid token."});
        request.user = user;
        done();
    }
};

//rota para teste de conexao
app.get("/hello",(request, reply ) => {
    reply.send({ message: "Connected to the database" })
});

//rota que busca as reservas lançadas
app.get("/api/bookings",authenticatedRouteOption,(request, reply) => { 
    const {code, body} = bookingController.index(request)
    reply.code(code).send(body)
});


//rota que cria as reservas
app.post("/api/bookings",authenticatedRouteOption,(request, reply) => {
    const { code, body } = bookingController.save(request)
    reply.code(code).send(body)
});

// rota que registra o usuario
app.post("/api/auth/register",(request, reply)=> {
    const {code, body} = authController.register(request);
    reply.code(code).send(body);
});

// rota de login
app.post("/api/auth/login",(request, reply)=> {
    const {code, body} = authController.login(request);
    reply.code(code).send(body);
})

module.exports = app