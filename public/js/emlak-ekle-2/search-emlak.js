function focusSearchEmlak(className){
    var arama = document.querySelectorAll(".emlak-input-label")[className];
    arama.style.display = "none";
}

function notfocusSearchEmlak(className){
    if( document.querySelectorAll(".emlak-input")[className].value == '' ){
        var arama = document.querySelectorAll(".emlak-input-label")[className];
        arama.style.display = "block";
    }
}