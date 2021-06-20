const mongoose = require('mongoose')

const MuhasebeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    islem: [
        {
            tarih: {type: String}, 
            emlak: {type: String}, 
            islem_isim: {type: String},
            iletisim: {type: String},
            miktar: {type: String},
            miktar_durum: {type: String},
            tip: {type: String}
        }
    ],
    tum_gelir: {type: Number},
    tum_gider: {type: Number},
    tum_beklenen: {type: Number}
})

module.exports = mongoose.model('Muhasebe', MuhasebeSchema)