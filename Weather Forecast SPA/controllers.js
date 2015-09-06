//CONTROLLERS

forecastApp.controller('homepageController', ['$scope', '$location', 'cityNameService', function($scope, $location, cityNameService) {
    console.log(cityNameService.cityNameFromService);

    $scope.cityName = cityNameService.cityNameFromService;

    $scope.$watch("cityName" , function(){
        cityNameService.cityNameFromService = $scope.cityName;
    });

    $scope.submit = function(){
        $location.path("/forecastpage");
    };

}]);

forecastApp.controller('forecastController', ["$scope", "$resource", "$routeParams", "cityNameService", function($scope , $resource, $routeParams, cityNameService) {
    $scope.cityName = cityNameService.cityNameFromService;

    $scope.days = $routeParams.days || 2;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }} );
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.cityName, units: "metric", cnt: $scope.days });
    console.log($scope.weatherResult);

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);