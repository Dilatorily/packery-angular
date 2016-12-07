(function () {
    'use strict';

    angular.module('app', ['packery-angular'])
        .controller('AppController', ['$scope', '$timeout', function ($scope, $timeout) {
            var colors = ['red', 'green', 'blue'];

            $scope.items = [];
            $scope.options = {
                columnWidth: 100,
                isDraggable: true,
                itemSelector: '.pa-item',
                containerStyle: {
                    position: 'relative',
                    display: 'block',
                    border: '1px solid grey',
                    'min-height': '200px'
                }
            };

            for (var i = 0; i < 10; ++i) {
                addItem({
                    content: 'This is box #' + i + '.',
                    style: {
                        display: 'inline-block',
                        width: (100 * ((i % 3) + 1)) + 'px',
                        height: (100 * (((i + 2) % 3) + 1)) + 'px',
                        'background-color': colors[i % 3],
                        color: colors[(i + 1) % 3]
                    }
                }, i * 1000);
            }

            function addItem (item, delay) {
                $timeout(function () {
                    $scope.items.push(item);
                }, delay);
            }
        }]);
})();
