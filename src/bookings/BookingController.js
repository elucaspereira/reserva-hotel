//controla as rotas 

const Booking = require("./Booking")
const BookingRepository = require("./BookingPostgreRepository")

class BookingController {
    constructor(service){
        this.service = service
    }

    async index(){
        const bookings = await this.service.findAllBookings()
        return { code: 200, body: { bookings }}
    }

    async save(request){
        const {roomId, guestName, document, phoneNumber, checkInDate, checkOutDate} = request.body
        const user = request.user

        

        if(!roomId || !guestName || !document || !phoneNumber || !checkInDate || !checkOutDate){
            return {code: 400, body: { message: "All fields are required." }}
        }
        const booking = await this.service.createBooking({userId: user.id, roomId, guestName, document, phoneNumber, checkInDate, checkOutDate})
        return { code: 201, body:{ message: "Bookin crated successfully.", booking }}
    }
    async deleteBookings(request){
        const bookingId = request.params.id;
        if(!bookingId){
            return { code:400, body:{message: "id da reserva nao informado"}};
        }
        try{ 
            await this.service.deleteBookings(bookingId);
            return {code: 200, body:{message: "Reserva deletada com sucesso"}}
        }catch (error){
            console.error(`Erro ao deletar reserva: ${error.message}`);
            return{code:500, body:{message:"Erro ao deletar"}}
        }


    }
}
module.exports = BookingController