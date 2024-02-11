const fastify = require("fastify")
const BookingRepository = require("./bookings/BookingRepository")
const BookingService = require("./bookings/BookingService")
const BookingController = require("./bookings/BookingController")

const app = fastify({logger: true})

const bookingRepository = new BookingRepository()
const bookingService = new BookingService(bookingRepository)
const bookingController= new BookingController(bookingService)

//rota para teste de conexao
app.get("/hello",(request, reply ) => {
    reply.send({ message: "Connected to the database" })
})

//rota que busca as reservas lançadas
app.get("/api/bookings",(request, reply) => { 
    const {code, body} = bookingController.index(request)
    reply.code(code).send(body)
})


//rota que cria as reservas
app.post("/api/bookings",(request, reply) => {
    const { code, body } = bookingController.save(request)
    reply.code(code).send(body)
})

module.exports = app