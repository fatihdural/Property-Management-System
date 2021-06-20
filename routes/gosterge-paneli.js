const path = require('path')
const express = require('express')
const Panel = require('../models/Panel')
const Emlak = require('../models/Emlak')
const router = express.Router()


router.get('/', (req, res) => {

    Emlak.find({admin: req.session.userId}).lean().then(emlaklar=>{



        let ilk = 0, ikinci = 0, ucuncu = 0, dorduncu = 0;
    
        console.log("size" + emlaklar.length)
        for(var i=0; i < emlaklar.length; i++){
             console.log("dongu")
            var emlak = emlaklar[i]

            if( emlak["cikis_tarihi"] != undefined && emlak["cikis_tarihi"] != null && emlak["cikis_tarihi"] != ''){
                var cikis_tarihi = emlak["cikis_tarihi"];
                console.log(cikis_tarihi)
        
                const [yil, ay, gun] = cikis_tarihi.split("-").map(Number);
        
                var today = new Date().toISOString().slice(0, 10)
        
                const [yilBugün, ayBugün, gunBugün] = today.split("-").map(Number);
                console.log(today) 
    
            
                if( (yil - yilBugün) < 0 ){
                    ilk = ilk +  1;
                }
                else if( (yil - yilBugün) > 0 ){
                    dorduncu = dorduncu + 1;
                }
                else{
                    console.log("else")
                    if( (((ay * 30) + gun) - ((ayBugün * 30)+gunBugün)) < 30 ){
                        ilk = ilk + 1;
                    } 
                    else if ((((ay * 30) + gun) - ((ayBugün * 30)+gunBugün)) < 60){
                        ikinci = ikinci + 1;
                    }
                    else if ((((ay * 30) + gun) - ((ayBugün * 30)+gunBugün)) < 90){
                        ucuncu = ucuncu + 1;
                    }
                    else{
                        dorduncu = dorduncu + 1;
                    }
                }
            }
        }


        var emlak_durum;
        Panel.findOne({name: req.session.userId}).lean().then(result=>{
            var name = "emlak_durum";
            emlak_durum = result[name]; 
    
            var bos = emlak_durum.bos
            var dolu = emlak_durum.dolu
            var diger = emlak_durum.diger
            var toplam = bos+dolu+diger
    
            emlak_durum = {
                "bos": bos,
                "dolu": dolu,
                "toplam": toplam
            }
    
            var tum_gelir = result["tum_gelir"];
            var tum_masraf = result["tum_gider"];
            var net_kazanc = tum_gelir-tum_masraf;
            var gelir = result["gelir"];
            var gider = result["gider"];
            var kira_gelirleri = result["kira_gelirleri"]
    
            // eğer veri yoksa grafiği çizdirme
            if( ilk == 0 && ikinci == 0 && ucuncu == 0 && dorduncu == 0 ){
                res.locals.gosterGrafik = false
            }
            else{
                res.locals.gosterGrafik = true
            }


            res.render('site/gosterge-paneli', {
                style: 'style-gosterge-paneli.css',
                emlak_durum: emlak_durum,
                tum_gelir: tum_gelir,
                tum_masraf: tum_masraf,
                net_kazanc: net_kazanc,
                encodedJsonGelir : encodeURIComponent(JSON.stringify(gelir)),
                encodedJsonGider : encodeURIComponent(JSON.stringify(gider)),
                kira_gelirleri: kira_gelirleri,
                ilk: ilk,
                ikinci: ikinci,
                ucuncu: ucuncu,
                dorduncu: dorduncu
    
            })
        })  
 

    })





})

module.exports = router;
