/* identificadores da reserva
id = identificador da reserva,
roomId = numero do quarto,
guestName = tiular da reserva,
document = armazena cpf e/ou cnpj do titular
phoneNumber =armazena o numero do telefone do tiutular
checkInDate = data da entrada
checkOutDate = data da saida
*/

const { v4: uuidv4 } = require("uuid")
// construtor que estabelece os parametros e cria a reserva
class Booking{
    constructor(roomId, guestName, document, phoneNumber, checkInDate, checkOutDate){
        this.id = uuidv4()
        this.roomId = roomId
        this.guestName = guestName
        this.document = document
        this.phoneNumber = phoneNumber
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
    }
}
 module.exports = Booking