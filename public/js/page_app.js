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
page.controller('ProgressController', ['$scope', '$attrs', function($scope, $attrs) {

}]);
page.directive('progressGroup', function(){
    return {
        restrict: 'E',
        controller: 'ProgressController',
        link: function(scope, element, attrs) {
            element.addClass('progress');
        }
    }
});
page.directive('progressBar', function() {
    return {
        require: '^progressGroup',
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/tpls/progress.html',
        scope: {skill: '@', number: '@'},
        link: function(scope, element, attrs, ProgressController) {
            var num = attrs.number;
            element.addClass('bar-' + num);
        }
    }
});