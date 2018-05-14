var app = angular.module('StatisticApp', []);

app.directive('linechart', ['$http', function($http) {
    function createChart(el_id, options) {
        options.element = el_id;
        var r = new Morris.Line(options);
        return r;
    }
    var count = 0;

    return {
        restrict: 'E',
        controller: "StatisticCtrl",
        scope:  {
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs, ngCtrl) {

            $http.get('/statistics/jsonMonth')
                .then(function(resp) {
                    var data = resp.data, chart;

                    scope.options = {
                        data: data.value,
                        lineColors: ['#ed1e79','#7c62a7','#ff7bac','#00a99d','#ff931e'],
                        xkey: 'y',
                        ykeys: ['listingView', 'websiteClick','saves','enquiries','reviews'],
                        hoverCallback: function(index, options, content) {
                            var data = options.data[index];
                            console.log(data);
                            $(".morris-hover").html('<div>Listing Views: ' + data.listingView + '</div>'+
                                '<div>Website Clicks: ' + data.websiteClick + '</div>'+
                                '<div>Saves: ' + data.saves + '</div>'+
                                '<div>Enquiries: ' + data.enquiries + '</div>'+
                                '<div>Reviews: ' + data.reviews + '</div>'
                            );
                        },
                        stacked: true,
                        labels: ['listingView', 'websiteClick','saves','enquiries','reviews'],
                        parseTime: false
                    };

                    if(scope.options.data.length > 1){
                        var chart = createChart(attrs.id, scope.options);
                        chart.on('click', function(index, row){
                            ngCtrl.update_circles(scope.options.data[index]);
                        });
                        return chart;
                    }

                })
                .catch(function(data, status) {
                    console.error('request error', status, data);
                })
                .finally(function() {
                    console.log("finally finished");
                });


//                var chart = createChart(attrs.id, scope.options);
//                chart.on('click', function(index, row){
//                    ngCtrl.update_circles(scope.options.data[index]);
//                });
//                console.log(chart);
//                return chart;
        }
    }

}]);

app.directive('linechartP', ['$http', function($http) {
    function createChart(el_id, options) {
        options.element = el_id;
        var r = new Morris.Line(options);
        return r;
    }

    return {
        restrict: 'E',
        controller: "StatisticCtrl",
        scope:  {
            options: '='
        },
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs, ngCtrl) {

            var data = $.param({
                category: document.getElementsByName("profile-category")[0].value,
                region: document.getElementsByName("profile-region")[0].value
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }


            $http.post('/statistics/performance-profileJsonProfile',data,config)
                .then(function(resp) {
                    var data = resp.data, chart;

                    scope.options = {
                        data: data,
                        lineColors: ['#ed1e79','#7c62a7','#ff7bac','#00a99d','#ff931e'],
                        xkey: 'y',
                        ykeys: ['Spotlight', 'Premium','Priority','you','Standard'],
                        hoverCallback: function(index, options, content) {
                            var data = options.data[index];
                            $(".morris-hover").html('<div>'+ data.y
                                + '<br />Spotlight + Premium:'+ data.Spotlight
                                + '<br />Premium:'+ data.Premium
                                + '<br />Priority:' + data.Priority
                                + '<br />You:' + data.you
                                + '<br />Standard:' + data.Standard
                                + '</div>');
                        },
                        stacked: true,
                        labels: ['Splotlight', 'Premium','Priority','you','standard'],
                        parseTime: false
                    };

                    if(scope.options.data.length > 1){
                        var chart = createChart(attrs.id, scope.options);
                        chart.on('click', function(index, row){
                            ngCtrl.update_circles(scope.options.data[index]);
                        });
                        return chart;
                    }

                })
                .catch(function(data, status) {
                    console.error('request error', status, data);
                })
                .finally(function() {
                    console.log("finally finished");
                });
        }
    }

}]);





app.controller('StatisticCtrl', ['$scope', '$timeout', function($scope, $timeout){

    $scope.flag = true;
    $scope.linechart = null;
    $scope.url = '/statistics/jsonMonth';
    $scope.supplierId = document.getElementsByName("current-supplier-id")[0].value;
    $scope.circles = {
        month: "Jan",
        listingView: 165,
        websiteClick: 85,
        saves: 70,
        enquiries: 25,
        reviews: 15
    };

    this.update_circles = function(current){
        $timeout(function() {
            $scope.circles.month = $scope.chart_options.xLabelFormat(current.y);
            $scope.circles.listingView = current.listingView;
            $scope.circles.websiteClick = current.websiteClick;
            $scope.circles.saves = current.saves;
            $scope.circles.enquiries = current.enquiries;
            $scope.circles.reviews = current.reviews;
        }, 0);
    }

}]);
