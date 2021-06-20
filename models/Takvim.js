const mongoose = require('mongoose')

const TakvimSchema = new mongoose.Schema({
    name: {type: String, required: true},
    etkinlikler: [
        {
            tarih: {type: String, required: true}, 
            baslik: {type: String, required: true}
        }
    ],
})

module.exports = mongoose.model('Takvim', TakvimSchema)