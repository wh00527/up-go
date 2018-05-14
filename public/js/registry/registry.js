$(function() {

  /*Tinymce editor*/
  tinymce.init({
    selector: '#crmregistrytermsandconditions',
    content_css : '../css/main.css',
    menubar:false,
    statusbar: false,
    removed_menuitems: 'formats',
    resize: 'true',
    toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
  });

  tinymce.init({
    selector: '#crmregistryaddaproduct',
    content_css : '../css/main.css',
    menubar:false,
    statusbar: false,
    removed_menuitems: 'formats',
    resize: 'true',
    toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
  });
    tinymce.init({
    selector: '#crmregistryfulldescription',
    content_css : '../css/main.css',
    menubar:false,
    statusbar: false,
    removed_menuitems: 'formats',
    resize: 'true',
    toolbar: 'undo redo | styleselect | fontselect fontsizeselect | bullist numlist outdent indent | removeformat | cut copy paste |'
  });
  

  /*Data table*/
    //Products
    $('#crmregistryproducts').DataTable({
        pagingType: "full_numbers",
        "pageLength": 2,
        "bLengthChange": false,
        "oLanguage": {
          "oPaginate": {
            "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
             "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
          }
        },
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
    
    $('#crmregistryproducts').on('draw.dt', function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-pink',
            radioClass: 'iradio_square-pink'
        });
    });
    $("#crmregistryproductssearch").html($("#crmregistryproducts_filter"));

    $("#crmregistryproducts input[type=checkbox]").on('ifChecked', function(event){
      $('.delete-and-choose-page').addClass('row');
      $('.toggleContainer').hide();
    });
    $("#crmregistryproducts .selectall").on('ifChecked', function(event){

      $("#crmregistryproducts .icheckbox_square-pink").addClass('hover checked');
    });
    $("#crmregistryproducts .selectall").on('ifUnchecked',function(){
      $("#crmregistryproducts .icheckbox_square-pink").removeClass('hover checked');
    });
    $("#crmregistryproducts input[type=checkbox]").on('ifUnchecked', function(event){
      var length = $('#crmregistryproducts .icheckbox_square-pink.checked').length;
      if ( length <= 1 ) {
        $('.delete-and-choose-page').removeClass('row');
        $('.toggleContainer').show();
      }
    });

    //Products - related product
    $('#registryrelatedproductstable').DataTable({
      pagingType: "full_numbers",
      "pageLength": 2,
      "bLengthChange": false,
       // "bFilter": false,
      "oLanguage": {
        "oPaginate": {
          "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
           "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        }
      },
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
    $("#registryrelatedproductstablesearch").html($("#registryrelatedproductstable_filter"));
    $('#registryrelatedproductstable').on('draw.dt', function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-pink',
            radioClass: 'iradio_square-pink'
        });
    });

    //product- reviews

    $('#registryproductreviewstable').DataTable({
        pagingType: "full_numbers",
        "pageLength": 2,
        "bLengthChange": false,
        "oLanguage": {
          "oPaginate": {
            "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
             "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
          }
        },
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
    $('#registryproductreviewstable').on('draw.dt', function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-pink',
            radioClass: 'iradio_square-pink'
        });
    });
    $("#registryproductreviewstablesearch").html($("#registryproductreviewstable_filter"));

    $("#registryproductreviewstable input[type=checkbox]").on('ifChecked', function(event){
      $('.delete-and-choose-page').addClass('row');
      $('.toggleContainer').hide();
    });
    $("#registryproductreviewstable #selectall").on('ifChecked', function(event){
      $("#registryproductreviewstable .icheckbox_square-pink").addClass('hover checked');
    });
    $("#registryproductreviewstable #selectall").on('ifUnchecked',function(){
      $("#registryproductreviewstable .icheckbox_square-pink").removeClass('hover checked');
    });   
    $("#registryproductreviewstable input[type=checkbox]").on('ifUnchecked', function(event){
      var length = $('#productreviewstable .icheckbox_square-pink.checked').length;
      if ( length <= 1 ) {
        $('.delete-and-choose-page').removeClass('row');
        $('.toggleContainer').show();
      }
    });

    //product - order history
    $('#orderhistorystable').DataTable({
      pagingType: "full_numbers",
      "pageLength": 2,
      "bLengthChange": false,
       // "bFilter": false,
      "oLanguage": {
        "oPaginate": {
          "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
           "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        }
      },
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
    $("#orderhistorystablesearch").html($("#orderhistorystable_filter"));

    //product - order summary
    $('#crmRegistryMonthlyOrderSummary').DataTable({
      pagingType: "full_numbers",
      "pageLength": 2,
      "bLengthChange": false,
       // "bFilter": false,
      "oLanguage": {
        "oPaginate": {
          "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
           "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        }
      },
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
    $("#crmRegistryMonthlyOrderSummarysearch").html($("#crmRegistryMonthlyOrderSummary_filter"));

    //product in registry
    $('#productsinregistry').DataTable({
      pagingType: "full_numbers",
      "pageLength": 2,
      // "bLengthChange": false,
      "bFilter": false,
      "oLanguage": {
        "oPaginate": {
          "sPrevious": "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
           "sNext": "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        }
      },
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
    $("#productsinregistrysearch").html($("#productsinregistry_filter"));

    
  /* Stacked modal*/
 

  $('.image-edit-tool-bar .fa-pencil-square-o').click(function(){
    console.log('link clicked');
    $('#image-uploader-modal').modal('show');
  });

  $('#image-uploader-modal').on('shown.bs.modal', function(e){
    console.log('modal shown event');
    $('#registry-edit-a-new-product').css('z-index','1000');
  });
 
  $("#image-uploader-modal .close").click(function(){
    $('#image-uploader-modal').modal('hide');
  });

  $('#image-uploader-modal').on('hide.bs.modal', function(e){
    $('#registry-edit-a-new-product').css('z-index','1051');
    setTimeout(
      function(){ 
        $('body').addClass('modal-open');
      }, 
      500
    );   
  });

  $('#registryproductreviewstable .product-name').click(function(){
    $('#reivew-details').modal('show');
  });

  $('#reivew-details').on('show.bs.modal', function(e){
    $('#registry-edit-a-new-product').css('z-index','1000');
  });
  
  $("#reivew-details .close").click(function(){
   $('#reivew-details').modal('hide');
  });
  
  $('#reivew-details').on('hide.bs.modal', function(e){
    $('#registry-edit-a-new-product').css('z-index','1051');
    setTimeout(
      function(){ 
        $('body').addClass('modal-open');
      }, 
      500
    );   
  });

});