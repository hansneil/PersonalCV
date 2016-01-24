/**
 * Created by hansneil on 18/1/16.
 */
var page = angular.module('ownPage', []);
page.controller('neilOwnPage', ['$scope', '$http', function($scope, $http){
    $scope.title = "Hansneil";
    $scope.click = function(){
        $scope.active = 1;
    };
    /*console.log(echarts.init);*/
}]);