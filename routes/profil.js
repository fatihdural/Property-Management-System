const path = require('path')
const express = require('express')
const router = express.Router()
const Emlak = require('../models/Emlak')
const User = require('../models/User')
const Servis = require('../models/Servis')
const Muhasebe = require('../models/Muhasebe')
const Panel = require('../models/Panel')
var crypto = require('crypto');

router.get('/', (req, res) => {



    User.findById(req.session.userId).lean().then(user=>{

        res.render('site/profil', {
            style: 'style-profil.css',
            user: user
        })
    })
})


router.get('/sifre-degistir', (req, res) => {



    User.findById(req.session.userId).lean().then(user=>{

        res.render('site/sifre-degistir', {
            style: 'style-sifre-degistir.css',
            user: user
        })
    })
})


router.post('/', (req, res) => {
    var input = req.body;
    const {name, surname, username, email, password} = req.body;


    req.session.fullname = input.name + " " + input.surname


    var mevcutSifre = crypto.createHash('md5').update(password).digest('hex');


    User.findById(req.session.userId).lean().then(user=>{

        if( user.password == mevcutSifre ){
            console.log("doğru şifre");

            User.findOneAndUpdate(
                { _id: req.session.userId}, 
                {
                   name: name,
                   surname: surname,
                   username: username,
                   email: email           
                }
             ).lean().then(result=>{
                res.redirect('/profil');
            })

        }
        else{
            console.log("yanlış şifre")
            res.redirect('/profil');
        }
    })
})


router.post('/sifre-degistir', (req, res) => {

    const {password, passwordnew} = req.body;

    var mevcutSifre = crypto.createHash('md5').update(password).digest('hex');
    var yeniSifre = crypto.createHash('md5').update(passwordnew).digest('hex');

    User.findById(req.session.userId).lean().then(user=>{

        if( user.password == mevcutSifre ){
            console.log("doğru şifre");

            User.findOneAndUpdate(
                { _id: req.session.userId}, 
                {
                   password: yeniSifre        
                }
             ).lean().then(result=>{
                res.redirect('/cikis');
            })

        }
        else{
            console.log("yanlış şifre")
            res.redirect('/profil/sifre-degistir');
        }
    })
})



module.exports = router;
