(function (angular) {
    'use strict';

    describe('paPackery directive', function () {
        var $compile;
        var $scope;

        beforeEach(function () {
            module('packery-angular');
            angular.mock.inject([
                '$compile',
                '$rootScope',
                function (_$compile_, $rootScope) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                }
            ]);
        });

        it('should not be used as an element directive', function () {
            var element;
            var controller;

            element = $compile('<pa-packery></pa-packery>')($scope);
            $scope.$digest();
            expect(element[0].outerHTML).toBe('<pa-packery class="ng-scope"></pa-packery>');

            controller = element.controller('paPackery');
            expect(controller).toBeUndefined();
        });

        it('should be used as an attribute directive', function () {
            var element;
            var controller;

            element = $compile('<div pa-packery></div>')($scope);
            $scope.$digest();
            expect(element[0].outerHTML).toBe('<div pa-packery="" class="ng-scope ng-isolate-scope"></div>');

            controller = element.controller('paPackery');
            expect(controller).toBeDefined();
        });

        it('should be pass the packery options to the isolate scope', function () {
            var element;
            var scope;

            $scope.options = 'test options';
            element = $compile('<div pa-packery="options"></div>')($scope);
            $scope.$digest();

            scope = element.isolateScope();
            expect(scope.packery).toBe('test options');

            $scope.options = 'test new options';
            expect(scope.packery).toBe('test options');

            $scope.$digest();
            expect(scope.packery).toBe('test new options');
        });
    });
}(window.angular));
