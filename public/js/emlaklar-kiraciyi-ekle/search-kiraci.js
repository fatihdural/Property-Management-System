function focusSearchKiraci(className){
    var arama = document.querySelectorAll(".kiraci-input-label")[className];
    arama.style.display = "none";
}

function notfocusSearchKiraci(className){
    if( document.querySelectorAll(".kiraci-input")[className].value == '' ){
        var arama = document.querySelectorAll(".kiraci-input-label")[className];
        arama.style.display = "block";
    }
}