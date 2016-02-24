/**
 * Created by hansneil on 24/2/16.
 */
angular.module('call', [])
    .factory('viewList', function(){
        var views = {
            views: [
                {number: 1, active: true, checkActive: false},
                {number: 2, active: false, checkActive: false},
                {number: 3, active: false, checkActive: false},
                {number: 4, active: false, checkActive: false},
                {number: 5, active: false, checkActive: false},
                {number: 6, active: false, checkActive: false},
                {number: 7, active: false, checkActive: false},
                {number: 8, active: false, checkActive: false},
                {number: 9, active: false, checkActive: false}
            ]
        };
        var changeViews = function(index, list){
            console.log(index);
            for (var i in list.views) {
                if (index == i) {
                    console.log(list.views[i]);
                    list.views[i].active = true;
                } else {
                    list.views[i].active = false;
                }
            }
        };
        var hideViews = function(index, list) {
            for (var i in list.views) {
                if (index != i) {
                    list.views[i].checkActive = true;
                }
            }
        };
        var showViews = function(list) {
            for (var i in list.views) {
                list.views[i].checkActive = false;
            }
        };
        return {
            views: views,
            changeViews: changeViews,
            hideViews: hideViews,
            showViews: showViews
        }
    })
    .controller('CallController', ['$scope', 'viewList', function($scope, viewList){
        $scope.list = viewList.views;
        $scope.change = function(index) {
            if ($scope.list.views[index].active) {
                if (index - 1 >= 0 && $scope.list.views[index-1].checkActive) {
                    viewList.showViews($scope.list);
                } else if (index + 1 <= 8 && $scope.list.views[index+1].checkActive) {
                    viewList.showViews($scope.list);
                } else {
                    viewList.hideViews(index, $scope.list);
                }
            } else {
                viewList.changeViews(index, $scope.list);
            }
        }
    }]);