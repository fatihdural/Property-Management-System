
function searchBelge(){
    var searchEmlak =  document.getElementsByClassName("belge-tablosu-satir")
    for(var i = 0; i < searchEmlak.length; i++){
        searchEmlak[i].style.display = "inline-block";
    } 


    var searchText = document.getElementById("belge-input").value.toLowerCase()

    if( searchText != "" ){
        var searchEmlak =  $(".belge-tablosu-satir span#belge-name")
        for(var i = 0; i < searchEmlak.length; i++){
            iteratedSearch = searchEmlak[i].textContent.toLowerCase()

            if( iteratedSearch.search(searchText) < 0 ){
                document.getElementsByClassName("belge-tablosu-satir")[i].style.display = "none";
            }
        } 
    }

} 
function focusSearchBelge(){
    var arama = document.getElementById("belge-input-label");
    arama.style.display = "none";   
}
function notFocusSearchBelge(){   
    if( document.getElementById("belge-input").value == '' ){
        var arama = document.getElementById("belge-input-label");
        arama.style.display = "block";   
    }
}