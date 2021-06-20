const mongoose = require('mongoose')

const ServisSchema = new mongoose.Schema({
    name: {type: String},
    saat: {type: String},
    tel: {type: String},
    servis_image: {type: String},
    admin: {type: String}
})

module.exports = mongoose.model('Servis', ServisSchema)