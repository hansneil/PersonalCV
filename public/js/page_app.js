/**
 * Created by hansneil on 18/1/16.
 */
angular.module('security', [])
    .provider('security', {
        login: ['security',function(security) {
            console.log('aaa');
            security.login(123);
        }],
        $get: [
            '$http', '$q',
            function($http, $q){
                var service = {
                    login: function(password) {
                        console.log('aaa');
                        var request = $http.post('/login', {password: password});
                        return request.then(function(response){
                            service.user = response.data.user;
                        });
                    },
                    user: null
                };
                return service;
            }
        ]
    });

var page = angular.module('ownPage', ['ngRoute', 'angular-gestures', 'security']);
page.config(['$routeProvider', 'securityProvider', 'hammerDefaultOptsProvider', function($routeProvider, security, hammerDefaultOptsProvider){
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
            templateUrl: '/pages/blog.html',
            resolve: security.login
        })
        .when('/wechat', {
            templateUrl: '/pages/wechat.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    hammerDefaultOptsProvider.set({
        recognizers: [[Hammer.Tap, {time: 250}], [Hammer.Press, {time: 250}], [Hammer.Swipe, {time: 250}]]
    });
}]);
page.controller('homeController', ['$scope', function($scope){

}]);
page.factory('cvInfo', function(){
    var title = "Hansneil";
    var left_tags = [
        {area: 'Web Design', style: 'web-design'},
        {area: 'Web Develop', style: 'web-develop'}
    ];
    var right_tags = [
        {area: 'Flat Design', style: 'flat-design'},
        {area: 'Photoshop', style: 'photoshop'},
        {area: 'Illustrate', style: 'illustrate'},
    ];
    var progressLeft = [
        {number: '1', skill: 'HTML5'},
        {number: '2', skill: 'CSS'},
        {number: '3', skill: 'SCSS'},
        {number: '4', skill: 'JavaScript'}
    ];
    var progressRight = [
        {number: '5', skill: 'JQuery'},
        {number: '6', skill: 'Bootstrap'},
        {number: '7', skill: 'AngularJS'},
        {number: '8', skill: 'NodeJs'}
    ];
    var webLink = [
        {name: 'github', link: 'https://github.com/hansneil'},
        {name: 'weibo', link: 'http://weibo.com/2434892144/profile?rightmod=1&wvr=6&mod=personinfo'},
        {name: 'linkedin', link: 'http://www.linkedin.com/in/先波-余-8b658695?trk=nav_responsive_tab_profile_pic'},
        {name: 'google', link: 'https://plus.google.com/109007860879929993270'},
        {name: 'stackoverflow', link: 'http://stackoverflow.com/users/5835253/hansneil'},
        {name: 'facebook', link: 'https://www.facebook.com/profile.php?id=100004108532958'}
    ];
    return {
       cvInfo: {
           title: title,
           leftTags: left_tags,
           rightTags: right_tags,
           progressLeft: progressLeft,
           progressRight: progressRight,
           webLink: webLink
       },
       enableClass: function(){
           return true;
       }
    }
});
page.controller('cvController', ['$scope', 'cvInfo', function($scope, cvInfo){
    $scope.cvInfo = cvInfo.cvInfo;
    $scope.click = function(){
        $scope.active = cvInfo.enableClass();
    };
}]);
page.factory('albumInfo', function(){
    var all = [
        {type: "Metasequoia", city: "Shanghai", src: "/img/album/10.jpg"},
        {type: "Droplight", city: "Xiamen", src: "/img/album/9.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/11.jpg"},
        {type: "Cityscape", city: "Cixi", src: "/img/album/14.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/13.jpg"},
        {type: "Lyudao", city: "Taiwan", src: "/img/album/12.jpg"},
        {type: "Clover", city: "Xiamen", src: "/img/album/15.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/16.jpg"}
    ];
    var portrait = [
        {type: "A Man", city: "Kaohsiung", src: "/img/album/17.jpg"},
        {type: "Portrait", city: "Kending", src: "/img/album/18.jpg"},
        {type: "Portrait", city: "Hualien", src: "/img/album/19.jpg"},
        {type: "Portrait", city: "Xiamen", src: "/img/album/20.jpg"},
        {type: "The bartender", city: "Kending", src: "/img/album/21.jpg"},
        {type: "Portrait", city: "Cixi", src: "/img/album/22.jpg"},
        {type: "Portrait", city: "Cixi", src: "/img/album/23.jpg"}
    ];
    var scenery = [
        {type: "Metasequoia", city: "Shanghai", src: "/img/album/10.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/11.jpg"},
        {type: "Cityscape", city: "Cixi", src: "/img/album/14.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/13.jpg"},
        {type: "Library", city: "Shanghai", src: "/img/album/24.jpg"},
        {type: "Cityscape", city: "Shanghai", src: "/img/album/25.jpg"},
        {type: "Sunset", city: "Shanghai", src: "/img/album/26.jpg"}
    ];
    var travel = [
        {type: "Droplight", city: "Xiamen", src: "/img/album/9.jpg"},
        {type: "Jiufen", city: "Taiwan", src: "/img/album/6.jpg"},
        {type: "Building", city: "Xiamen", src: "/img/album/28.jpg"},
        {type: "Clover", city: "Xiamen", src: "/img/album/15.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/16.jpg"},
        {type: "Ocean", city: "Xiamen", src: "/img/album/27.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/29.jpg"},
        {type: "Cityscape", city: "Xiamen", src: "/img/album/30.jpg"},
    ];
    var photography = {
        activeType: "all",
        selectedAlbum: all,
        types:[
            { type: "all", active: true, album: all},
            { type: "portrait", active: false, album: portrait},
            { type: "scenery", active: false, album: scenery},
            { type: "travel", active: false, album: travel}
        ]
    };
    return {
        photography: photography,
        setActive: function (album, albums) {
            var selectedAlbum;
            for (var i in albums){
                if (albums[i].type == album.type) {
                    albums[i].active = true;
                    selectedAlbum = albums[i].album;
                } else {
                    albums[i].active = false;
                }
            }
            return selectedAlbum;
        }
    }
})
page.controller('AlbumController', ['$scope', 'albumInfo', function($scope, albumInfo){
    $scope.photography = albumInfo.photography;

    $scope.chooseAlbum = function (albumType) {
        console.log($scope.photography.selectedAlbum);
        $scope.photography.activeType = albumType.type;
        $scope.photography.selectedAlbum = albumInfo.setActive(albumType, $scope.photography.types);
    }
}]);
page.directive('progressGroup', function(){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.addClass('progress');
        }
    }
});
page.directive('progressBar', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: '/tpls/progress.html',
        scope: {skill: '=', number: '='},
    }
});
page.directive('like', ['$http', '$timeout', function($http, $timeout) {
    return {
        restrict: 'A',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
            var i = 0;
            $element.on('mouseover', function(){
                var url = $attrs.ngSrc;
                var urlArr = url.split('/');
                var photoName = urlArr[urlArr.length - 1];
                var id = photoName.match(/^\d+/);

                $http.get('/photo/'+id)
                    .then(function(resp){
                        $scope.likes = resp.data.likes;
                        $scope.active = resp.data.active;
                    });
            });
            $element.on('dblclick', function(){
                var url = $attrs.ngSrc;
                var urlArr = url.split('/');
                var photoName = urlArr[urlArr.length - 1];
                var id = photoName.match(/^\d+/);

                $http.post('/photo/'+id)
                    .then(function(resp){
                        $scope.likes = resp.data.likes;
                        $scope.active = true;
                    });
            });
            /*$scope.add_like = function($e){
                var url = $attrs.ngSrc;
                var urlArr = url.split('/');
                var photoName = urlArr[urlArr.length - 1];
                var id = photoName.match(/^\d+/);
                $e.preventDefault();

                $http.post('/photo/'+id)
                    .then(function(resp){
                        $scope.likes = resp.data.likes;
                        $scope.active = true;
                    });
            }*/
        }]
    }
}]);
page.directive('mobileClick', ['$http', function($http){
    return {
        restrict: 'A',
        /*transclude: true,
        scope: {source: '@'},*/
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
            $element.on('mousedown', function () {
                var url = $attrs.source;
                var urlArr = url.split('/');
                var photoName = urlArr[urlArr.length - 1];
                var id = photoName.match(/^\d+/);

                $http.post('/photo/'+id)
                    .then(function(resp){
                        console.log(resp.data.likes);
                        $scope.likes = resp.data.likes;
                        $scope.active = true;
                    });
            });
        }]
    }
}])
