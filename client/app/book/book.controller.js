/**
 * Created by shihao on 16/12/14.
 */

(function () {
    'use strict';
    angular.module('app.book', []);
    angular.module('app.book')
        .controller('BookCtrl', ['$scope', 'APIConfig', '$rootScope', '$location', function ($scope, APIConfig, $rootScope, $location) {

            $scope.books = [];
            $scope.conditions = {
                bookName: '',
                bookIsbn: ''
            };

            $scope.loadBooks = function () {
                APIConfig.ajax('/book/findAll', "POST", $scope.conditions, function (res) {
                    if (res && res.responseCode == 0) {
                        $scope.books = res.data;
                    } else {
                        APIConfig.errorAlert("查询书籍失败,请检查网络");
                    }
                }, function (res) {
                    APIConfig.errorAlert("查询书籍失败,请检查网络");
                });
            };

            $scope.goEditBook = function (book) {
                $rootScope.currEditBook = book;
                $location.path('/book/bookEdit');
            };

            $scope.loadBooks();

        }])
        .controller('BookEditController', ['$scope', 'APIConfig', '$rootScope', function ($scope, APIConfig, $rootScope) {
            $scope.book = $rootScope.currEditBook;
            $scope.saveBook = function () {
                $scope.book.id = $scope.book.bookId;
                $scope.book.bookAuthor = $scope.book.authorName;
                APIConfig.ajax('/book/update', 'POST', $scope.book, function (res) {
                    if (res && res.responseCode == 0) {
                        APIConfig.successAlert("保存成功");
                    } else if (res && res.responseMsg) {
                        APIConfig.errorAlert(res.responseMsg);
                    } else {
                        APIConfig.errorAlert("保存失败,请检查网络设置");
                    }
                }, function (res) {
                    APIConfig.errorAlert("保存失败,请检查网络设置");
                });
            };
        }])
    ;
})();
