var forecastApp = angular.module("forecastApp" , ['ngRoute' , 'ngResource']);

forecastApp.config(function($routeProvider) {
    $routeProvider
        .when('/homepage', {
            templateUrl: 'pages/homepage.html',
            controller: 'homepageController'
        }).when('/forecastpage', {
            templateUrl: 'pages/forecastpage.html',
            controller: 'forecastController'
        }).otherwise('/homepage', {
            templateUrl: 'pages/homepage.html',
            controller: 'homepageController'
        })
});

forecastApp.service("cityNameService", function(){
    this.cityNameFromService = "Lodz, PL";
});

forecastApp.controller('homepageController', ['$scope', 'cityNameService', function($scope, cityNameService) {
    console.log(cityNameService.cityNameFromService);

    $scope.cityName = cityNameService.cityNameFromService;

    $scope.$watch("cityName" , function(){
       cityNameService.cityNameFromService = $scope.cityName;
    });

}]);

forecastApp.controller('forecastController', ["$scope", "$resource", "cityNameService", function($scope , $resource, cityNameService) {
    $scope.cityName = cityNameService.cityNameFromService;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }} );
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.cityName, units: "metric", cnt: 7});
    console.log($scope.weatherResult);

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }
}]);
