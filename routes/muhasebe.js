const path = require('path')
const express = require('express')
const router = express.Router()
const Emlak = require('../models/Emlak')
const User = require('../models/User')
const Servis = require('../models/Servis')
const Muhasebe = require('../models/Muhasebe')
const Panel = require('../models/Panel')



router.get('/', (req, res) => {
    var islem = 0
    console.log(req.session.userId)

    Muhasebe.findOne({name: req.session.userId}).lean().then(muhasebe=>{
        console.log("MUHASEBE MUHASEBE")
        console.log(muhasebe)
        
        var name = "islem";
        islem = muhasebe[name]; 



        console.log(islem.sort((a, b) => {
            if (a.tarih > b.tarih)
              return -1;
            if (a.tarih < b.tarih)
              return 1;
            return 0;
          }));


        res.render('site/muhasebe', {
            style: 'style-muhasebe.css',
            islem: islem,
            gelir: muhasebe.tum_gelir,
            gider: muhasebe.tum_gider,
            beklenen: muhasebe.tum_beklenen
        })

    })



})

router.get('/gelir-ekle', (req, res) => {
    const emlak_id = req.params.id

    var kiraci = 0
    var servis = 0
    console.log(emlak_id)

    User.findById(req.session.userId , 'innerusers').lean().then(innerusers=>{
        var name = "innerusers";
        kiraci = innerusers[name]; 
    })
    console.log('kiraci')

    console.log(kiraci)

    Servis.find({admin: req.session.userId}).lean().then(servisinner=>{
        servis = servisinner
    })


    Emlak.find({admin: req.session.userId}).lean().then(emlak=>{
        console.log(emlak )
        res.render('site/gelir-ekle', {
            style: 'style-gelir-ekle.css',
            emlak: emlak,
            kiraci: kiraci,
            servis: servis
        })
    })
    
})

router.get('/gider-ekle', (req, res) => {
    const emlak_id = req.params.id

    var kiraci = 0
    var servis = 0
    console.log(emlak_id)

    User.findById(req.session.userId , 'innerusers').lean().then(innerusers=>{
        var name = "innerusers";
        kiraci = innerusers[name]; 
    })
    console.log('kiraci')

    console.log(kiraci)

    Servis.find({admin: req.session.userId}).lean().then(servisinner=>{
        servis = servisinner
    })


    Emlak.find({admin: req.session.userId}).lean().then(emlak=>{
        console.log(emlak )
        res.render('site/gider-ekle', {
            style: 'style-gider-ekle.css',
            emlak: emlak,
            kiraci: kiraci,
            servis: servis
        })
    })
    
})



router.post('/gelir-ekle', (req, res) => {

    console.log('AGA İŞLEM YAPILIYO AGA')

/*     Muhasebe.create({
        name: req.session.userId
    }, (error, success) =>{
        console.log("BAŞARI")
        console.log(success)
    }) */

    console.log(req.body)

    const {tarih, emlak, iletisim, islem_isim, miktar, miktar_durum, kira_geliri_mi} = req.body;


    console.log('iletisim')

    console.log(iletisim)

    var gelir_miktar = miktar
    var beklenen_miktar = 0



     var gelir = { tip: 'gelir', name: req.session.userId, tarih: tarih, emlak: emlak, islem_isim: islem_isim, iletisim: iletisim, miktar: miktar, miktar_durum: miktar_durum };
    Muhasebe.findOneAndUpdate(
       { name: req.session.userId }, 
       { 
           $push: { 
               "islem": gelir  
            },
            $inc: {"tum_gelir": gelir_miktar, "tum_beklenen": beklenen_miktar},
        },
       
       (error, success) =>{
            if (error) {
                console.log(error);
            } else {
                console.log(success);
                
            }        
       }

    )


    const [yil, ay, gun] = tarih.split("-")


    const ayGelir = "gelir." + ay;
    console.log("ayGelir   " + ayGelir)

    var kira_gelen = 0
    var kira_beklenen = 0

    if( kira_geliri_mi == 'evet' && emlak != '-'){
        kira_gelen = gelir_miktar
        kira_beklenen = (-1) * gelir_miktar


        // kira ödendiyse 
        Emlak.findOneAndUpdate(
            { admin: req.session.userId, baslik: emlak }, 
            {
                kira_durum: 'Ödendi'
                
            }
         ).lean().then(result=>{
         })

    }


    
    // panele ekleme
    Panel.findOneAndUpdate(
        { name: req.session.userId }, 
        { 
            $inc: {
                "tum_gelir": gelir_miktar,
                [ayGelir]: gelir_miktar,
                "kira_gelirleri.gelenler": kira_gelen,
                "kira_gelirleri.beklenenler": kira_beklenen
            },
         },
        
        (error, success) =>{
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
                 res.redirect('/muhasebe')
             }        
        }
 
     )   


 
})


router.post('/gider-ekle', (req, res) => {

    console.log('İŞLEM YAPILIYO')

/*     Muhasebe.create({
        name: req.session.userId
    }, (error, success) =>{
        console.log("BAŞARI")
        console.log(success)
    }) */

    const {tarih, emlak, iletisim, islem_isim, miktar, miktar_durum} = req.body;


    console.log('iletisim')

    console.log(iletisim)



     var gelir = { tip: 'gider', name: req.session.userId, tarih: tarih, emlak: emlak, islem_isim: islem_isim, iletisim: iletisim, miktar: miktar, miktar_durum: miktar_durum };
    Muhasebe.findOneAndUpdate(
       { name: req.session.userId }, 
       { 
           $push: { 
               "islem": gelir  
            },
            $inc: {"tum_gider": miktar}
        },
       
       (error, success) =>{
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }        
       }

    )


    const [yil, ay, gun] = tarih.split("-")


    const ayGelir = "gider." + ay;
    console.log("ayGelir   " + ayGelir)
    
    // panele ekleme
    Panel.findOneAndUpdate(
        { name: req.session.userId }, 
        { 
            $inc: {
                "tum_gider": miktar,
                [ayGelir]: miktar,
            },
         },
        
        (error, success) =>{
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
                 res.redirect('/muhasebe')
             }        
        }
 
     )


})






module.exports = router;
