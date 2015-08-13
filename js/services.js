'use strict';

///* Services */
//
//var phonecatServices = angular.module('phonecatServices', ['ngResource']);
//
//phonecatServices.factory('Phone', ['$resource',
//  function($resource){
//    return $resource('phones/:phoneId.json', {}, {
//      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//    });
//  }]);


var phonecatService = angular.module('phonecatService', ['ngResource']);


phonecatService.factory("Phone", ['$resource', function($resource){

    return $resource('asset/phones/:phoneId.json', {}, {
        getPhones: {
            method: 'GET',
            params: {phoneId: 'phones'},
            isArray: true
        }
    });

}]);



var demoServiceModule = angular.module('demoService', []);

demoServiceModule.factory("jsonRequest", ['$http', function($http) {

    var data = {},
        jsonURL = "asset/phones/phones.json";
    data.jsonData = [];

    var update = function(intaker) {
        return $http.get(jsonURL).success(function(json) {
            data.jsonData = json;
        }).error(function(){

        });
    };


    var get = function() {
        return data;
    };


    return {
        getData: get,
        requestData: update
    }
}]);

