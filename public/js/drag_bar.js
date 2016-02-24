/**
 * Created by hansneil on 24/2/16.
 */
angular.module('drag', [])
    .directive('dragBar', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attr){
                var markStart = 0, dist, prevDist = 0;
                console.log(attr.dragBar);
                var eventHandler = function($event) {
                    console.log(attr.dragBar);
                    var markEnd = (attr.dragBar < 752) ? $event.pageY : $event.pageX;
                    var total, pace;
                    if (attr.dragBar < 752) {
                        total = 420;
                        pace = 60;
                    } else {
                        total = 560;
                        pace = 80;
                    }
                    console.log(markEnd);
                    if (markStart) {
                        dist = markEnd - markStart;
                        dist = prevDist + dist;
                        if (dist <= 0) {
                            dist = 0;
                        } else if (dist >= total) {
                            dist = total;
                        }
                        scope.$apply(function(){
                            if (dist > pace * 6) {
                                scope.bar.name = 'XXL';
                            } else if (dist > pace * 5) {
                                scope.bar.name = 'XL';
                            } else if (dist > pace * 4) {
                                scope.bar.name = 'L';
                            } else if (dist > pace * 3) {
                                scope.bar.name = 'M';
                            } else if (dist > pace * 2) {
                                scope.bar.name = 'S';
                            } else if (dist > pace) {
                                scope.bar.name = 'XS';
                            } else {
                                scope.bar.name = 'XXS';
                            }
                        });
                        scope.bar.width = dist + (dist < 0 ? -10 : 10);
                        if (attr.dragBar < 752) {
                            element.css('top', dist + 'px');
                        } else {
                            console.log(dist);
                            element.css('left', dist + 'px');
                        }
                    }
                };
                console.log('aaa');

                element.on('mousedown', function($event){
                    if (attr.dragBar < 752) {
                        markStart = $event.pageY;
                    } else {
                        markStart = $event.pageX;
                    }
                    console.log(markStart);
                    element.bind('mousemove', eventHandler);
                    element.parent().bind('mousemove', eventHandler);
                    element.parent().parent().bind('mousemove', eventHandler);

                });
                scope.$on('status', function(evt){
                    console.log(evt.targetScope.status);
                    if (!evt.targetScope.status) {
                        markStart = 0;
                        prevDist = dist;
                        element.unbind('mousemove');
                        element.parent().unbind('mousemove');
                        element.parent().parent().unbind('mousemove', eventHandler);

                    }
                })
            }
        }
    })
    .directive('dragWrapper', ['$window', function($window){
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                //console.log(element.css('height'));
                scope.status = true;
                $window.onmouseup = function($event){
                    scope.status = false;
                    scope.$broadcast('status', status);
                };
                element.on('mousedown', function($event){
                    scope.status = true;
                    scope.$broadcast('status', status);
                });
            }
        }
    }])
    .directive('dragVis', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var evtHandler = function($event) {
                    if (attr.dragVis < 752) {
                        element.css('height', scope.bar.width + 'px');
                    } else {
                        element.css('width', scope.bar.width + 'px');
                    }
                };

                scope.$on('status', function(evt){
                    if (evt.targetScope.status) {
                        element.parent().bind('mousemove', evtHandler);
                        element.parent().parent().bind('mousemove', evtHandler);
                    }
                });
                element.parent().on('mousemove', evtHandler);
                element.parent().parent().on('mousemove', evtHandler);

            }
        }
    })