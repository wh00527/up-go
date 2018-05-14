
    angular.module('reviewWidgetPreview', ['angular-clipboard'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    angular
        .module('reviewWidgetPreview')
        .service('Review', ['$http', function ($http) {
            var promise;
            return {
                getReview: function() {
                    promise =  $http.get('/reviews/json').
                        success(function(data, status, headers, config) {
                            return data;
                        }).
                        error(function(data, status, headers, config) {
                            console.log(status);
                        }).then(function (response) {
                            return response.data;
                        });

                    return promise;
                }
            };


        }])
        .controller('reviewWidgetPreviewCtrl', reviewWidgetPreviewCtrl);
        reviewWidgetPreviewCtrl.$inject = ['$scope','Review'];
       
        function reviewWidgetPreviewCtrl($scope,Review) {
        $scope.setWidth = {
            // '180px' : 'width-180',
            '210px' : 'width-210',
            '216px' : 'width-216',
            '240px' : 'width-240',
            '300px' : 'width-300',
            '320px' : 'width-320'
        };

        $scope.setColor = {
            'Default' : 'default',
            'Dark pink' : 'dark-pink',
            'Monochrome' : 'mono',
            'Grey black' : 'grey-black'
        };

        $scope.Image = {
            'default' : '//supplier-website-assets.s3.amazonaws.com/widgets/review-widget/ew-logo-default_en-au.png',
            'dark-pink' : '//supplier-website-assets.s3.amazonaws.com/widgets/review-widget/ew-logo-darkpink_en-au.png',
            'mono' : '//supplier-website-assets.s3.amazonaws.com/widgets/review-widget/ew-logo-mono_en-au.png',
            'grey-black' : '//supplier-website-assets.s3.amazonaws.com/widgets/review-widget/ew-logo-greyblack_en-au.png'
        }

        $scope.numberOfReview = [
            {
              'number' :'1'
            },
            {
              'number' :'2'
            },
             {
              'number' :'3'
            },
             {
              'number' :'4'
            },
            {
              'number' :'5'
            }
        ];

        var askForPromise = Review.getReview();

        askForPromise.then(
            // OnSuccess function
            function(answer) {
                $scope.reviewContent = answer;
                console.log();
                //$scope.success = true;

            }
            // OnFailure function
            //function(reason) {
               //$scope.somethingWrong = reason;
                //$scope.error = true;
            //}
        );

        $scope.html = function(){
            return '<div id="ew-supplier-reviews"' +
                   'data-ew-supplier-code="'+document.getElementsByName("supplierCode")[0].value+'" '+
                   ' data-ew-rows="'+$scope.reviewWidgetCssClasses.selectedNumberOfReview.value+'" '+
                   'data-ew-width="'+$scope.reviewWidgetCssClasses.width.value.split('-')[1]+'" '+
                   'data-ew-theme="'+$scope.reviewWidgetCssClasses.color.value+'" '+
                   'data-ew-uri="widgets.easyweddings.com.au"></div>'
                   ;
        };


        $scope.reviewWidgetCssClasses = {
            'width': {
              'key': 'Width',
              'value': 'width-320'
            },
            'color': {
              'key' : 'Color',
              'value' : 'default'
            },
            'selectedNumberOfReview': {
              'value': 0
            },
            'image': {
              'key' : 'Image',
              'value' : '//supplier-website-assets.s3.amazonaws.com/widgets/review-widget/ew-logo-default_en-au.png'
            }
          };
        }

    // $('.btn-marketing').click(function(e){
    //     $('.nav-link:eq(1)').trigger('click');
    // });


    
    // angular
    //     .module('reviewWidgetPreview')
    //     .directive('carouselItem', carouselItem);

    //     function carouselItem() {
    //       return {
    //         restrict:'A',
    //         link : function (scope, element) {
    //           if(scope.$last) {
    //             console.log('calling scope.initCarousel()');
    //             $(element.parent()).owlCarousel({
    //                 loop:true,
    //                 margin:10,
    //                 nav:true,
    //                 autoplay:true,
    //                 responsive:{
    //                     0:{
    //                         items:1
    //                     }
    //                 }                     
    //             });
    //           }
    //         }
    //       };
    //     }



//   $('.owl-carousel#review-preview').owlCarousel({
//         loop:true,
//         margin:10,
//         nav:true,
//         autoplay:true,
//         // autoWidth: true,
//         center: true,
//         items: 1,
//         responsiveBaseElement:".widget-preview"
//         // responsive: true          
//     });
// })

    //review widegt
    $('.js-textareacopybtn').click(function(){
        setTimeout(function(){
            if($('.copy-code-section-container').is(':has(.text-copied)')) {
                $('.finish-reviewWidget button').removeClass('disabled');
            }   
        },0)
    })
     
    $('.finish-reviewWidget button').click(function(){
        $(this).parents('.tab-pane').html('<div class=\"single-box\"> <div class=\"all-done m-t-1 m-b-3\"> <i class=\"fa fa-thumbs-o-up m-r-2\" aria-hidden=\"true\"><\/i> <span class=\"display-i-block\">Good job Done !<\/span> <span class=\"display-i-block small\">Now, put the code into your website<\/span> <\/div><\/div>');
    })

    //FB-app
  
    $('.fb-app-btn-next').click(function(){
        var ele = $(this).parents('.single-box');
        ele.css('cursor','pointer');
        ele.children('.second-part').slideToggle('slow');
        $(this).parents('.single-box').next().children('.second-part').slideDown('slow');
        ele.find('.title span').html('<i class="fa fa-check-circle" style="color:#8cc63f;" aria-hidden="true"></i>');
        console.log(ele.next().children('.second-part'));
        $('html,body').animate({
            scrollTop: ele.offset().top},
        'slow');
        return false;
    });

    $('.fb-app-btn-prev').click(function(){
        var ele = $(this).parents('.single-box');
        $(this).parents('.single-box').prev().children('.second-part').slideToggle('slow');
         ele.children('.second-part').slideUp('slow');
         $('html,body').animate({
            scrollTop: ele.prev().offset().top},
        'slow');

        return false;
    });

    
    var steps      = $('.steps .single-box');
    var stepCount  = steps.length;
    var step1 = $(steps[0]);
    step1.find('.js-textareacopybtn').click(function(){
        setTimeout(function(){
            if(step1.is(':has(.text-copied)')) {
                step1.find('.fb-app-btn-next').removeClass('disabled');
            }   
        },0)
    })

    $.each(steps, function(index){
        if(index == stepCount - 2) {
            $(this).find('.fb-app-btn-next').click(function(){
                $(this).parents('.single-box').next().find('.title span').html('<i class="fa fa-check-circle" style="color:#8cc63f;" aria-hidden="true"></i>');
            });
        }
        $(this).click(function(){
            if($(this).is(':has(.fa-check-circle)')) {
                $(this).children('.second-part').slideToggle();
                  $('html,body').animate({
                    scrollTop: $(this).offset().top},
                'slow');
            }
        })
    });

    //badge & button

    var badge = angular.module('marketing-badge', ['angular-clipboard'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    badge.controller('badgeCtrl', ['$scope', function($scope) {

        $scope.theme = 'default';
        $scope.size = '_en-au'
        $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/buttons/ew-btn-review-business-'+$scope.theme+'_en-au.png';

        $scope.changeTheme = function(value){
           $scope.theme = value;
           $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/buttons/ew-btn-review-business-'+$scope.theme+$scope.size+'.png';
        }

        $scope.changeSize = function(value){
            $scope.size = value;
            $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/buttons/ew-btn-review-business-'+$scope.theme+$scope.size+'.png';
        }

        $scope.html = function(){
            return '<a href="'+document.getElementsByName("supplier-website")[0].value+'" title="Review our business on www.easyweddings.com.au" target="_blank">' +
                '<img src="'+$scope.src+'"' +
                'style="display: block; max-width: 100%; max-height: auto; border: none;"'+
                'border="0" alt="Review our business on Easy Weddings" title="Review our business on www.easyweddings.com.au"'+
                '/></a>'
                ;
        };
    }]);




    //social icons

    var social = angular.module('social-icons', ['angular-clipboard'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    social.controller('socialIconCtrl', ['$scope', function($scope) {

        $scope.theme = 'white';
        $scope.size = '24'
        $scope.style = 'round';
        $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/social/easyweddings/'
                      +$scope.style+'/png/'+$scope.size+'/easyweddings-icon-'+$scope.theme+'.png';

        $scope.changeTheme = function(value){
            $scope.theme = value;
            $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/social/easyweddings/'
                +$scope.style+'/png/'+$scope.size+'/easyweddings-icon-'+$scope.theme+'.png';
        }

        $scope.changeSize = function(value){
            $scope.size = value;
            $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/social/easyweddings/'
                +$scope.style+'/png/'+$scope.size+'/easyweddings-icon-'+$scope.theme+'.png';
        }

        $scope.changeStyle = function(value){
            $scope.style = value;
            $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/social/easyweddings/'
                +$scope.style+'/png/'+$scope.size+'/easyweddings-icon-'+$scope.theme+'.png';
        }

        $scope.html = function(){
            return '<a href="'+document.getElementsByName("supplier-website")[0].value+'" title="Review our business on www.easyweddings.com.au" target="_blank">' +
                '<img src="'+$scope.src+'"' +
                'style="display: block; max-width: 100%; max-height: auto; border: none;"'+
                'border="0" alt="'+document.getElementsByName("supplier-name")[0].value+'" title="see our profile on www.easyweddings.com.au"'+
                '/></a>'
                ;
        };

    }]);

    //text link

    var textLink = angular.module('text-link', ['angular-clipboard'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    textLink.controller('textLinkCtrl', ['$scope','$sce', function($scope,$sce) {

        $scope.linkTo = '';
        $scope.linkText = '<span class="p-l-1">Maximum 140 characters</span>'
        $scope.openIn = 'target="_blank"';

        $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($scope.html);

        $scope.renderHtml = function(){
            return $sce.trustAsHtml('<input class="form-control text-info m-b-1" value="Read our reviews on Easyweddings" href="'+document.getElementsByName("supplier-website")[0].value+$scope.linkTo+'" title="'+document.getElementsByName("supplier-name")[0].value+' on www.easyweddings.com.au"' +
                ' '+$scope.openIn+' >' + $scope.linkText +
                '</input>');
        };

        $scope.src = 'http://supplier-website-assets.s3.amazonaws.com/social/easyweddings/'
            +$scope.style+'/png/'+$scope.size+'/easyweddings-icon-'+$scope.theme+'.png';

        $scope.changeLink = function(value){
            if(value == 'profile'){
                $scope.linkTo = '';
            }else{
                $scope.linkTo = '#/'+value;
            }
        }

        $scope.toggleOpenIn = function(value){
            if(value == 'no'){
                $scope.openIn = '';
            }else{
                $scope.openIn = 'target="_blank"';
            }
        }


        $scope.html = function(){
            return '<a href="'+document.getElementsByName("supplier-website")[0].value+$scope.linkTo+'" title="'+document.getElementsByName("supplier-name")[0].value+' on www.easyweddings.com.au"' +
                ' '+$scope.openIn+' >' + $scope.linkText +
                '</a>'
                ;
        };



    }]);

    //email

    var email = angular.module('email', ['angular-clipboard'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

    email.controller('emailCtrl', ['$scope', function($scope) {

        $scope.linkTo = '';

        $scope.changeLink = function(value){
            if(value == 'profile'){
                $scope.linkTo = '';
            }else{
                $scope.linkTo = '#/'+value;
            }
        }

        $scope.html = function(){
            return document.getElementsByName("supplier-website")[0].value+$scope.linkTo;
        };



    }]);






