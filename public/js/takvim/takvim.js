 // initialize your calendar, once the page's DOM is ready
 $(document).ready(function() {

    $('#calendar').evoCalendar({
        language: 'tr',
        theme: 'Midnight Blue'
    })

    // veritabanından günleri al
    var decodedJson = decodeURIComponent("{{{encodedJson}}}");
    var jsonObj = JSON.parse(decodedJson);
    for(var i = 0; i < jsonObj.length; i++){
        var herEtkinlik = jsonObj[i]
        var tarih = herEtkinlik.tarih
        var baslik = herEtkinlik.baslik
        var id = herEtkinlik._id

        const [yil, ay, gun] = tarih.split("-")


        $("#calendar").evoCalendar('addCalendarEvent', [
            {
            id: id,
            name: baslik,
            date: ay+"/"+gun+"/"+yil,
            type: "event",
            color: "#63d867"
            }
        ]);

    }





})

