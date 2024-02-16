const fastify = require("fastify")
const BookingRepository = require("./bookings/BookingPostgreRepository")
const BookingService = require("./bookings/BookingService")
const BookingController = require("./bookings/BookingController")
const AuthController = require("./auth/AuthController")
const UserRepository = require("./auth/UserPostgreRepository")
const AuthService = require("./auth/AuthService")


const app = fastify({logger: true})

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController = new BookingController(bookingService)
const userRepository = new UserRepository()
const authService = new AuthService(userRepository);
const authController = new AuthController(authService)

const authenticatedRouteOption = {
    preHandler: async (request,reply) => {
        const token = request.headers.authorization?.replace(/^Bearer /,"");
        if(!token) reply.code(401).send({message: "Unauthorized: token missing."});

        const user = await authService.verifyToken(token);
        if(!user) reply.code(404).send({message: "Unauthorized: invalid token."});
        request.user = user;
        
    }
};

//rota para teste de conexao
app.get("/hello",(request, reply ) => {
    reply.send({ message: "Connected to the database" })
});

//rota que busca as reservas lançadas
app.get("/api/bookings", authenticatedRouteOption, async (request, reply) => { 
    const {code, body} = await bookingController.index(request)
    reply.code(code).send(body)
});


//rota que cria as reservas
app.post("/api/bookings", authenticatedRouteOption, async (request, reply) => {
    const { code, body } = await bookingController.save(request)
    reply.code(code).send(body)
});

// rota que registra o usuario
app.post("/api/auth/register", async (request, reply)=> {
    const {code, body} = await authController.register(request);
    reply.code(code).send(body);
});

// rota de login
app.post("/api/auth/login", async (request, reply)=> {
    const {code, body} = await authController.login(request);
    reply.code(code).send(body);
})

module.exports = app