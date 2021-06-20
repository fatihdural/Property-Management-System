const path = require('path')
const express = require('express')
const router = express.Router()
const User = require('../models/User')


router.get('/', (req, res) => {

    
    User.findById(req.session.userId , 'innerusers').lean().then(innerusers=>{
        var name = "innerusers";
        var resultusers = innerusers[name];
        console.log(resultusers )
        res.render('site/kisiler', {
            innerusers: resultusers,
            style: 'style-kisiler.css',
            adet: resultusers.length
        })    
    })
    
})

router.get('/sil/:id', (req, res) => {
    const kisi_id = req.params.id

    console.log(kisi_id + " kisi silme TALEBİ !!!!!!!!!"  )
    
    console.log(req.session.userId + " kisi silme TALEBİ !!!!!!!!!"  )



    User.updateOne( 
        { _id: req.session.userId },
        { $pull: { innerusers : { _id : kisi_id } } },
        { safe: true },
        function removeConnectionsCB(err, obj) {
            console.log(obj)
        });


    res.redirect('/kisiler')

})

router.get('/kisi-ekle', (req, res) => {
    res.render('site/kisiler-kisi-ekle', {
        style: 'style-kisiler-kisi-ekle.css'
    })

})

router.post('/kisi-ekle', (req, res) => {

    let user_image = {
        name: "kisi_ornek.png"
    }

    if( req.files ){
        if(  req.files.user_image ){
            user_image = req.files.user_image
            user_image.mv( path.resolve(__dirname, '../public/images/userImages', user_image.name) )
        }

    }



    console.log(req.body.name)

    const {name, tel, email} = req.body;

    console.log('KİSİ EKLENİYO')
    console.log(name)
    console.log(tel)
    console.log(email)

    console.log(req.session.userId)


    var inneruser = { name: name,tel: tel,email: email, user_image: `/images/userImages/${user_image.name}` };
    User.findOneAndUpdate(
       { _id: req.session.userId }, 
       { $push: { innerusers: inneruser  } },
       
       (error, success) =>{
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }        
       }

    )

    
    res.redirect('/kisiler')
})


module.exports = router;
