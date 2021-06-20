
    /* UPLOAD IMAGES START */
    function uploadImages(id){
        //Check File API support
        if(window.File && window.FileList && window.FileReader)
         {
             var filesInput = document.getElementsByClassName("files")[id];
             console.log(filesInput);
             
             filesInput.addEventListener("change", function(event){

              /*   console.log(filesInput.parentElement);
                 var widthNew = filesInput.parentElement.clientHeight + 150;
                 widthNew = widthNew + "px";
                 filesInput.parentElement.style.height = widthNew;
             */
                 
                 var files = event.target.files; //FileList object
                 var output = document.getElementsByClassName("result")[id];
                 
                 for(var i = 0; i< files.length; i++)
                 {
                     var file = files[i];
                     
                     //Only pics
                     if(!file.type.match('image'))
                     continue;
                     
                     var picReader = new FileReader();
                     
                     picReader.addEventListener("load",function(event){
                         
                         var picFile = event.target;
                         
                         var div = document.createElement("div");
                         
                         div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                                 "title='" + picFile.name + "'/>";
                         
                         output.insertBefore(div,null);            
                     
                     });
                     
                     //Read the image
                     picReader.readAsDataURL(file);
                 }                               
             
             });
         }
         else
         {
             console.log("Your browser does not support File API");
         }
 
 }
 uploadImages(0);
 uploadImages(1);

 /* UPLOAD IMAGES END */