function searchIslem(){
    var searchEmlak =  document.getElementsByClassName("islem-tablosu-satir")
    for(var i = 0; i < searchEmlak.length; i++){
        searchEmlak[i].style.display = "inline-block";
    } 


    var searchText = document.getElementById("islem-input").value.toLowerCase()

    if( searchText != "" ){
        var searchEmlak =  $(".islem-tablosu-satir span#islem-name")
        for(var i = 0; i < searchEmlak.length; i++){
            iteratedSearch = searchEmlak[i].textContent.toLowerCase()

            if( iteratedSearch.search(searchText) < 0 ){
                document.getElementsByClassName("islem-tablosu-satir")[i].style.display = "none";
            }
        } 
    }

} 
function focusSearchIslem(){
    var arama = document.getElementById("islem-input-label");
    arama.style.display = "none";   
}
function notFocusSearchIslem(){   
    if( document.getElementById("islem-input").value == '' ){
        var arama = document.getElementById("islem-input-label");
        arama.style.display = "block";   
    }
}