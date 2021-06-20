const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('login/giris-ekrani', {
        layout: false,
        style: 'style-giris-ekrani.css'
    })
})

module.exports = router;
