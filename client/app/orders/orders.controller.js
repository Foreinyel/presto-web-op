/**
 * Created by shihao on 16/12/15.
 */

(function () {
    'use strict';

    angular.module('app.order', []);
    angular.module('app.order')
        .controller('OrdersCtrl', ['$scope', 'APIConfig', 'appConfig', '$uibModal', '$location', '$rootScope', function ($scope, APIConfig, appConfig, $uibModal, $location, $rootScope) {
            $scope.orders = [];
            $scope.orderStatusObj = [];
            for (var o in appConfig.orderStatus) {
                var obj = {
                    code: o,
                    codeValue: appConfig.orderStatus[o]
                };
                $scope.orderStatusObj.push(obj);
            }
            $scope.conditions = {
                status: null
            };
            $scope.loadOrders = function () {
                APIConfig.ajax('/order/list', 'POST', $scope.conditions, function (res) {
                    if (res && res.responseCode == 0) {
                        $scope.orders = res.data;
                        angular.forEach($scope.orders, function (order) {
                            order.statusDesc = appConfig.orderStatus[order.status];
                            order.orderDateDesc = new Date(order.orderDate).toLocaleDateString();
                        });
                    } else {
                        APIConfig.errorAlert("查询订单失败,请检查网络");
                    }
                }, function (res) {
                    APIConfig.errorAlert("查询订单失败,请检查网络");
                });
            };

            $scope.openOrderDetail = function (order) {
                var modalInstance = $uibModal.open({
                    templateUrl: "orderDetail.html",
                    controller: 'OrderDetailCtrl',
                    resolve: {
                        order: function () {
                            return order;
                        }
                    }
                });
                modalInstance.result.then((function (selectedItems) {
                }), function () {
                    console.log("Modal dismissed at: " + new Date());
                });
            };

            $scope.loadOrders();


            $scope.goSend = function (order) {
                $rootScope.currOrder = order;
                $location.path('/orders/sendOrder');
            };

            $scope.confirmSendDone = function (order) {
                APIConfig.confirmAlert("确认送达吗?", function () {
                    APIConfig.ajax('/order/sendDone', 'GET', {orderId: order.id}, function (res) {
                        if (res && res.responseCode == 0) {
                            APIConfig.successAlert("确认送达");
                            $scope.loadOrders();
                        } else if (res && res.responseMsg) {
                            APIConfig.errorAlert(res.responseMsg);
                        } else {
                            APIConfig.errorAlert("确认送达失败,请检查网络");
                        }

                    }, function (res) {
                        APIConfig.errorAlert("确认送达失败,请检查网络");
                    });
                });
            };
        }])
        .controller("OrderDetailCtrl", ['$scope', 'APIConfig', '$uibModalInstance', 'order', function ($scope, APIConfig, $uibModalInstance, order) {
            $scope.order = order;
        }])
        //配送
        .controller('SendOrderCtrl', ['$scope', 'APIConfig', '$rootScope', function ($scope, APIConfig, $rootScope) {

            $scope.order = $rootScope.currOrder;

            $scope.sendBook = function () {
                APIConfig.ajax('order/send', 'POST', $scope.order, function (res) {
                    if (res && res.responseCode == 0) {
                        APIConfig.successAlert('订单已配送');
                    } else if (res && res.responseMSg) {
                        APIConfig.errorAlert(res.responseMSg);
                    } else {
                        APIConfig.errorAlert("订单配送失败,请检查网络");
                    }
                }, function (res) {
                    APIConfig.errorAlert("订单配送失败,请检查网络");
                });
            };
        }])

})();
