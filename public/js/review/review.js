
$(document).ready(function(){

    $('.review-hide').click(function(){

        var target =  $(this).data('target');
        var value =  $(this).data('value');
        var array = {target: target, value : value};

        $.ajax({
            type: "GET",
            url: "/reviews/hide",
            data: array,
            cache: false,
            success: function(data){
                //
            },
            complete: function(){
                window.location.reload();
            }
        });
    });

    $('.review-featured').click(function(){

        var target =  $(this).data('target');
        var value =  $(this).data('value');
        var array = {target: target, value : value};

        HttpRequest("/reviews/feature",array);
    });

    $('.content .dropdown-item').click( function(e){
        e.preventDefault();
        $(this).parent().parent().find('button span').text($(this).text());
        $(this).parent().find('input').val($(this).text());
    } );

    $('#request-add-number').click( function(e){

        e.preventDefault();
        for (var i = 0; i < parseInt($('.dropdown-toggle span').text()); i++) {
//            e.clone().insertAfter(e);

            var element = $('.raw-form-element')[0];
            $('.target-form-element').after(element.outerHTML);
        }
        $('.date').datetimepicker({
            format: 'DD/MM/YYYY'
        });

    } );

    $(".review-respond").click(function(){
        $("#review-id").val($(this).data('id'));
        $("#review-time").text($(this).data('time'));
        $("#review-name").text($(this).data('name'));
        //$('#createFormId').modal('show');
    });

    function HttpRequest(url,value){
        $.ajax({
            type: "GET",
            url: url,
            data: value,
            cache: false,
            success: function(data){
                //
            },
            complete: function(){
                window.location.reload();
            }
        });
    }

//    $.validate({
//        modules : 'date, security,file'
//    });

});



