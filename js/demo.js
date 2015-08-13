/**
 * File:
 * User: dshi
 * Date: 8/4/2015 1:50 PM
 * Copyright (c) 2015 MicroStrategy Incorporated. All rights reserved.
 */
var demoApp = angular.module('demoApp', ['demoService', 'ui.grid', 'nvd3ChartDirectives']);

demoApp.controller('demoController', ['$scope', '$http', function ($scope, $http) {

    $scope.tasks = {pageCount: 10, currentPage: 4};

    $scope.alerts = [
        {message: "warning1", type: "info"},
        {message: "attention", type: "info"}
    ];

    $scope.closeAlert = function (i) {
        i = Math.max(0, i);
        i = Math.min($scope.alerts.length - 1, i);

            $scope.alerts.splice(i, 1);

    };

    $scope.updateData = function (displayMode) {

        var _URL = "asset/phones/phones.json";
        var dataTag = displayMode + 'Data';

        var parseURL = function (displayMode) {
            switch (displayMode) {
                case 'grid':
                    _URL = "asset/phones/grid-data.json";
                    break;

                case 'graph':
                    _URL = "asset/phones/graph-data.json";
                    break;

                case 'json':
                default:
                    break;
            }

        };

        var update = function () {

            _URL = parseURL(displayMode) || _URL;

            return $http.get(_URL).success(function (data) {

                var resultData = data;
                $scope[dataTag] = resultData;

            }).error(function () {

            });
        };

        update();
    };


    $scope.sayHello = function (message) {
        window.alert(message);
    }


    //select testing
    $scope.values = [{
        id: 1,
        label: 'aLabel',
        subItem: { name: 'aSubItem' }
    }, {
        id: 2,
        label: 'bLabel',
        subItem: { name: 'bSubItem' }
    }];

    $scope.selected = $scope.values[0];


}]);


demoApp.controller('ExampleController', ['$scope', function ($scope) {
    $scope.master = {};

    $scope.update = function (user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
}]);


demoApp.directive('validateEquals', function () {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtronller) {

            var validateEqual = function (myValue) {
                var isValid = (myValue === scope.$eval(attrs.validateEquals));
                ngModelCtronller.$setValidity('equal', isValid);
                return isValid ? myValue : undefined;
            };


            ngModelCtronller.$parsers.push(validateEqual);
            ngModelCtronller.$formatters.push(validateEqual);


            scope.$watch(attrs.validateEquals, function () {
                ngModelCtronller.$setViewValue(ngModelCtronller.$viewValue);
            });

        }
    };

});

demoApp.directive("simpleTransit", function () {


    var compileFunction = function (element, attrs) {
        element.css('background-color', 'red');

        var linkFunction = function (scope, element, attrs) {
//                var segment = $("<div></div>");
//                window.console.log(segment);
        };

        return linkFunction;
    };


    return {
        restrict: 'AE',
        transclude: true,
        template: '<div> welcome to Nanjing! </div> <div ng-transclude> </div>',
        compile: compileFunction
    };
});


demoApp.directive('pagination', function () {

    return {
        restrict: 'E',
        scope: {
            numPages: '=',
            currentPage: '=',
            onSelectPage: '&'  //< You don't even have to implement this
        },
        templateUrl: 'partials/pagination.html',
        replace: true,
        link: function (scope) {
            scope.isActive = function (page) {
                return scope.currentPage === page;
            };
            scope.noNext = function () {
                return scope.currentPage >= scope.numPages - 1
            };
            scope.noPrevious = function () {
                return scope.currentPage <= 0
            };
            scope.selectPage = function (page) {
                if (scope.isActive(page) === false) {
                    scope.currentPage = page;
                    scope.onSelectPage({pageX: page});   //< if you want to pass over information to the template experssion, use an object like {A: value} where A is the parameter name of the func in template attr.
                }                                       //< and you should not IMPLEMENT it
            };
            scope.selectNext = function () {
                if (scope.noNext() === false) {
                    scope.selectPage(scope.currentPage + 1);

                }
            };

//             scope.onSelectPage = function(pageObj) {
//                   window.alert('haha');
//             };

            scope.selectPrevious = function () {
                if (scope.noPrevious() === false) {
                    scope.selectPage(scope.currentPage - 1);

                }
            };

            /*
             * Two ways to do the watch-binding
             * 1. either you do it in view via {{expr}}
             * 2. or you do it like this with $watch on scope.
             * */
            scope.$watch('numPages', function (value) {
                scope.pages = [];
                for (var i = 0; i < value; i++) {
                    scope.pages.push(i);
                }

                if (scope.currentPage > value) {
                    scope.selectPage(value);
                }

            });

        }
    }
});


demoApp.directive('alert', function () {


    var templateString = '<div class = "col-md-offset-1 col-md-10 alert alert-{{type}}">'
        + '<div ng-transclude> </div>'
        + '<button type = "button" class = "close" ng-click = "close()"> &times </button>' //in template we can not have ngClick. But we should have it as ng-click.
        + '</div>';

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: templateString,

        scope: {
            close: '&',
            type: '=typex'      //wierd that we can not use typeX, anyway, type is the scope attribute, while typex is directive attribute NAME. the binding is between scope attribute and directive attribute VALUE.
        }                       //
    };


});

