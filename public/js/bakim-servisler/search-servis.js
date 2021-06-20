function searchServis(){
    var searchEmlak =  document.getElementsByClassName("emlak-ornek")
    for(var i = 0; i < searchEmlak.length; i++){
        searchEmlak[i].style.display = "inline-block";
    } 


    var searchText = document.getElementById("servis-search-input").value.toLowerCase()

    if( searchText != "" ){
        var searchEmlak =  $(".emlak-ornek span#servis-name")
        for(var i = 0; i < searchEmlak.length; i++){
            iteratedSearch = searchEmlak[i].textContent.toLowerCase()

            if( iteratedSearch.search(searchText) < 0 ){
                document.getElementsByClassName("emlak-ornek")[i].style.display = "none";
            }
        } 
    }

} 
function focusSearchServis(){
    var arama = document.getElementById("servis-search-input-label-info");
    arama.style.display = "none";   
}
function notFocusSearchServis(){   
    if( document.getElementById("servis-search-input").value == '' ){
        var arama = document.getElementById("servis-search-input-label-info");
        arama.style.display = "block";   
    }
}