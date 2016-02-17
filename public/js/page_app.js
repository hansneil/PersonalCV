/**
 * Created by hansneil on 18/1/16.
 */
var page = angular.module('ownPage', ['ngRoute']);
page.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/pages/home.html'
        })
        .when('/cv', {
            templateUrl: '/pages/cv.html'
        })
        .when('/album', {
            templateUrl: '/pages/album.html'
        })
        .when('/blog', {
            templateUrl: '/pages/blog.html'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);
page.controller('neilOwnPage', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.title = "Hansneil";
    $scope.tags_le = [
        {area: 'Web Design', style: 'web-design'},
        {area: 'Web Develop', style: 'web-develop'}
    ];
    $scope.tags = [
        {area: 'Flat Design', style: 'flat-design'},
        {area: 'Photoshop', style: 'photoshop'},
        {area: 'Illustrate', style: 'illustrate'},
    ];
    $scope.progressLeft = [
        {number: '1', skill: 'HTML5'},
        {number: '2', skill: 'CSS'},
        {number: '3', skill: 'SCSS'},
        {number: '4', skill: 'JavaScript'}
    ];
    $scope.progressRight = [
        {number: '5', skill: 'JQuery'},
        {number: '6', skill: 'Bootstrap'},
        {number: '7', skill: 'AngularJS'},
        {number: '8', skill: 'NodeJs'}
    ];
    $scope.webLink = [
        {name: 'github', link: 'https://github.com/hansneil'},
        {name: 'weibo', link: 'http://weibo.com/2434892144/profile?rightmod=1&wvr=6&mod=personinfo'},
        {name: 'linkedin', link: 'http://www.linkedin.com/in/先波-余-8b658695?trk=nav_responsive_tab_profile_pic'},
        {name: 'google', link: 'https://plus.google.com/109007860879929993270'},
        {name: 'stackoverflow', link: 'http://stackoverflow.com/users/5835253/hansneil'},
        {name: 'facebook', link: 'https://www.facebook.com/profile.php?id=100004108532958'}
    ];
    $scope.click = function(){
        $scope.active = 1;
        $location.path('/cv');

    };
    /*console.log(echarts.init);*/
}]);
page.controller('ProgressController', ['$scope', '$attrs', function($scope, $attrs) {
    /*$scope.progressLeft = [
        {number: '1', skill: 'HTML5'},
        {number: '2', skill: 'CSS'},
        {number: '3', skill: 'SCSS'},
        {number: '4', skill: 'JavaScript'}
    ];
    $scope.progressRight = [
        {number: '5', skill: 'JQuery'},
        {number: '6', skill: 'Bootstrap'},
        {number: '7', skill: 'AngularJS'},
        {number: '8', skill: 'NodeJs'}
    ];*/
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
        scope: {skill: '=', number: '='},
        link: function(scope, element, attrs, ProgressController) {
            /*var num = attrs['number'];
            console.log(element);
            element.addClass('bar-' + num);*/
        }
    }
});