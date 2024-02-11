const Booking = require("./booking")

class BookingService {
    constructor(repository){
        this.repository = repository
    }
    findAllBookings(){
        return this.repository.findAll()
    }
    //cria a reserva
    createBooking({ roomId, guestName, document, phoneNumber, checkInDate, checkOutDate }){
        const newBooking = new Booking(roomId,guestName,document,phoneNumber,checkInDate,checkOutDate)

        const overlappingBooking = this.repository.findAll().find((booking) => {
            return(
                booking.roomId === newBooking.roomId && 
                booking.checkInDate < newBooking.checkOutDate &&
                booking.checkOutDate > newBooking.checkInDate
            )
        
        })
        if(overlappingBooking){
            throw new Error("the room is already booked for the selected dates.")
        }
        
        this.repository.create(newBooking)
        return newBooking
    }
}
module.exports = BookingService
