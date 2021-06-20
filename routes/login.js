const path = require('path')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Muhasebe = require('../models/Muhasebe')
const Takvim = require('../models/Takvim')
const Panel = require('../models/Panel')
var crypto = require('crypto');

router.get('/', (req, res) => {
    res.render('login/giris-ekrani.handlebars', {
        layout: false,
        style: 'style-giris-ekrani.css'
    })
})

router.post('/', (req, res) => {
    // kullanıcı adı şifre girdi ve butona bastı

    const {username, password} = req.body
    
    User.findOne({username}, (error, user)=>{
        if (user){
            var hashPassword = crypto.createHash('md5').update(password).digest('hex');
            if(user.password == hashPassword){
                // USER SESSION
                req.session.userId = user._id;
                req.session.fullname = user.name + " " + user.surname
                res.redirect('/gosterge-paneli')
            }
            else{
                res.redirect('/login')
            }
        }
        else{
            res.redirect('/login/kayit-ol')
        }
    })
})

router.get('/kayit-ol', (req, res) => {
    res.render('login/kayit-ol.handlebars', {
        layout: false,
        style: 'style-kayit-ol-ekrani.css'
    })
})

router.post('/kayit-ol', (req, res) => {
    // biri kayit ol bilgilerini girer sonra kayit ola basarsa.

    console.log(req.body)

    var input = req.body;
    
    var hashPassword = crypto.createHash('md5').update(input.password).digest('hex');
    input.password = hashPassword;
    User.create(input, (error, user)=>{
        
        Muhasebe.create({
            name: user._id,
            tum_gelir: 0,
            tum_gider: 0,
            tum_beklenen: 0
        }, (error, success) =>{
            console.log("BAŞARI muhasebe")
            console.log(success)
        })

        Takvim.create({
            name: user._id
        }, (error, success) =>{
            console.log("BAŞARI takvim")
            console.log(success)
        })

        Panel.create({
            name: user._id,
            emlak_durum: {bos: 0, dolu : 0, diger: 0},
            tum_gelir: 0,
            tum_gider: 0,
            tum_beklenen: 0,
            gelir: {
                "01": 0, 
                "02": 0, 
                "03": 0,
                "04": 0, 
                "05": 0, 
                "06": 0,    
                "07": 0, 
                "08": 0, 
                "09": 0,
                "10": 0, 
                "11": 0, 
                "12": 0, 
            },
            gider: {
                "01": 0, 
                "02": 0, 
                "03": 0,
                "04": 0, 
                "05": 0, 
                "06": 0,    
                "07": 0, 
                "08": 0, 
                "09": 0,
                "10": 0, 
                "11": 0, 
                "12": 0, 
            },
            kira_gelirleri:{
                "gelenler": 0,
                "beklenenler": 0
            }

        }, (error, success) =>{
            console.log("BAŞARI panel")
            console.log(error)
            console.log(success)
        })

    })

    res.redirect('/')
})



router.get('/sifremi-unuttum', (req, res) => {
    res.render('login/sifremi-unuttum.handlebars', {
        layout: false,
        style: 'style-sifremi-unuttum.css'
    })
})

router.post('/sifremi-unuttum', (req, res) => {
    // biri sifremi unuttumda mail girip butona basarsa
    res.redirect('/login')
})

module.exports = router;
