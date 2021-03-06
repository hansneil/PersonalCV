/**
 * Created by hansneil on 18/1/16.
 */
angular.module('security', [])
    .provider('security', {
        login: ['security', '$timeout', '$location', function(security, $timeout, $location) {
            console.log('aaa');
            $timeout(function(){
                $location.path('/home');
            }, 1000);
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

angular.module('ownPage', ['ngRoute', 'ngAnimate', 'ui.router', 'security', 'drag', 'call'])
    .config(['$stateProvider', '$urlRouterProvider', 'securityProvider',
        function($stateProvider, $urlRouterProvider, security){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/pages/home.html',
                controller: "homeController"
            })
            .state('cv', {
                url: '/cv',
                templateUrl: '/pages/cv.html',
                controller: "cvController"
            })
            .state('album', {
                abstract: true,
                url: '/album',
                templateUrl: '/pages/album.html',
                controller: 'AlbumController'
            })
            .state('album.all',{
                url: '/all',
                templateUrl: '/pages/photo.html',
                controller: 'PhotoController',
                resolve: {
                    type: function(){
                       return 'all';
                    }
                }
            })
            .state('album.portrait',{
                url: '/portrait',
                templateUrl: '/pages/photo.html',
                controller: 'PhotoController',
                resolve: {
                    type: function(){
                        return 'portrait';
                    }
                }
            })
            .state('album.scenery',{
                url: '/scenery',
                templateUrl: '/pages/photo.html',
                controller: 'PhotoController',
                resolve: {
                    type: function(){
                        return 'scenery';
                    }
                }
            })
            .state('album.travel',{
                url: '/travel',
                templateUrl: '/pages/photo.html',
                controller: 'PhotoController',
                resolve: {
                    type: function(){
                        return 'travel';
                    }
                }
            })
            .state('plugins', {
                abstract: true,
                url: '/plugins',
                templateUrl: '/pages/plugins.html',
            })
            .state('plugins.overview', {
                url: "/overview",
                templateUrl: '/pages/overview.html',
                controller: 'PluginController'
            })
            .state('plugins.show', {
                url: '/slider',
                templateUrl: '/pages/slider.html',
                //controller: 'PluginController'
            })
            .state('plugins.call', {
                url: '/call',
                templateUrl: '/pages/call.html',
                controller: 'CallController'
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '/pages/blog.html',
                controller: 'blogController',
                resolve: {
                    login: security.login,
                    promised: function($q){
                        var deffered = $q.defer();
                        deffered.promise.then(function(){
                            security.login
                        }, function(err){
                            alert('Under Construction');
                        });
                        deffered.resolve('no reason');
                        return deffered.promise;
                    }
                }
            })
            .state('wechat', {
                url: '/wechat',
                templateUrl: '/pages/wechat.html'
            });
        $urlRouterProvider
            .when('/album', '/album/all')
            .otherwise('/home');
    }])
    .config(['cvInfoProvider', function(cvInfoProvider){
        var skill = ['HTML'];
        cvInfoProvider.setTitle('Hansnathan');
        cvInfoProvider.setSkill(skill);
    }])
/*    .factory('cvInfo', function(){
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
    })*/
    .provider('cvInfo', function(){
        var information = {
            title: "Hansneil",
            left_tags: [
                {area: 'Web Design', style: 'web-design'},
                {area: 'Web Develop', style: 'web-develop'}
            ],
            right_tags: [
                {area: 'Flat Design', style: 'flat-design'},
                {area: 'Photoshop', style: 'photoshop'},
                {area: 'Illustrate', style: 'illustrate'},
            ],
            progressLeft: [
                {number: '1', skill: 'HTML5'},
                {number: '2', skill: 'CSS'},
                {number: '3', skill: 'SCSS'},
                {number: '4', skill: 'JavaScript'}
            ],
            progressRight: [
                {number: '5', skill: 'JQuery'},
                {number: '6', skill: 'Bootstrap'},
                {number: '7', skill: 'AngularJS'},
                {number: '8', skill: 'NodeJs'}
            ],
            webLink: [
                {name: 'github', link: 'https://github.com/hansneil'},
                {name: 'weibo', link: 'http://weibo.com/2434892144/profile?rightmod=1&wvr=6&mod=personinfo'},
                {name: 'linkedin', link: 'http://www.linkedin.com/in/先波-余-8b658695?trk=nav_responsive_tab_profile_pic'},
                {name: 'google', link: 'https://plus.google.com/109007860879929993270'},
                {name: 'stackoverflow', link: 'http://stackoverflow.com/users/5835253/hansneil'},
                {name: 'facebook', link: 'https://www.facebook.com/profile.php?id=100004108532958'}
            ]
        };

        return {
            setTitle: function(title) {
                information.title = title || information.title;
            },
            setSkill: function(skill) {
                console.log(skill);
                if (skill && skill.length <= 4) {
                    for (var i = 0; i < skill.length; i++) {
                        information.progressLeft[i].skill = skill[i].toUpperCase() || information.progressLeft[i].skill;
                    }
                } else {
                    for (var i = 0; i < 4; i++) {
                        information.progressLeft[i].skill = skill[i].toUpperCase() || information.progressLeft[i].skill;
                    }
                    for (var i = 4; i < skill.length; i++) {
                        information.progressRight[i - 4].skill = skill[i].toUpperCase() || information.progressRight[i - 4].skill;
                    }
                }
            },
            $get: function(){
                return {
                    cvInfo: {
                        title: information.title,
                        leftTags: information.left_tags,
                        rightTags: information.right_tags,
                        progressLeft: information.progressLeft,
                        progressRight: information.progressRight,
                        webLink: information.webLink
                    },
                    enableClass: function(){
                        return true;
                    }
                }
            }
        }
    })
    .factory('albumInfo', function(){
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
            setActive: function (albumType, albums) {
                var selectedAlbum;
                for (var i in albums){
                    if (albums[i].type == albumType) {
                        albums[i].active = true;
                        selectedAlbum = albums[i].album;
                    } else {
                        albums[i].active = false;
                    }
                }
                return selectedAlbum;
            },
            get: function(type){
                var allTypes = photography.types;
                for (var i in allTypes){
                    if (allTypes[i].type == type) {
                        return allTypes[i].album;
                    }
                }
            }
        }
    })
    .factory('pluginsUrl', function(){
        var plugins = [
            { name: "24-Point", url: "#/plugins/call", desp: "Calculate 24 using the selected 4 numbers"},
            { name: "Space Craft", url: "http://hansneil.github.io/baidu_ife/2-26/index.html", desp: "A game which the commander controls the crafts"},
            { name: "Transition Editor", url: "http://hansneil.github.io/plugin/transition/index.html", desp: "An online CSS transition editor"}
        ];
        return {
            plugins: plugins
        }
    })
    .controller('homeController', ['$scope', '$location', '$window', function($scope, $location, $window){
        $scope.show = $window.innerWidth > 752;
        $scope.isShown = false;
        $window.onresize = function(){
            $scope.$apply(function(){
                $scope.show = $window.innerWidth > 752;
            })
        };
    }])
    .controller('cvController', ['$scope', 'cvInfo', function($scope, cvInfo){
        $scope.cvInfo = cvInfo.cvInfo;
        $scope.click = function(){
            $scope.active = cvInfo.enableClass();
        };
    }])
    .controller('AlbumController', ['$scope', 'albumInfo', function($scope, albumInfo){
        $scope.photography = albumInfo.photography;
    }])
    .controller('PhotoController', ['$scope', 'albumInfo', 'type', function($scope, albumInfo, type){
        $scope.photography.selectedAlbum = albumInfo.setActive(type, $scope.photography.types);
        $scope.photography.activeType = type;
    }])
    .controller('backController', ['$scope', '$http', '$location', 'albumInfo',
        function($scope, $http, $location, albumInfo){
            $http.get('/newpage').then(function(resp){
                var selectedAlbum = albumInfo.get(resp.data.type),
                    selectedPhoto = selectedAlbum[resp.data.id];
                $scope.photo = selectedPhoto;
                $scope.resp = {
                    type: resp.data.type,
                    id: resp.data.id,
                    length: selectedAlbum.length
                }
            });

    }])
    .controller('PluginController', ['$scope', 'pluginsUrl', function($scope, pluginsUrl){
        $scope.pluginsUrl = pluginsUrl.plugins;
    }])
    .controller('blogController', ['$scope', '$timeout', function($scope, $timeout){
        $scope.alternative = {
            text: 'Coming soon...'
        };
        $timeout(function(){
            $scope.alternative.text = 'Redirect...';
        }, 700);
    }])
    .directive('progressGroup', function(){
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.addClass('progress');
            }
        }
    })
    .directive('progressBar', function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: '/tpls/progress.html',
            scope: {skill: '=', number: '='},
        }
    })
    .directive('like', ['$http', '$timeout', function($http, $timeout) {
        return {
            restrict: 'A',
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                var i = 0;
                $element.on('mouseover', function(){
                    var url = $attrs.ngSrc;
                    var urlArr = url.split('/');
                    var photoName = urlArr[urlArr.length - 1];
                    var id = photoName.match(/^\d+/);
                    $scope.id = id.toString();

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
            }]
        }
    }])
    .directive('mobileClick', ['$http', function($http){
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
                    console.log('post');
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
    .directive('prevPhoto', ['$location', 'albumInfo', function($location){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                element.on('click', function(){
                    var id = scope.resp.id - 1;
                    var resp = scope.resp.type + id.toString();
                    var url = '/comment/' + resp;
                    if (id >= 0) {
                        element.attr('href', url);
                    } else {
                        element.addClass('forbid');
                        element.parent().addClass('forbid');
                    }
                });
            }
        }
    }])
    .directive('nextPhoto', ['$location', function($location){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                element.on('click', function(){
                    var id = scope.resp.id + 1;
                    var resp = scope.resp.type + id.toString();
                    var url = '/comment/' + resp;
                    if (id <= scope.resp.length - 1) {
                        element.attr('href', url);
                    } else {
                        element.addClass('forbid');
                        element.parent().addClass('forbid');
                    }
                });
            }
        }
    }])
    .directive('pluginDir', function(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: "/tpls/plugin.html",
            scope: {
                url: "=",
                order: "=",
                desp: "="
            }
        }
    })
    .controller('DragController', ['$scope', '$window', function($scope, $window){
        $scope.bar = {
            width: 0,
            name: 'XXS',
            nameList: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
        };
        $scope.active = false;
        $scope.width = $window.innerWidth;
        $window.onresize = function($event){
            $scope.resize = true;
            $scope.$broadcast('resize', $scope.resize);
        }
    }]);

