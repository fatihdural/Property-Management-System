function focusSearch(){
    var arama = document.getElementById("search-input-label");
    arama.style.display = "none";    
}

function notFocusSearch(){
    
    if( document.getElementById("search-input").textContent == '' ){
        var arama = document.getElementById("search-input-label");
        arama.style.display = "block";   
    }
}


