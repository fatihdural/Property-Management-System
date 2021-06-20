function searchEmlak(){
    var searchEmlak =  document.getElementsByClassName("emlak-ornek")
    for(var i = 0; i < searchEmlak.length; i++){
        searchEmlak[i].style.display = "inline-block";
    } 


    var searchText = document.getElementById("emlak-search-input").value.toLowerCase()

    if( searchText != "" ){
        var searchEmlak =  $(".emlak-ornek span#emlak-baslik")
        for(var i = 0; i < searchEmlak.length; i++){
            iteratedSearch = searchEmlak[i].textContent.toLowerCase()

            if( iteratedSearch.search(searchText) < 0 ){
                document.getElementsByClassName("emlak-ornek")[i].style.display = "none";
            }
        } 
    }

} 
function focusSearchEmlak(){
    var arama = document.getElementById("emlak-search-input-label-info");
    arama.style.display = "none";   
}
function notFocusSearchEmlak(){   
    if( document.getElementById("emlak-search-input").value == '' ){
        var arama = document.getElementById("emlak-search-input-label-info");
        arama.style.display = "block";   
    }
}