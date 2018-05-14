$(document).ready(function(){
  /* jQuery UI adjustment */
   if (!$.curCSS) {
       $.curCSS = $.css;
    }

  /*Tinymce editor*/
  
  tinymce.init({
    selector: '.text-edit',
    content_css : '../css/main.css',
    menubar:false,
    statusbar: false,
    removed_menuitems: 'formats',
    resize: 'true',
    toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
  });

  tinymce.init({
    selector: '#crmshopfulldescription',
    content_css : '../css/main.css',
    menubar:false,
    statusbar: false,
    removed_menuitems: 'formats',
    resize: 'true',
    toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
  });


   /*Data table*/
   
    $('#crmshopproductlanding').DataTable({
        pagingType: "full_numbers",
        rowReorder: {
          selector:'tr'
        },
        rowReorder: true,
        columnDefs: [
            {  className: 'reorder', 
               targets: 0 
            }
        ]
    });

    $editing_buttons = "<div class=\"shop-product-listing\"> <div class=\"row\"> <div class=\"col-xs-8 col-md-6\"> <div class=\"delete-and-choose-page\"> <div class=\"col-xs-5 col-md-4\"> <i class=\"fa fa-trash-o\"aria-hidden=\"true\"><\/i> <a href=\"javascript:;\">Delete<\/a> <\/div> <div class=\"col-xs-7 col-md-8\"> <i class=\"fa fa-share-square-o\" aria-hidden=\"true\"><\/i> <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Move to page<\/p> <div class=\"dropdown pull-left show-page-number\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <small><i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i><\/small> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">6<\/a> <\/div> <\/div> <\/div> <\/div> <\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div> <\/div> <\/div>"
    $("#crmshopproductlanding_wrapper > div:eq(0)").after($editing_buttons);

    $("#crmshopproductlanding input[type=checkbox]").on('ifChecked', function(event){
      $('#crmshopproductlanding_wrapper .delete-and-choose-page').addClass('row');
    });
    $("#crmshopproductlanding .selectall").on('ifChecked', function(event){

      $("#crmshopproductlanding .icheckbox_square-pink").addClass('hover checked');
    });
    $("#crmshopproductlanding .selectall").on('ifUnchecked',function(){
      $("#crmshopproductlanding .icheckbox_square-pink").removeClass('hover checked');
    });
    
    $("#crmshopproductlanding input[type=checkbox]").on('ifUnchecked', function(event){
      var length = $('#crmshopproductlanding .icheckbox_square-pink.checked').length;
      if ( length <= 1 ) {
        $('#crmshopproductlanding_wrapper .delete-and-choose-page').removeClass('row');
      }
    });


    //var relatedproductstable = $('#relatedproductstable').DataTable();
    //$editing_buttons_relatedproductstable  = "<div class=\"shop-product-listing\"><div class=\"row\"><div class=\"col-xs-8 col-md-6\"><\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div><\/div> <\/div>";

    //$("#relatedproductstable_wrapper > div:eq(0)").after($editing_buttons_relatedproductstable);






    
    $('#view-orders').DataTable({
      //pagingType: "full_numbers",
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'EXPORT TO EXCEL',
                exportOptions: {
                    modifier: {
                        search: 'none'
                    }
                }
            }
        ]
    });
    
    $editing_buttons_vieworderstable = "<div class=\"shop-product-listing\"> <div class=\"row\"> <div class=\"col-xs-8 col-md-6\"> <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Date Range<\/p> <div class=\"controls datepicker\"> <div class=\"input-prepend input-group width-50\"> <input type=\"text\" name=\"orderdatarange\" id=\"orderdatarange\" class=\"form-control\" value=\"Jul 14, 2015 \u2013 Jul 14, 2016\" \/> <i class=\"fa fa-calendar\"><\/i> <\/div> <\/div> <\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div> <\/div> <\/div>"
    $("#vieworderstable_wrapper > div:eq(0)").after($editing_buttons_vieworderstable);
    

    $('#crmshopMonthlyOrderSummary').DataTable({
      pagingType: "full_numbers",
    });
    $editing_buttons_MonthlyOrderSummary = "<div class=\"shop-product-listing\"> <div class=\"row\"> <div class=\"col-xs-8 col-md-6\"> <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Date Range<\/p> <div class=\"controls datepicker\"> <div class=\"input-prepend input-group width-50\"> <input type=\"text\" name=\"orderdatarange\" id=\"orderdatarange\" class=\"form-control\" value=\"Jul 14, 2015 \u2013 Jul 14, 2016\" \/> <i class=\"fa fa-calendar\"><\/i> <\/div> <\/div> <\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div> <\/div> <\/div>"
    $("#crmshopMonthlyOrderSummary_wrapper > div:eq(0)").after($editing_buttons_MonthlyOrderSummary);

    $('#crmshopSalesReport').DataTable({
      pagingType: "full_numbers",
    });
    $editing_buttons_SalesReport = "<div class=\"shop-product-listing\"> <div class=\"row\"> <div class=\"col-xs-8 col-md-6\"> <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Date Range<\/p> <div class=\"controls datepicker\"> <div class=\"input-prepend input-group width-50\"> <input type=\"text\" name=\"orderdatarange\" id=\"orderdatarange\" class=\"form-control\" value=\"Jul 14, 2015 \u2013 Jul 14, 2016\" \/> <i class=\"fa fa-calendar\"><\/i> <\/div> <\/div> <\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div> <\/div> <\/div>"
    $("#crmshopSalesReport_wrapper > div:eq(0)").after($editing_buttons_SalesReport);

    $('#crmshopProductReviews').DataTable({
      pagingType: "full_numbers",
    });
    

    $editing_buttons_ProductReviews = "<div class=\"shop-product-listing\"> <div class=\"row\"> <div class=\"col-xs-8 col-md-6\"> <div class=\"delete-and-choose-page\"> <div class=\"col-xs-5 col-md-4\"> <i class=\"fa fa-trash-o\"aria-hidden=\"true\"><\/i> <a href=\"javascript:;\">Delete<\/a> <\/div> <div class=\"col-xs-7 col-md-8\"> <i class=\"fa fa-share-square-o\" aria-hidden=\"true\"><\/i> <p class=\"pull-left m-r-1\" aria-hidden=\"true\">Move to page<\/p> <div class=\"dropdown pull-left show-page-number\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <small><i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i><\/small> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">6<\/a> <\/div> <\/div> <\/div> <\/div> <\/div> <div class=\"col-xs-4 col-md-6\"> <div class=\"dropdown pull-right filter\"> <button class=\"btn dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-chevron-down pull-right m-r-0\" aria-hidden=\"true\"><\/i> <\/button> <div class=\"dropdown-menu\"> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 1<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 2<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 3<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 4<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 5<\/a> <a href=\"#\" class=\"dropdown-item\" type=\"button\">item 6<\/a> <\/div> <\/div> <label class=\"pull-right m-r-1 p-t-2\" aria-hidden=\"true\">Show: <\/label> <\/div> <\/div> <\/div>";
    $("#crmshopProductReviews_wrapper > div:eq(0)").after($editing_buttons_ProductReviews);

    $("#crmshopProductReviews input[type=checkbox]").on('ifChecked', function(event){
      $('#crmshopProductReviews_wrapper .delete-and-choose-page').addClass('row');
    });
    $("#crmshopProductReviews #selectall").on('ifChecked', function(event){
      $("#crmshopProductReviews .icheckbox_square-pink").addClass('hover checked');
    });
    $("#crmshopProductReviews #selectall").on('ifUnchecked',function(){
      $("#crmshopProductReviews .icheckbox_square-pink").removeClass('hover checked');
    });
    
    $("#crmshopProductReviews input[type=checkbox]").on('ifUnchecked', function(event){
      var length = $('#crmshopProductReviews .icheckbox_square-pink.checked').length;
      if ( length <= 1 ) {
        $('#crmshopProductReviews_wrapper .delete-and-choose-page').removeClass('row');
      }
    });
    
    /* Dropzone + cropper */
    Dropzone.autoDiscover = false;
    
    $("#image-uploader-shop-product-image").dropzone({
      url:'/shop/upload-images',
      createImageThumbnails:false,
      previewTemplate:'<div class="preview-text"><div class="alert alert-success" role="alert"><i class="fa fa-check-circle" aria-hidden="true"></i><p>Your task is successfully completed.</p><a href="javascript:;" class="btn btn-success alert-box-click-away"> OK</a></div></div>',
      complete: function() {
       //  setTimeout(function() {
       //     $('#image-uploader-shop-product-image').removeClass('dz-started');
       // }, 2000);
       $('#image-uploader-shop-product-image .alert-box-click-away').click(function(){
        $("#image-uploader-shop-product-image").removeClass('dz-started');
         $('#image-uploader-shop-product-image .preview-text').remove();
      });
        
        // toastr.success('Your request has been successfully submitted, we will process your request within 24 hours');
       // toastr.error('Oops, something is not quite all right, please try again in a few minites');
      } 
    });
    
    $('#trigger-upload-image-step-2').click(function(){
      $('#upload-image-step-1').hide();
      $('#upload-image-step-2').addClass('show');
    })

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


      /* Tag-it */
      $("#myTags").tagit({
        allowSpaces: true
      });
      var newTags = $('.suggested-tags .tags');
      $.each(newTags, function(){
        var newTag  = $(this);
        var newTagContent = newTag.context.textContent;
        // console.log(newTag);
        newTag.click(function(){
          // console.log('bitch please');
          $("#myTags").tagit("createTag", newTagContent);
        })
      });

    /* daterange picker */
    var startdate;
    var enddate;

    startdate = new Date();
    var dd = startdate.getDate();
    var mm = moment(startdate).format("MMM"); //January is 0!
    var yyyy = startdate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    startdate = dd + ' ' + mm + ', ' + (yyyy - 1);
    enddate = dd + ' ' + mm + ', ' + yyyy;
    // instantiate datepicker and choose your format of the dates
    $('.datepicker input').daterangepicker({
            opens: 'right',
            locale: {
                format: 'DD MMM, YYYY'
            },
            "ranges": {
                "Last 12 Months": [
                    "14 Jun, 2015",
                    "14 Jun, 2016"
                ],
                "This Month": [
                    "1 Jun, 2016",
                    "30 Jun, 2016"
                ],
                "Last 30 Days": [
                    "14 May, 2016",
                    "14 Jun, 2016"
                ],
                "Last 7 Days": [
                    "06 Jun, 2016",
                    "14 Jun, 2016"
                ]
            },
            "startDate": startdate,
            "endDate": enddate
        },
        function (start, end, label) {
            // Parse it to a moment
            var s = moment(start.toISOString());
            var e = moment(end.toISOString());
            startdate = s.format("YYYY-MM-DD");
            enddate = e.format("YYYY-MM-DD");
        });
    
    //Filter the datatable on the datepicker apply event
    $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
        startdate = picker.startDate.format('YYYY-MM-DD');
        enddate = picker.endDate.format('YYYY-MM-DD');
        oTable.fnDraw();
    });

    // Order placement checkbox scripts
    $(".product-placement input[type=checkbox]").on('ifChecked', function(event){
     
      $(this).parents(".product-placement").find('button').addClass('bold-black')
     
    });
    
    $(".product-placement input[type=checkbox]").on('ifUnchecked', function(event){ 
      var length = $(this).parents(".product-placement").find('.icheckbox_square-pink.checked').length;
      if ( length < 2 ) {
        $(this).parents(".product-placement").find('button').removeClass('bold-black')
      }
    });

  $('#image-uploader-modal').on('show.bs.modal', function(e){
    $('#shop-edit-a-new-product').css('z-index','1000');
  });

  $('#image-uploader-modal').on('hide.bs.modal', function(e){
    $('#shop-edit-a-new-product').css('z-index','1051');
  });


  
  $('#reivew-details').on('show.bs.modal', function(e){
    $('#shop-edit-a-new-product').css('z-index','1000');
  });
  
  $('#reivew-details').on('hide.bs.modal', function(e){
    $('#shop-edit-a-new-product').css('z-index','1051');
  });

  $('#shop-edit-a-new-product').on('show.bs.modal', function(e){
      var productId = $(e.relatedTarget).data('product'),
      variantId = $(e.relatedTarget).data('variant');
      var array = {productId: productId,variantId : variantId};

      $.ajax({
          type: "GET",
          url: "/shop/ajax-detail",
          data: array,
          cache: false,
          success: function(data){
              for( var i = 0; i < Object.keys(data.detail).length; i++ ){
                  var currentKey = Object.keys(data.detail)[i];
                  var $this = $('#product-details').find('#'+currentKey);
                  if ($this.is(":text")) {
                      $('#product-details').find('#'+currentKey).val(data.detail[currentKey]);
                  } else if ($this.is(":checkbox")) {
                      if( data.detail[currentKey] == true ){
                          $('#product-details').find('#'+currentKey).parent().addClass('checked');
                          $('#product-details').find('#'+currentKey).val(data.detail[currentKey]);
                      }
                  } else if ($this.is("textarea")) {
                      $('#product-details').find('#'+currentKey).text(data.detail[currentKey]);
                  }


              }

              for( var i = 0; i < Object.keys(data.seo).length; i++ ){
                  var currentKey = Object.keys(data.seo)[i];

                  var $this = $('#search-options').find('#'+currentKey);
                  if ($this.is("input")) {
                      $('#search-options').find('#'+currentKey).val(data.seo[currentKey]);
                  } else if ($this.is(":checkbox")) {
                      // <select> element.
                  } else if ($this.is("textarea")) {
                      $('#search-options').find('#'+currentKey).text(data.seo[currentKey]);
                  }


              }


              $('#target-product-images').html('');
              for( var i = 0; i < data.images.length; i++ ){
                  //$('#target-product-images')
                  var imageHtml = '<div class="col-xs-12 col-md-4 col-lg-3">'+
                      '<div class="uploaded-images">'+
                      '<div class="image-edit-tool-bar">'+
                      '<div class="button-wrapper">'+
                      '<i class="fa fa-pencil-square-o"></i>'+
                      '<i class="fa fa-trash-o" aria-hidden="true"></i>'+
                      '</div>'+
                      '</div>'+
                      '<img class="img-fluid" src="'+ data.images[i].url +'">'+
                      '</div>'+
                      '</div>';

                  $('#target-product-images').append( imageHtml );
              }


              $('#relatedproductstable').DataTable({
                  pagingType: "full_numbers",
                  "info":     false,
                  "processing": true,
                  "serverSide": true,
                  "ajax": "/shop/ajax-products",
                  "rowCallback": function( row, data ) {
                      //if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                          $(row).addClass('selected');
                      //}
                  }
                  //"lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
              });

              $('#relatedproductstable tr').find('.icheckbox_square-pink').removeClass('checked');
              $('#relatedproductstable tr input').val('');

              for( var i = 0; i < data.related.length; i++ ){
                  $('#relatedproductstable tr').find('.'+data.related[i].relatedProductId).find('.icheckbox_square-pink').addClass('checked');
                  $('#relatedproductstable tr').find('.'+data.related[i].relatedProductId).find('input').val('1');
              }

              $('#relatedproductstable').DataTable({
                  pagingType: "full_numbers"
                  //"processing": true,
                  //"serverSide": true,
                  //"ajax": "/shop/ajax-products",
              });


              //product reviews

              $('#product-reviews-content').html('');

              for( var i = 0; i < data.review.length; i++ ){
                  //$('#target-product-images')
                  var reviewHtml = '<tr>'+
                      '<td>12 Feb 2016</td>'+
                      '<td>'+data.review[i].user+'</td>'+
                      '<td>'+
                      '<a class="product-name" href="javascript:;">'+
                      data.review[i].review+
                      '</a>'+
                      '</td>'+
                      '<td>'+
                      '<span class="ew-rating-stars ew-rating-score-50"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span>'+
                      '</td>'+
                      '<td><i class="fa fa-check" aria-hidden="true"></i></td>'+
                      '</tr>';

                  $('#product-reviews-content').html( reviewHtml );
              }

              if(data.review.length > 0){
                  $('#productreviewstable').DataTable({
                      pagingType: "full_numbers"
                  });
              }
              //table.rows().every( function (row) {
              //    d = this.data();

              //    d.counter++; // update data source for the row

              //    var k1 = $(this).find('div');


                  //if(row == 1){
                 //     console.log(row);
                 //$('#related-products #relatedproductstable tr:eq('+row+')').find('.icheckbox_square-pink').addClass('checked');
                  //}

              //    this.invalidate(); // invalidate the data DataTables has cached for this row
              //} );
              //console.log(d);

              //table.draw();


//              Object.keys(data.detail).forEach(function(k) {
//                  if(k === "typeA") {
//                      // do stuff
//                  }
//                  else if (k === "typeB") {
//                      // do more stuff
//                  }
//                  else {
//                      // do something
//                  }
//              });
          },
          complete: function(){
              //window.location.reload();
          }
      });
  });

    $('#crm-order-details').on('show.bs.modal', function(e){
        var orderId = $(e.relatedTarget).data('order');
        var array = {orderId: orderId};

        $.ajax({
            type: "GET",
            url: "/shop/ajax-order",
            data: array,
            cache: false,
            success: function(data){
                //clear all data

                $("div.order-status").find('button span').text('');
                $("div.shipping-status").find('button span').text('');

                //
                console.log(data);
                $('#order-number').text('Order Number '+data.orders.orderId);
                $('#crm-shop-order-number').val(data.orders.orderId);
                var orderStatus = $("div.order-status").find("[data-status='" + data.orders.orderStatusId + "']").text();
                $("div.order-status").find('button span').text(orderStatus);

                var orderStatus = $("div.shipping-status").find("[data-status='" + data.orders.shippingStatusId + "']").text();
                $("div.shipping-status").find('button span').text(orderStatus);


                for( var i = 0; i < Object.keys(data.orders).length; i++ ){
                    var currentKey = Object.keys(data.orders)[i];
                    console.log(currentKey);
                    var $this = $('#crm-order-details').find('#'+currentKey);
                    if ($this.is("input")) {
                        var targetValue =  data.orders[currentKey] !== null ? data.orders[currentKey] : '';
                        $('#crm-order-details').find('#'+currentKey).val(targetValue);

                    } else if ($this.is(":checkbox")) {
                        // <select> element.
                    } else if ($this.is("textarea")) {
                        $('#crm-order-details').find('#'+currentKey).text(data.orders[currentKey]);
                    }else{
                        $('#crm-order-details').find('#'+currentKey).text(data.orders[currentKey]);
                    }
                }


                for( var i = 0; i < data.notes.length; i++ ){
                    //var notesHtml = '';
                    var notesHtml = '<fieldset class="form-group scheduler-border">' +
                                    '<div class="row">'+
                                    '<div class="col-xs-12">'+
                                    '<blockquote class="blockquote">'+
                                    '<p class="m-b-0">'+data.notes[i].note+'</p>'+
                                    '<footer class="blockquote-footer text-xs-right"><cite title="Source Title">21 April 2016 11:10AM </cite></footer>'+
                                    '</blockquote>'+
                                    '</div>'+
                                    '<div class="col-xs-4 col-lg-2">'+
                                    '<button type="submit" class="btn btn-primary">update</button>'+
                                    '</div>'+
                                    '<div class="col-xs-4 col-lg-2">'+
                                    '<button type="submit" class="btn btn-default">delete</button>'+
                                    '</div>'+
                                    '</div>'+
                                    '</fieldset>';
                    $('#order-notes').append(notesHtml);

                }





            },
            complete: function(){
                //window.location.reload();
            }
        });

    });
     
});