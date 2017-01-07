(function () {
    'use strict';
    angular.module('service', []);
    angular.module('service').service('APIConfig', ['$http', '$timeout', function ($http, $timeout) {
        return {
            path: function (resource) {
                return 'http://120.76.52.196:6666/' + resource;
                //return 'http://localhost:6666/' + resource;
            },
            ajax: function (url, type, params, callback, errback) {
                var promise = null;
                if (type.length === 4) {
                    promise = $http({
                        method: type,
                        url: this.path(url),
                        data: params,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        cache: false,
                        timeout: 12000,
                        withCredetials: false
                    });
                } else {
                    promise = $http({
                        method: type,
                        url: this.path(url),
                        params: params,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        cache: false,
                        timeout: 12000,
                        withCredetials: false
                    });
                }
                promise.success(function (data) {
                    if (data.responseCode === 0) {
                        callback(data);
                    } else {
                        //alert(data.responseMsg + url);
                        swal({
                            title: "惜阅运营系统",
                            text: data.responseMsg,
                            type: "error",
                            confirmButtonText: "确定"
                        });

                        if (errback != null && errback != undefined) {
                            errback();
                        }
                    }
                });
                promise.error(function (msg) {
                    if (msg === null) {
                        //alert('网络出现异常，请检查你的网络');
                        swal({
                            title: "惜阅运营系统",
                            text: '网络出现异常，请检查你的网络',
                            type: "error",
                            confirmButtonText: "确定"
                        });
                    } else {
                        swal({
                            title: "惜阅运营系统",
                            text: msg + url,
                            type: "error",
                            confirmButtonText: "确定"
                        });
                    }
                    if (errback != null && errback != undefined) {
                        errback();
                    }
                });

            },
            errorAlert: function (text) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "error",
                    confirmButtonText: "确定"
                });
            },
            successAlert: function (text) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "success",
                    confirmButtonText: "确定"
                });
            },
            warningAlert: function (text) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "warning",
                    confirmButtonText: "确定"
                });
            },
            timerAlert: function (text) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "success",
                    timer: 2000,
                    confirmButtonText: "确定"
                });
            },
            successAlertCallBack: function (text, callback) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "success",
                    confirmButtonText: "确定"
                }, function () {
                    callback();
                });
            },
            confirmAlert: function (text, callback) {
                swal({
                    title: "惜阅运营系统",
                    text: text,
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    cancelButtonText: '取消',
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ec6c62"
                }, function () {
                    callback();
                });
            },
            promptAlert: function (callback) {
                swal({
                    title: "惜阅运营系统",
                    text: "这里可以输入并确认:",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    cancelButtonText: '取消',
                    inputPlaceholder: "填写你需要输入的内容"
                }, function (inputValue) {
                    if (inputValue === false)
                        return false;
                    if (inputValue === "") {
                        swal.showInputError("请输入!");
                        return false
                    }
                    callback(inputValue);
                    //swal("棒极了!", "您填写的是: " + inputValue, "success");
                });
            }
        };
    }]);
})();
