//'use strict';
//
///* Controllers */
//
//var phonecatControllers = angular.module('phonecatControllers', []);
//
//phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
//  function($scope, Phone) {
//    $scope.phones = Phone.query();
//    $scope.orderProp = 'age';
//  }]);
//
//phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//  function($scope, $routeParams, Phone) {
//    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//      $scope.mainImageUrl = phone.images[0];
//    });
//
//    $scope.setImage = function(imageUrl) {
//      $scope.mainImageUrl = imageUrl;
//    };
//  }]);



'use strict'

var controllerModule = angular.module('phonecatControllers', []);
controllerModule.controller('PhoneListCtrl', ['$scope', '$http', 'Phone', function ($scope, $http, PhoneService) {

//    var jsonUrl = 'asset/phones/phones.json';
//    $http.get(jsonUrl).success(function (e) {
//        $scope.phones = e;
//    }).error(function () {
//        $scope.phones = [
//
//            {'name': 'Nexus S',
//                'snippet': 'Fast just got faster with Nexus S.',
//                'age': 1},
//            {'name': 'Motorola XOOM™ with Wi-Fi',
//                'snippet': 'The Next, Next Generation tablet.',
//                'age': 2},
//            {'name': 'MOTOROLA XOOM™',
//                'snippet': 'The Next, Next Generation tablet.',
//                'age': 3}
//
//        ];
//
//    });


    $scope.phones = PhoneService.getPhones();

    var ins = new PhoneService();

    $scope.orderProp = "age";
}]);


controllerModule.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http', 'Phone', '$location', function($scope, $routeParams, $http, PhoneService, $location){
    $scope.phoneId = $routeParams.phoneId;
    $scope.phone = PhoneService.get({phoneId: $routeParams.phoneId}, function(phone) {
        $scope.mainImageUrl = phone.images[0];
    }, function() {
            $location.url('/phones');
        }
    );






    $scope.switchMainImage = function(index) {
        var imageURLs = $scope.phone.images;
        index = Math.max(0, index);
        index = Math.min(index, imageURLs.length);
        $scope.mainImageUrl = $scope.phone.images[index];
    };



    //fetch detail json.
    var detailUrl = "asset/phones/" + $routeParams.phoneId + ".json";
    $http.get(detailUrl).success(function(data){
        $scope.phone = data;
        $scope.mainImageUrl = $scope.phone.images[0];
    })
    .error(function(){
        $window.log("failed to get detail json")
    });

}]);




