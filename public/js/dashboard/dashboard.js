(function (root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'));
    } else {
        root.angularClipboard = factory(root.angular);
    }
}(this, function (angular) {

    return angular.module('angular-clipboard', [])
        .factory('clipboard', ['$document', function ($document) {
            function createNode(text, context) {
                var node = $document[0].createElement('textarea');
                node.style.position = 'absolute';
                node.textContent = text;
                node.style.left = '-10000px';
                if (context instanceof HTMLElement) {
                    node.style.top = context.getBoundingClientRect().top + 'px';
                }
                return node;
            }

            function copyNode(node) {
                try {
                    // Set inline style to override css styles
                    $document[0].body.style.webkitUserSelect = 'initial';

                    var selection = $document[0].getSelection();
                    selection.removeAllRanges();
                    node.select();

                    if(!$document[0].execCommand('copy')) {
                        throw('failure copy');
                    }
                    selection.removeAllRanges();
                } finally {
                    // Reset inline style
                    $document[0].body.style.webkitUserSelect = '';
                }
            }

            function copyText(text, context) {
                var node = createNode(text, context);
                $document[0].body.appendChild(node);
                copyNode(node);
                $document[0].body.removeChild(node);
            }

            return {
                copyText: copyText,
                supported: 'queryCommandSupported' in document && document.queryCommandSupported('copy')
            };
        }])
        .directive('clipboard', ['clipboard', function (clipboard) {
            return {
                restrict: 'A',
                scope: {
                    onCopied: '&',
                    onError: '&',
                    text: '=',
                    supported: '=?'
                },
                link: function (scope, element) {
                    scope.supported = clipboard.supported;

                    element.on('click', function (event) {
                        try {
                            clipboard.copyText(scope.text, element[0]);
                            if (angular.isFunction(scope.onCopied)) {
                                scope.$evalAsync(scope.onCopied());
                            }
                        } catch (err) {
                            if (angular.isFunction(scope.onError)) {
                                scope.$evalAsync(scope.onError({err: err}));
                            }
                        }
                    });
                }
            };
        }]);

}));


var app = angular.module('MyChartApp', []);

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
                            $(".morris-hover").html('<div>Custom label: ' + data.enquiries + '</div>');
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

app.controller('StatisticCtrl', ['$scope', '$timeout', function($scope, $timeout){

    $scope.flag = true;
    $scope.linechart = null;
    $scope.url = '/statistics/jsonMonth';
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
