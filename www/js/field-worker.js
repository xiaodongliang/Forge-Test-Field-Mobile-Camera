 

var jic = {
    compress: function(source_img_obj, quality, output_format){

        var mime_type = "image/jpeg";
        if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
        }
        var cvs = document.createElement('canvas');
         cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }
}
 

$(document).ready (function () { 

    $('#btnSubmit').click(function (evt) { 
         
        //get source image 
        var blob = document.getElementById('outImage').src ;

        var img = new Image();
        img.src = blob;
        //compress the stream
        var imgdata = jic.compress(img,1).src;
        var toUpload = {blob:imgdata}; 
        //upload the blog to server
        $.ajax ({
            url: 'http://' + window.location.host + '/ForgeRoute/setImage',
            type: 'post',
            data: toUpload,
            dataType:'json'
        }).done (function (data) { 
            console.log('upload image blob done!');  
        }).fail (function (xhr, ajaxOptions, thrownError) {
             console.log('upload image blob failed!');  
        }) ;
     });

    document.getElementById('mobilephoto').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                //display the image in the image box
                document.getElementById('outImage').src = fr.result;
                
            }
            fr.readAsDataURL(files[0]);
        }
        else {
            // Not supported
            console.log('not supported!');
        }
    } 

}) ;


