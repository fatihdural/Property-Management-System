const path = require('path')
const express = require('express')
const router = express.Router()
const Belge = require('../models/Belge')


router.get('/', (req, res) => {
    Belge.find({admin: req.session.userId}).lean().then(belge=>{


        console.log(belge.sort((a, b) => {
            if (a.tarih > b.tarih)
              return -1;
            if (a.tarih < b.tarih)
              return 1;
            return 0;
          }));


        res.render('site/dokumanlar', {
            style: 'style-dokumanlar.css',
            belge: belge
        })
    })

})

router.get('/sil/:id', (req, res) => {
    const satir_id = req.params.id

    console.log(satir_id + " satir silme TALEBİ !!!!!!!!!"  )

    Belge.findByIdAndDelete(satir_id).lean().then(belge=>{
        console.log("SİLİNDİ!!!")
        res.redirect('/dokumanlar')
    })
})



router.get('/belge-ekle', (req, res) => {
    res.render('site/belge-ekle', {
        style: 'style-dokumanlar-belge-ekle.css'
    })
})

router.post('/belge-ekle', (req, res) => {


    // bilgileri girdi ve servis ekliyor


    let belge = {
        name: "belge_ornek.pdf"
    }

    if( req.files ){
        if(  req.files.belge ){
            belge = req.files.belge
            belge.mv( path.join(__dirname, '../public/documents', belge.name) )
        }

    }

    Belge.create({
        ...req.body,
        admin: req.session.userId,
        belge:`/documents/${belge.name}`,
    }, (error, success) =>{
        console.log("BAŞARI")
        console.log(success)


        var belgeNumara = success.numara;

        if( belgeNumara == undefined || belgeNumara == '' || belgeNumara == null ){

            var belgeNumaraTemp = success._id;

            console.log( belgeNumaraTemp.toString() )

            belgeNumara = belgeNumaraTemp.toString().slice(-10);

            console.log(belgeNumara)

            Belge.findOneAndUpdate(
                { _id: success._id }, 
                {
                    numara: belgeNumara
                }
             ).lean().then(result=>{
                res.redirect('/dokumanlar')
            })
    

        }
        else{
            res.redirect('/dokumanlar')
        }




    })


    
    
})

module.exports = router;
