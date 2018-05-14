/*
/
/    ##############################
/    UI KIT js
/    ##############################
/
*/

$(document).ready(function(){
    //Nav
    $(".nav a").on("click", function(){
       $(".nav").find(".active").removeClass("active");
       $(this).parent().addClass("active");
    });

   
   /* iCheck */
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-pink',
        radioClass: 'iradio_square-pink'
    });

   /* toastr */
    $('.toaster-trigger').click(function() {
       // show when the button is clicked
       toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "9999",
        "hideDuration": "9999",
        "timeOut": "9999",
        "extendedTimeOut": "9999",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
       toastr.success('Your request has been successfully submitted, we will process your request within 24 hours');
       toastr.error('Oops, something is not quite all right, please try again in a few minites');
    });

    /* alert-boxes */
    $('.alert-box-click-away').click(function(){
      $(this).parent('.alert').hide("slow");
    })

    /* tooltips */
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    }).off('focusin');

    /* datepicker format*/
    $(function () {
        $('#datetimepicker1').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    });


  /*Tinymce editor*/ 

     tinymce.init({
        selector: '#mytextarea',
        menubar:false,
        statusbar: false,
        removed_menuitems: 'formats',
        resize: 'true',
        toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
      });

   /* image uploader */
    Dropzone.autoDiscover = false;
      
    $("#image-uploader").dropzone({ 
      url:'/file-upload',
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
        
        // toastr.success('Your request has been successfully submitted, we will process your request within 24 hours');
       // toastr.error('Oops, something is not quite all right, please try again in a few minites');
      } 
    });
    
    $('#trigger-upload-image-step-2').click(function(){
      $('#upload-image-step-1').hide();
      $('#upload-image-step-2').addClass('show');
    })

    /* image resizer*/

    var $image = $('#image');
    var cropBoxData;
    var canvasData;
    
    $('#image-uploader-modal').on('shown.bs.modal', function () {
      $image.cropper({
        autoCropArea: 0.8,
        aspectRatio: 16 / 9,
        built: function () {
            $('#reset-cropper').click(function(){
              $image.cropper('reset');
            });
            $('#getData').click(function(){
                cropBoxData = $image.cropper('getData');
                console.log(cropBoxData);
            });
        }
         
      });
    })
    .on('hidden.bs.modal', function () {
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');
      // console.log(cropBoxData + canvasData);
      $image.cropper('destroy');
    });
    

    /* datatable */

      $('#crmDataTable').DataTable({
          pagingType: "full_numbers",
          rowReorder: {
            selector:'tr'
          },
          // rowReorder: true,
           columnDefs: [
              { 
                orderable: true, 
                className: 'reorder', 
                targets: '_all' 
              }
          ]
      });

      var table = $('#crmDataTable').DataTable();
      $editing_buttons="<div class=\"shop-product-listing\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-xs-8 col-md-10\">\r\n                      <div id=\"delete-and-choose-page\">\r\n                        <div class=\"col-xs-5 col-md-2\">\r\n                          <i class=\"fa fa-trash-o\"aria-hidden=\"true\"><\/i>\r\n                          <a class=\"text-grey display-i-block\" href=\"javascript:;\">Delete<\/a>\r\n                        <\/div>\r\n                        <div class=\"col-xs-7 col-md-10\">\r\n                          <i class=\"fa fa-share-square-o\" aria-hidden=\"true\"><\/i>\r\n                          <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Move to page<\/p>\r\n                          <div class=\"dropdown pull-left show-page-number\">\r\n                              <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\r\n                                      aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                                  <small><i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i><\/small>\r\n                              <\/button>\r\n                              <div class=\"dropdown-menu\">\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a>\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a>\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a>\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a>\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a>\r\n                                  <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a>\r\n                              <\/div>\r\n                          <\/div>\r\n                        <\/div>\r\n                      <\/div>\r\n                    <\/div>\r\n                    \r\n                    <div class=\"col-xs-4 col-md-2 col-lg-2\">\r\n                        <div class=\"dropdown\">\r\n                          <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\r\n                                  aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                              <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i>\r\n                          <\/button>\r\n                          <div class=\"dropdown-menu\">\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a>\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a>\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a>\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a>\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a>\r\n                              <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a>\r\n                          <\/div>\r\n                        <\/div>\r\n                    <\/div>\r\n                  <\/div>              \r\n              <\/div>";
      $("#crmDataTable_wrapper > div:eq(0)").after($editing_buttons);
});