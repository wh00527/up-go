'use strict';

$(document).ready(function () {

    Dropzone.autoDiscover = false;

    $(".uploader-image-adv").dropzone({
        url:'/advertising/ajax-images',
        createImageThumbnails:false,
        previewTemplate:'<div class="preview-text"><div class="alert alert-success" role="alert"><i class="fa fa-check-circle" aria-hidden="true"></i><p>Your task is successfully completed.</p><a href="javascript:;" class="btn btn-success alert-box-click-away"> OK</a></div></div>',
        complete: function() {
            //  setTimeout(function() {
            //     $('#image-uploader-shop-product-image').removeClass('dz-started');
            // }, 2000);
            $('#image-uploader .alert-box-click-away').click(function(){
                $("#image-uploader").removeClass('dz-started');
                $('#image-uploader .preview-text').remove();
            });

            window.location.reload();
            // toastr.error('Oops, something is not quite all right, please try again in a few minites');
        }
    });

    $('.fa-trash-o').click(function(){
        var x = window.confirm("Are you sure you will delete this image?")
        if (x){
            var array = {target: $(this).parent().data('del'),type: $(this).parent().data('type')};
            $.ajax({
                type: "GET",
                url: "/advertising/ajax-delete",
                data: array,
                cache: false,
                success: function(data){
                    //
                },
                complete: function(){
                    window.location.reload();
                }
            });
        }
    });

    $('#gridSystemModal').on('show.bs.modal', function(e){
        var videoId = $(e.relatedTarget).data('id');
        $('#videoId').val(videoId);
        $('#embedCode').text('');

        if(videoId != ''){
            var array = {target: videoId};
            $.ajax({
                type: "GET",
                url: "/advertising/ajax-videos",
                data: array,
                cache: false,
                success: function(data){
                    $('#embedCode').text(data.embedCode);
                },
                complete: function(){
                    //window.location.reload();
                }
            });
        }


    });

});



