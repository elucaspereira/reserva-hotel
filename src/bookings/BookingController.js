//controla as rotas 

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
}
module.exports = BookingController