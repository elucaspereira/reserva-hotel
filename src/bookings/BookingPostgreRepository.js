/*repositorio para salvar os dados no banco*/

const db = require("../database")
const Booking = require("./Booking")

class BookingRepository {
    constructor() {
        this.db = db
    }
    async findAll() {
        const storedBookings = await this.db.manyOrNone('SELECT id, room_id AS "roomId", guest_name AS "guestName", document, phone_number AS "phoneNumber", check_in_date AS "checkInDate", check_out_date AS "checkOutDate", user_id AS "userId" FROM Bookings')
        return storedBookings.map(booking => new Booking(booking))
    }

    async create(booking) {
        await this.db.none(
            "INSERT INTO Bookings(id, room_id, guest_name, document, phone_number, check_in_date, check_out_date, user_id) VALUES (${id}, ${roomId}, ${guestName}, ${document}, ${phoneNumber}, ${checkInDate}, ${checkOutDate}, ${userId}", booking)
    }
}

module.exports = BookingRepository 