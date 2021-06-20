const mongoose = require('mongoose')

const BelgeSchema = new mongoose.Schema({
    name: {type: String},
    numara: {type: String},
    aciklama: {type: String},
    belge: {type: String},
    admin: {type: String},
    tarih: {type: Date, default:Date.now},
})

module.exports = mongoose.model('Belge', BelgeSchema)