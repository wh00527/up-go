$(document).ready(function(){
    // form-validation
    $.validate({
        modules : 'date, security,file',
        inputParentClassOnSuccess: 'has-success-crm'
    }); 

    // copy text
    var copyBtn = $('.js-textareacopybtn');
   
    if(copyBtn != null) {
        copyBtn.each(function(){
            $(this).on('click', function(event) {
            var container = $(this).parents('.copy-code-section-container');
            var successful = document.execCommand('copy');
            if(successful) {
                $(this).parent().addClass('has-success');
                $(this).children().html('<i class="fa fa-check" style="color:#fff;" aria-hidden="true"></i>');
                
                if(!container.is(':has(.text-copied)')) {
                   $(this).parent().after("<p class='text-copied'><strong>COPIED</strong></p>");
                }
            }else {
                $(this).parent().after("<p class='text-danger text-xs-left'>Opps, seems we did not get the copy, do you mind try again?</p>")
            }
            //to prevent click event from bubbling up to stop single-box on fb app page slide up
            return false;
        }); 
      })
    } 
    

    // top navigation
    var path = window.location.pathname.split('/');
    $('.secondary-nav li').each(function(e){
        if(path[path.length-1] == $(this).data('target')){
            $(this).addClass('active');
        }
    });
    if(path.length <= 2){
        $('.secondary-nav li:eq(0)').addClass('active');
    }
});
