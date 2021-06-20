const path = require('path')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('site/yardim', {
        style: 'style-yardim-destek.css'
    })
})

module.exports = router;
