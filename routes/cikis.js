const path = require('path')
const express = require('express')
const { read } = require('fs')
const router = express.Router()


router.get('/', (req, res) => {
    console.log('CİKİS')
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports = router;
