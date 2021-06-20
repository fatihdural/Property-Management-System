const mongoose = require('mongoose')

const EmlakSchema = new mongoose.Schema({
    admin: {type: String, required: true},
    baslik: {type: String},  
    aciklama: {type: String},
    alan: {type: String},    
    fiyat: {type: String},   
    depozito: {type: String},
    oda_sayisi: {type: String},
    banyo_sayisi: {type: String},
    aidat: {type: String},
    bul_kat: {type: String},
    bina_kat: {type: String},
    emlak_tipi: {type: String},
    isitma_tipi: {type: String},
    yapim_yili: {type: String},
    bahce_durumu: {type: String},
    kapak_image: {type: String},
    gorsel_image: {type: String},

    ulke: {type: String},
    sehir: {type: String},
    ilce: {type: String},
    mahalle: {type: String},
    sokak: {type: String},
    cadde: {type: String},
    apart_no: {type: String},
    daire_no: {type: String},
    posta_kodu: {type: String},
    emlak_file: {type: String},
    ozellikler: {type: Array},
    durum: {type: String},
    kira_durum: {type: String},

    kiraci: {type: String},
    giris_tarihi: {type: String},
    cikis_tarihi: {type: String},
    odeme_gunu: {type: String},
    kira_ucreti: {type: String},
})

module.exports = mongoose.model('Emlak', EmlakSchema)