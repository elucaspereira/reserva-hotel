/*repositorio para salvar os dados
ainda em fase de implementação por esse motivo esta sendo salvo os arquivos em um
array, mas sera criado a rota para salvar diretamente na tabela correspondente em um banco postgresql*/

class BookingRepository {
    constructor(){
        this.bookings = []
    }
    findAll(){
        return this.bookings
    }

    create(booking){
        this.bookings.push(booking)
    }
}

module.exports = BookingRepository 