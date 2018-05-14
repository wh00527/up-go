'use strict';

$(document).ready(function () {
    $('.visible-part .box').click(function(){
        $(this).parent().addClass('start');
        $(this).parent().parent().find('.hidden-part').addClass('start');
    });

    $('.hidden-part .box').click(function(){
        $(this).parent().removeClass('start');
        $(this).parent().parent().find('.visible-part').removeClass('start');
    });

    $('.upgrade').click(function(e){
        e.preventDefault();
        var self = $(this);
        var array = {upgrade: self.data('target')};
        $.ajax({
            type: "GET",
            url: "/account/ajax-upgrade",
            data: array,
            cache: false,
            success: function(data){
                //
            },
            complete: function(){
                //window.location.reload();
                self.parent().parent().parent().find('.visible-part').hide();
                self.parent().parent().parent().find('.hidden-part').hide();
                self.parent().parent().parent().find('.alert-success').show();
            }
        });

    });

    /* Dropzone */

    $("#uploader").dropzone({
        url:'/account/profile-upload',
        createImageThumbnails:false,
        previewTemplate:'<div class="preview-text"><div class="alert alert-success" role="alert"><i class="fa fa-check-circle" aria-hidden="true"></i><p>Your task is successfully completed.</p><a href="javascript:;" class="btn btn-success alert-box-click-away"> OK</a></div></div>',
        complete: function() {
            //  setTimeout(function() {
            //     $('#image-uploader-shop-product-image').removeClass('dz-started');
            // }, 2000);
            $('#uploader .alert-box-click-away').click(function(){
                $("#uploader").removeClass('dz-started');
                $('#uploader .preview-text').remove();
            });

            // toastr.success('Your request has been successfully submitted, we will process your request within 24 hours');
            // toastr.error('Oops, something is not quite all right, please try again in a few minites');
        }
    });

});



