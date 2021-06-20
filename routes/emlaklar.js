const path = require('path')
const express = require('express')
const fs = require('fs')
const router = express.Router()
const Emlak = require('../models/Emlak')
const User = require('../models/User')
const Panel = require('../models/Panel')



router.get('/', (req, res) => {
    Emlak.find({admin: req.session.userId}).lean().then(emlak=>{
        res.render('site/emlaklar', {
            style: 'style-emlaklar.css',
            emlak: emlak,
            adet: emlak.length
        })
    })
})

router.get('/emlak-ekle', (req, res) => {
    res.render('site/emlak-ekle', {
        style: 'style-emlak-ekle.css'
    })
})


router.get('/sil/:id', (req, res) => {
    const emlak_id = req.params.id

    console.log(emlak_id + " emlak silme TALEBİ !!!!!!!!!"  )

    Emlak.findByIdAndDelete(emlak_id).lean().then(emlak=>{
        console.log("SİLİNDİ!!!")

        var durum = emlak.durum

        var doluMiktar = 0
        var bosMiktar = 0
        var digerMiktar = 0

        if( durum == 'Dolu' ){
            doluMiktar = -1;
        }
        else if( durum == 'Boş' ){
            bosMiktar = -1;
        }
        else if( durum =='Diğer' ){
            digerMiktar = -1;
        }

        Panel.findOneAndUpdate( {name: req.session.userId}, 
            {$inc : {"emlak_durum.dolu" : doluMiktar, "emlak_durum.bos" : bosMiktar, "emlak_durum.diger": digerMiktar},
            }, 
            {new: true}, 
            function(err, response) { 
                res.redirect('/emlaklar')
            });
    }) 

})

router.get('/:id', (req, res) => {
    const emlak_id = req.params.id

    Emlak.findById(emlak_id).lean().then(emlak=>{
        console.log(emlak )

        if( emlak["durum"] == 'Dolu' ){
            res.locals.emlakDolu = true;
        }
        else{
            res.locals.emlakDolu = false;
        }

        res.render('site/emlak', {
            style: 'style-emlak.css',
            emlak: emlak,
            ozellikler: emlak["ozellikler"],
            cikis_tarihi: emlak["cikis_tarihi"],
            giris_tarihi: emlak["giris_tarihi"],
            kira_ucreti: emlak["kira_ucreti"],
            kiraci: emlak["kiraci"],
            odeme_gunu: emlak["odeme_gunu"],
            kira_durum: emlak["kira_durum"]

        })
    })

})

router.get('/kiraciyi-ekle/:id', (req, res) => {
    const emlak_id = req.params.id
    var kiraci = 0
    console.log(emlak_id)

    User.findById(req.session.userId , 'innerusers').lean().then(innerusers=>{
        var name = "innerusers";
        kiraci = innerusers[name]; 
    })
    console.log('kiraci')

    console.log(kiraci)


    Emlak.findById(emlak_id).lean().then(emlak=>{
        console.log(emlak )

        if( emlak.durum == 'Diğer' ){
            res.redirect("/emlaklar")
        }
        else if ( emlak.durum == 'Dolu' ){
            res.redirect("/emlaklar")
        }
        else{
            res.render('site/emlaklar-kiraciyi-ekle', {
                style: 'style-emlaklar-kiraciyi-ekle.css',
                emlak: emlak,
                kiraci: kiraci
            })
        }
    })
})

router.post('/kiraciyi-ekle/:id', (req, res) => {
    const emlak_id = req.params.id

    console.log('KİRACI EKLEME')
    console.log(req.body)

    console.log(req.params.id)

    Emlak.findOneAndUpdate(
        { _id: emlak_id }, 
        {
            durum: 'Dolu',
            fiyat: req.body.kira_ucreti,
            ...req.body
        }
     ).lean().then(result=>{
         res.redirect('/emlaklar')
     })

     Panel.findOneAndUpdate( {name: req.session.userId}, 
        {$inc : {"emlak_durum.dolu" : 1, "emlak_durum.bos" : -1, "kira_gelirleri.beklenenler" : req.body.kira_ucreti},
        }, 
        {new: true}, 
        function(err, response) { 
             // do something
        });


})


router.post('/emlak-ekle', (req, res) => {
    // ilk bilgileri girdi, devama bastı.
    var durum = 'Boş'
    if( req.body.emlak_turu == 'satilik' ){
        durum = 'Diğer'
        Panel.findOneAndUpdate( {name: req.session.userId}, 
            {$inc : {"emlak_durum.diger" : 1}}, 
            {new: true}, 
            function(err, response) { 
                 // do something
            });
    }
    else{
        Panel.findOneAndUpdate( {name: req.session.userId}, 
            {$inc : {"emlak_durum.bos" : 1}}, 
            {new: true}, 
            function(err, response) { 
                 // do something
            });
    }


    let kapak_image = {
        name: "emlak_ornek.png"
    }
    let gorsel_image = {
        name: "emlak_ornek.png"
    }

    if( req.files ){
        if(  req.files.kapak_image ){
            kapak_image = req.files.kapak_image;
            kapak_image.mv( path.join(__dirname, '../public/images/emlakImages', kapak_image.name) )
        }
        if( req.files.gorsel_image ){
            gorsel_image = req.files.gorsel_image;
            gorsel_image.mv( path.join(__dirname, '../public/images/emlakImages', gorsel_image.name) )
        }
    }

    Emlak.create({
        ...req.body,
        admin: req.session.userId,
        kapak_image:`/images/emlakImages/${kapak_image.name}`,
        gorsel_image:`/images/emlakImages/${gorsel_image.name}`,
        durum: durum,
        kira_durum: 'Ödenmedi'
    }, (error, success) =>{


        if (error) {
            console.log('error');
            console.log(error);
            res.redirect('/emlaklar')
         } else {
            console.log("BAŞARI")
            console.log(success)
            req.session.emlak_id = success['_id']
            console.log("emlak id !")
    
            console.log(req.session.emlak_id)
    
            res.render('site/emlak-ekle-2', {
                style: 'style-emlak-ekle-2.css'
            })
         }

    })

})

router.post('/emlak-ekle-2', (req, res) => {
    // bilgileri girdi, devama bastı.

    console.log("2 :  " + req.session.emlak_id)

    Emlak.findOneAndUpdate(
        { _id: req.session.emlak_id }, 
        {
            ...req.body
        }
        ,
        (error, success) =>{
             if (error) {
                console.log('error');
                console.log(error);
                res.redirect('/emlaklar')
             } else {
                console.log('success');
                 console.log(success);
                res.render('site/emlak-ekle-3', {
                    style: 'style-emlak-ekle-3.css'
                })
             }        
        }
     )
})

router.post('/emlak-ekle-3', (req, res) => {
    // bilgileri girdi, devama bastı.

    let emlak_file = {
        name: "belge_ornek.pdf"
    }

    if( req.files ){
        if(  req.files.emlak_file ){
            emlak_file = req.files.emlak_file
            emlak_file.mv( path.join(__dirname, '../public/documents', emlak_file.name) )
        }
    }

    Emlak.findOneAndUpdate(
        { _id: req.session.emlak_id }, 
        {
            emlak_file:`/documents/${emlak_file.name}`
        }
        ,
        (error, success) =>{
             if (error) {
                console.log('error');
                console.log(error);
                res.redirect('/emlaklar')
             } else {
                console.log('success');
                 console.log(success);

                 res.render('site/emlak-ekle-4', {
                    style: 'style-emlak-ekle-4.css'
                })

             }        
        }
     )

})

router.post('/emlak-ekle-4', (req, res) => {
    // bilgileri girdi, devama bastı.
    // artık emlağı al.

    console.log('CHECK')

    const {ozellik} = req.body
    console.log(ozellik)

    var ozellikListe= [];

    if( ozellik ){
        for(var i= 0; i < ozellik.length; i++){
            let singleOzellik = {
                name: ozellik[i]
            };
            ozellikListe.push(singleOzellik);
        }
    }





    Emlak.findOneAndUpdate(
        { _id: req.session.emlak_id }, 

        { $push:{ozellikler: ozellikListe} },
        
        (error, success) =>{
             if (error) {
                console.log('error');
                console.log(error);
             } else {
                console.log('success');
                 console.log(success);
             }        
        }

     )



    res.redirect('/emlaklar')
})


router.post('/kiraciyi-ekle', (req, res) => {
    // kiraciyi ekleme bilgilerini girdi sonra tıkladı
    res.redirect('/emlaklar')
    
})

module.exports = router;
