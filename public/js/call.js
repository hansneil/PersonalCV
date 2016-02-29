/**
 * Created by hansneil on 24/2/16.
 */
angular.module('call', [])
    .factory('viewList', function(){
        var views = {
            views: [
                {number: 1, active: false, checkActive: false, shadowActive: false},
                {number: 2, active: false, checkActive: false, shadowActive: false},
                {number: 3, active: false, checkActive: false, shadowActive: false},
                {number: 4, active: false, checkActive: false, shadowActive: false},
                {number: 5, active: false, checkActive: false, shadowActive: false},
                {number: 6, active: false, checkActive: false, shadowActive: false},
                {number: 7, active: false, checkActive: false, shadowActive: false},
                {number: 8, active: false, checkActive: false, shadowActive: false},
                {number: 9, active: false, checkActive: false, shadowActive: false}
            ],
            trueCount: 0,
            selectedNumber: [],
            completed: false,
            result: '',
            passed: false,
            times: 0,
            msg: ''
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
        var hideViews = function(list) {
            for (var i in list.views) {
                list.views[i].active = false;
            }
            list.trueCount = 0;
        };
        var showViews = function(list) {
            for (var i in list.views) {
                list.views[i].checkActive = false;
            }
        };
        var setActive = function(index, list) {
            list.views[index].active = true;
            list.selectedNumber.push(list.views[index]);
        } ;
        var removeActive = function(index, list) {
            list.views[index].active = false;
            list.trueCount -= 1;
            for (var i in list.selectedNumber) {
                if (list.selectedNumber[i].number
                        == list.views[index].number) {
                    list.selectedNumber.splice(i, 1);
                    console.log(list.selectedNumber);
                }
            }
        };
        var complete = function() {
            views.completed = true;
            views.trueCount = 0;
            hideViews(views);
        };
        return {
            views: views,
            changeViews: changeViews,
            hideViews: hideViews,
            showViews: showViews,
            setActive: setActive,
            removeActive: removeActive,
            complete: complete
        }
    })
    .controller('CallController', ['$scope', 'viewList', '$timeout', '$location', function($scope, viewList, $timeout, $location){
        $scope.list = viewList.views;
        $scope.select = function(index) {
            if (!$scope.list.views[index].active) {
                $scope.list.trueCount += 1;
                if ($scope.list.passed) {
                    $scope.list.passed = false;
                }
                if ($scope.list.trueCount > 4) {
                    viewList.hideViews($scope.list);
                    $scope.list.selectedNumber = [];
                } else {
                    viewList.setActive(index, $scope.list);
                }
            } else {
                viewList.removeActive(index, $scope.list);
            }
        };
        $scope.complete = viewList.complete;
        $scope.redirectHome = function(){
            $scope.list.trueCount = 0;
            $scope.list.selectedNumber = [];
            $scope.list.completed = false;
            $scope.list.result = '';
            $scope.list.passed = false;
            $scope.list.times = 0;
            $location.path('/home');
        };
        console.log($location.path());
        $scope.calc = function(){
            var expr = $scope.list.result,
                regExp = /(\d).+(\d).+(\d).+(\d)/;
                /*regExp = /(\d)[\(\)\+\-\*\/]+(\d)[\(\)\+\-\*\/]+(\d)[\(\)\+\-\*\/]+(\d)/;*/
            var matchRes = expr ? expr.match(regExp) : [];
            var arr = (matchRes && matchRes.length == 5) ? [matchRes[1], matchRes[2], matchRes[3], matchRes[4]] : [];
            var comparedArr = [];
            console.log(arr);
            $scope.list.msg = '';
            for (var i in $scope.list.selectedNumber) {
                comparedArr[i] = $scope.list.selectedNumber[i].number;
            }
            for (var i in arr) {
                for (var j = 0; j < comparedArr.length; j++) {
                    if (arr[i] == comparedArr[j]) {
                        comparedArr.splice(j, 1);
                        break;
                    }
                }
            }
            if (!comparedArr.length) {
                console.log('right');
                //这里首先说明输入了所选的四个数,至于表达式是否合法需要交给$eval判断,如果不合法会触发调用异常
                //这时用过try...catch来捕获异常
                try {
                    if ($scope.$eval(expr) == 24) {
                        $scope.list.passed = true;
                        $scope.list.trueCount = 0;
                        $scope.chooseView = $scope.list.selectedNumber[0].number;
                        $scope.list.selectedNumber = [];
                        $scope.list.completed = false;
                        $scope.list.result = '';
                        $scope.list.times += 1;
                    } else {
                        $scope.list.result = '';
                        $scope.list.msg = 'wrong answer, please try again';
                    }
                } catch(ex) {
                    $scope.list.msg = "an illegal expression, please input a valid one";
                    $scope.list.result = '';
                }
            } else {
                $scope.list.result = '';
                $scope.list.msg = 'please use the selected 4 numbers to get 24';
            }
        }
    }]);