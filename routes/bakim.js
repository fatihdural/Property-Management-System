const path = require('path')
const express = require('express')
const router = express.Router()
const Servis = require('../models/Servis')



router.get('/', (req, res) => {

    Servis.find({admin: req.session.userId}).lean().then(servis=>{
        res.render('site/bakim', {
            style: 'style-bakim-servisler.css',
            servis: servis,
            adet: servis.length
        })
    })

})

router.get('/sil/:id', (req, res) => {
    const servis_id = req.params.id

    console.log(servis_id + " servis silme TALEBİ !!!!!!!!!"  )

    Servis.findByIdAndDelete(servis_id).lean().then(emlak=>{
        console.log("SİLİNDİ!!!")
    })


    res.redirect('/bakim')

})


router.get('/servis-ekle', (req, res) =>{

    res.render('site/servis-ekle', {
        style: 'style-bakim-servis-ekle.css'
    })
})

router.post('/servis-ekle', (req, res) =>{
    // bilgileri girdi ve servis ekliyor


    let servis_image = {
        name: "servis_ornek.png"
    }

    if( req.files ){
        if(  req.files.servis_image ){
            servis_image = req.files.servis_image
            servis_image.mv( path.join(__dirname, '../public/images/servisImages', servis_image.name) )
        }

    }

    Servis.create({
        ...req.body,
        admin: req.session.userId,
        servis_image:`/images/servisImages/${servis_image.name}`,
    }, (error, success) =>{
        console.log("BAŞARI")
        console.log(success)
        res.redirect('/bakim')

    })
    

})


module.exports = router;
