const mongoose = require('mongoose')

const PanelSchema = new mongoose.Schema({
    name: {type: String, required:true},
    emlak_durum: {
            bos: {type: Number}, 
            dolu: {type: Number}, 
            diger: {type: Number}
    },
    gelir: {
        "01": {type: Number}, 
        "02": {type: Number}, 
        "03": {type: Number},
        "04": {type: Number}, 
        "05": {type: Number}, 
        "06": {type: Number},    
        "07": {type: Number}, 
        "08": {type: Number}, 
        "09": {type: Number},
        "10": {type: Number}, 
        "11": {type: Number}, 
        "12": {type: Number}, 
    },
    gider: {
        "01": {type: Number}, 
        "02": {type: Number}, 
        "03": {type: Number},
        "04": {type: Number}, 
        "05": {type: Number}, 
        "06": {type: Number},    
        "07": {type: Number}, 
        "08": {type: Number}, 
        "09": {type: Number},
        "10": {type: Number}, 
        "11": {type: Number}, 
        "12": {type: Number}, 
    },
    tum_gelir: {type: Number},
    tum_gider: {type: Number},
    tum_beklenen: {type: Number},
    kira_gelirleri:{
        "gelenler": {type: Number},
        "beklenenler":{type: Number}
    }
})

module.exports = mongoose.model('Panel', PanelSchema)