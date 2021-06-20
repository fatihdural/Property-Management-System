const path = require('path')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('site/ayarlar', {
        style: 'style-ayarlar.css'
    })
})

module.exports = router;
