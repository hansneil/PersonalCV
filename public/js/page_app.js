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
page.controller('AlbumController', ['$scope', function($scope){
    $scope.photography = {
        type: "all",
        active1: true,
        active2: false,
        active3: false,
        active4: false
    };
    $scope.album = [
        {type: "Metasequoia", city: "Shanghai", src: "/img/album/10.jpg"},
        {type: "Droplight", city: "Xiamen", src: "/img/album/9.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/11.jpg"},
        {type: "Cityscape", city: "Cixi", src: "/img/album/14.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/13.jpg"},
        {type: "Lyudao", city: "Taiwan", src: "/img/album/12.jpg"},
        {type: "Clover", city: "Xiamen", src: "/img/album/15.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/16.jpg"}
    ];
    $scope.portrait = [
        {type: "A Man", city: "Kaohsiung", src: "/img/album/17.jpg"},
        {type: "Portrait", city: "Kending", src: "/img/album/18.jpg"},
        {type: "Portrait", city: "Hualien", src: "/img/album/19.jpg"},
        {type: "Portrait", city: "Xiamen", src: "/img/album/20.jpg"},
        {type: "The bartender", city: "Kending", src: "/img/album/21.jpg"},
        {type: "Portrait", city: "Cixi", src: "/img/album/22.jpg"},
        {type: "Portrait", city: "Cixi", src: "/img/album/23.jpg"}
    ];
    $scope.scenery = [
        {type: "Metasequoia", city: "Shanghai", src: "/img/album/10.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/11.jpg"},
        {type: "Cityscape", city: "Cixi", src: "/img/album/14.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/13.jpg"},
        {type: "Library", city: "Shanghai", src: "/img/album/24.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/25.jpg"},
        {type: "Sunset", city: "Shanghai", src: "/img/album/26.jpg"}
    ];
    $scope.travel = [
        {type: "Droplight", city: "Xiamen", src: "/img/album/9.jpg"},
        {type: "Jiufen", city: "Taiwan", src: "/img/album/6.jpg"},
        {type: "Building", city: "Xiamen", src: "/img/album/28.jpg"},
        {type: "Clover", city: "Xiamen", src: "/img/album/15.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/16.jpg"},
        {type: "Ocean", city: "Xiamen", src: "/img/album/27.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/29.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/30.jpg"},
    ];
    $scope.chooseAlbum = function (albumType) {
        $scope.photography.type = albumType;
        if (albumType == 'all') {
            $scope.photography.active1 = true;
            $scope.photography.active2 = false;
            $scope.photography.active3 = false;
            $scope.photography.active4 = false;
        } else if (albumType == 'portrait') {
            $scope.photography.active1 = false;
            $scope.photography.active2 = true;
            $scope.photography.active3 = false;
            $scope.photography.active4 = false;
        } else if (albumType == 'scenery') {
            $scope.photography.active1 = false;
            $scope.photography.active2 = false;
            $scope.photography.active3 = true;
            $scope.photography.active4 = false;
        } else if (albumType == 'travel') {
            $scope.photography.active1 = false;
            $scope.photography.active2 = false;
            $scope.photography.active3 = false;
            $scope.photography.active4 = true;
        }
    }
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