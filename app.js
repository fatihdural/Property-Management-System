const path = require('path')
const express = require('express')
var exphbs  = require('express-handlebars');
const app = express()
const port = 3000
const hostname = '127.0.0.1';
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')

//handlebar helpers
const islemIsaret = require('./helpers/islemIsaret').islemIsaret
const formatNumber = require('./helpers/formatNumber').formatNumber
const generateDate = require('./helpers/generateDate').generateDate

const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/emlak_yonetim_platformu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const MongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(fileUpload())

app.use(express.static('public'))

app.engine('handlebars', exphbs({helpers:{islemIsaret:islemIsaret, formatNumber: formatNumber, generateDate: generateDate}}));
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use((req, res, next)=>{
  const {userId} = req.session
  if(userId){
    res.locals.fullname = req.session.fullname;
    return next();
  }
  else{
    res.locals = {
      displayLink: false
    }

    if( req.url == '/' || req.url == '/login' || req.url == '/login/kayit-ol' || req.url == '/login/sifremi-unuttum'){
      return next();        
    }
    return res.redirect('/');  
  }
  next();
})

const main = require('./routes/main')
const login = require('./routes/login')
const gostergepaneli = require('./routes/gosterge-paneli')
const emlaklar = require('./routes/emlaklar')
const kisiler = require('./routes/kisiler')
const bakim = require('./routes/bakim')
const takvim = require('./routes/takvim')
const dokumanlar = require('./routes/dokumanlar')
const muhasebe = require('./routes/muhasebe')
const yardim = require('./routes/yardim')
const cikis = require('./routes/cikis');
const profil = require('./routes/profil');

const { type } = require('os');

app.use('/', main)
app.use('/login', login)
app.use('/gosterge-paneli', gostergepaneli)
app.use('/emlaklar', emlaklar)
app.use('/kisiler', kisiler)
app.use('/bakim', bakim)
app.use('/takvim', takvim)
app.use('/dokumanlar', dokumanlar)
app.use('/muhasebe', muhasebe)
app.use('/yardim', yardim)
app.use('/cikis', cikis)
app.use('/profil', profil)

app.listen(port, hostname, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  