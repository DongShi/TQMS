//'use strict';
//
///* App Module */
//
//var phonecatApp = angular.module('phonecatApp', [
//  'ngRoute',
//  'phonecatAnimations',
//
//  'phonecatControllers',
//  'phonecatFilters',
//  'phonecatServices'
//]);
//
//phonecatApp.config(['$routeProvider',
//  function($routeProvider) {
//    $routeProvider.
//      when('/phones', {
//        templateUrl: 'partials/phone-list.html',
//        controller: 'PhoneListCtrl'
//      }).
//      when('/phones/:phoneId', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
//      }).
//      otherwise({
//        redirectTo: '/phones'
//      });
//  }]);



//declaration.
var phoneCatApp = angular.module('phonecatApp',   ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatService']);

//config
phoneCatApp.config(
    ['$routeProvider', function($routeProvider) {
        $routeProvider.when('/phones',
            {
                templateUrl: "partials/phone-list.html",
                controller: "PhoneListCtrl"
            }
        ).when( '/phones/:phoneId',
            {
                templateUrl: 'partials/phone-detail.html',
                controller: "PhoneDetailCtrl"
            }
        ).otherwise(
            {
                redirectTo: '/phones'
            }
        );
    }]
);




//demo


