function focusSearchServis(className){
    var arama = document.querySelectorAll(".servis-input-label")[className];
    arama.style.display = "none";
}

function notfocusSearchServis(className){
    if( document.querySelectorAll(".servis-input")[className].value == '' ){
        var arama = document.querySelectorAll(".servis-input-label")[className];
        arama.style.display = "block";
    }
}