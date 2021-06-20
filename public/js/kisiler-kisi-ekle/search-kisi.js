function focusSearchKisi(className){
    var arama = document.querySelectorAll(".belge-input-label")[className];
    arama.style.display = "none";
}

function notfocusSearchKisi(className){
    if( document.querySelectorAll(".belge-input")[className].value == '' ){
        var arama = document.querySelectorAll(".belge-input-label")[className];
        arama.style.display = "block";
    }
}

