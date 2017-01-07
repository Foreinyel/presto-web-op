/**
 * Created by shihao on 16/12/13.
 */

(function () {
    'use strict';
    angular.module('app.plantBook', []);
    angular.module('app.plantBook')
        .controller('ReqsController', ['$scope', 'APIConfig', '$location', '$rootScope', function ($scope, APIConfig, $location, $rootScope) {

            $scope.reqs = [];

            $scope.loadNewReqs = function () {
                APIConfig.ajax('plantBook/listAllNewReqs', 'GET', {}, function (res) {
                    $scope.reqs = res.data;
                }, function (res) {
                    APIConfig.errorAlert("网络异常,请稍后再试");
                });
            };

            $scope.approval = function (req) {
                APIConfig.ajax('plantBook/reqApproval', 'GET', {reqId: req.id}, function (res) {
                    console.log(res);
                    $scope.reqs = res.data;
                    APIConfig.successAlert("申请已通过");
                    $scope.loadNewReqs();
                }, function (res) {
                    APIConfig.errorAlert("网络异常,请稍后再试");
                });
            };

            $scope.reject = function (req) {
                APIConfig.ajax('plantBook/reqReject', 'GET', {reqId: req.id}, function (res) {
                    console.log(res);
                    $scope.reqs = res.data;
                    APIConfig.successAlert("申请已拒绝");
                    $scope.loadNewReqs();
                }, function (res) {
                    APIConfig.errorAlert("网络异常,请稍后再试");
                });
            };

            $scope.goEditReq = function (req) {
                $rootScope.plantBookEditReq = req;
                $location.path('/book/reqEdit');
            };

            $scope.loadNewReqs();

        }])

        .controller('ReqEditCtrl', ['$scope', 'APIConfig', '$rootScope', function ($scope, APIConfig, $rootScope) {

            $scope.req = $rootScope.plantBookEditReq;
            $scope.saveReq = function () {
                APIConfig.ajax('/plantBook/updateReq', 'POST', $scope.req, function (res) {
                    if (res && res.responseCode == 0) {
                        APIConfig.successAlert("保存成功");
                    } else if (res && res.responseMsg) {
                        APIConfig.errorAlert(es.responseMsg);
                    } else {
                        APIConfig.errorAlert("保存失败,请稍后再试");
                    }

                }, function (res) {
                    APIConfig.errorAlert("保存失败,请稍后再试");
                });
            };
        }])
    ;
})();
