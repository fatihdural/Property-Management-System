function filesChange(){
    var changedFiles = document.getElementById("files-input").files;
    for(var i= 0; i < changedFiles.length; i++){
        console.log(changedFiles[i].name);
        
        /*var node = document.getElementById("files-text");

        var textNode = document.createElement("h3");
        textNode.innerHTML = changedFiles[i].name + " seçildi.";
        textNode.setAttribute("class", "new-text-design");

        node.parentNode.appendChild(textNode);
        */
    }
}

    /*
    $(document).ready(function(){
    $('form input').change(function () {
        $('form p').text(this.files.length + " file(s) selected");
    });
    });*/