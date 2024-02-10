class BookingController {
    constructor(service){
        this.service = service
    }

    index(){
        const bookings = this.service.findAllBookings()
        return { code: 200, body: { bookings }}
    }

    save(request){
        const {roomId, guestName, document, phoneNumber, checkInDate, checkOutDate} = request.body

        if(!roomId || !guestName || !document || !phoneNumber || !checkInDate || !checkOutDate){
            return {code: 400, body: { message: "All fields are required." }}
        }
        const booking = this.service.createBooking({roomId, guestName, document,phoneNumber, checkInDate, checkOutDate})
        return { code: 201, body:{ message: "Bookin crated successfully.", booking }}
    }
}
module.exports = BookingController