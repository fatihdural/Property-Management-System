

function karZararGrafik(jsonObjGelir, jsonObjGider){

  console.log("jsonObjGelir")
  console.log(jsonObjGelir)

  console.log("jsonObjGider")
  console.log(jsonObjGider)


  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart1);
  function drawChart1() {
    var data = google.visualization.arrayToDataTable([
      ['Ay', 'Gelir', { role: 'style' }, 'Gider', { role: 'style' }],
      ['Ocak',  jsonObjGelir["01"],'#72CA89',      jsonObjGider["01"], '#db3012a9'],
      ['Şubat',  jsonObjGelir["02"],'#72CA89',      jsonObjGider["02"], '#db3012a9'],
      ['Mart',  jsonObjGelir["03"],'#72CA89',      jsonObjGider["03"], '#db3012a9'],
      ['Nisan',  jsonObjGelir["04"],'#72CA89',      jsonObjGider["04"], '#db3012a9'],
      ['Mayıs',  jsonObjGelir["05"],'#72CA89',      jsonObjGider["05"], '#db3012a9'],
      ['Haziran',  jsonObjGelir["06"],'#72CA89',      jsonObjGider["06"], '#db3012a9'],
      ['Temmuz',  jsonObjGelir["07"],'#72CA89',      jsonObjGider["07"], '#db3012a9'],
      ['Ağustos',  jsonObjGelir["08"],'#72CA89',      jsonObjGider["08"], '#db3012a9'],
      ['Eylül',  jsonObjGelir["08"],'#72CA89',      jsonObjGider["09"], '#db3012a9'],
      ['Ekim',  jsonObjGelir["10"],'#72CA89',      jsonObjGider["10"], '#db3012a9'],
      ['Kasım',  jsonObjGelir["11"],'#72CA89',       jsonObjGider["11"], '#db3012a9'],
      ['Aralık',  jsonObjGelir["12"],'#72CA89',      jsonObjGider["12"], '#db3012a9']
    ]);
  
    var options = {
      title: 'Gelir-Gider Grafiği',
      titleTextStyle: {
        color: '#43425D',    // any HTML string color ('red', '#cc00cc')
   /*     fontName: <string>, // i.e. 'Times New Roman'
        fontSize: <number>, // 12, 18 whatever you want (don't specify px)
        bold: <boolean>,    // true or false
        italic: <boolean>   // true of false */
          bold: true,
          fontSize: 18
    },
    //  hAxis: {title: 'Aylar', titleTextStyle: {color: '#36354d'}},
      isStacked: 'false',
      colors: ['#72CA89','#db3012']
  
    };
  
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    
    chart.draw(data, options);
  }
  
  
  $(window).resize(function(){
    drawChart1();
   //drawChart2();
  });
  
  // Reminder: you need to put https://www.google.com/jsapi in the head of your document or as an external resource on codepen //
}

