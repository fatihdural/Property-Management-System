const path = require('path')
const express = require('express')
const router = express.Router()
const Takvim = require('../models/Takvim')

router.get('/', (req, res) => {
    Takvim.findOne({name: req.session.userId} , 'etkinlikler').lean().then(result=>{
        var name = "etkinlikler";
        etkinlikler = result[name]; 
          res.render('site/takvim', {
            layout: false,
            style: 'style-takvim.css',
            etkinlikler: etkinlikler,
            encodedJson : encodeURIComponent(JSON.stringify(etkinlikler))
        })
    })
})

router.post('/ekle', (req, res) => {
    Takvim.findOneAndUpdate(
        { name: req.session.userId }, 
        { 
            $push: { 
                "etkinlikler": req.body  
             }
         },
        
        (error, success) =>{
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
                 res.redirect('/takvim')
             }        
        }
 
     )

})

router.post('/sil', (req, res) => {

    Takvim.updateOne( 
        { name: req.session.userId },
        { $pull: { etkinlikler : { tarih : req.body.tarih, baslik: req.body.baslik } } },
        { safe: true },
        function removeConnectionsCB(err, obj) {
            console.log(obj)
            res.redirect('/takvim')
        });



})



module.exports = router;
