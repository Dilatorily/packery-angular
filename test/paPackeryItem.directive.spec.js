(function (angular) {
    'use strict';

    describe('paPackeryItem directive', function () {
        var $compile;
        var $scope;
        var $timeout;

        beforeEach(function () {
            module('packery-angular');
            angular.mock.inject([
                '$compile',
                '$rootScope',
                '$timeout',
                function (_$compile_, $rootScope, _$timeout_) {
                    $compile = _$compile_;
                    $scope = $rootScope.$new();
                    $timeout = _$timeout_;
                }
            ]);
        });

        it('should not work standalone', function () {
            var element;

            try {
                element = $compile('<pa-packery-item></pa-packery-item>')($scope);
            } catch (error) {
                expect(error).toBeDefined();
            }

            expect(element).toBeUndefined();
        });

        it('should require the paPackery directive', function () {
            var element;

            try {
                element = $compile('<pa-packery><pa-packery-item></pa-packery-item></pa-packery>')($scope);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(element).toBeDefined();
        });

        it('should work as an element directive', function () {
            var element;

            try {
                element = $compile('<pa-packery><pa-packery-item></pa-packery-item></pa-packery>')($scope);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(element).toBeDefined();
        });

        it('should work as an attribute directive', function () {
            var element;

            try {
                element = $compile('<pa-packery><div pa-packery-item></div></pa-packery>')($scope);
            } catch (error) {
                expect(error).toBeUndefined();
            }

            expect(element).toBeDefined();
        });

        it('should add the packery item to the paPackery controller if the packery is initialized', function () {
            var element;
            var controller;

            $scope.toggle = false;
            element = $compile('<pa-packery><pa-packery-item ng-if="toggle"></pa-packery-item></pa-packery>')($scope);
            $scope.$digest();
            controller = element.controller('paPackery');
            expect(controller.packery).toBeUndefined();

            $timeout.flush();
            expect(controller.packery).toBeDefined();

            spyOn(controller, 'add');
            $scope.toggle = true;
            expect(controller.add).not.toHaveBeenCalled();

            $scope.$digest();
            expect(controller.add).toHaveBeenCalled();
            expect(controller.add).toHaveBeenCalledWith(element.children()[0]);
        });

        it('should not add the packery item to the paPackery controller if the packery is not initialized', function () {
            var element;
            var controller;

            $scope.toggle = false;
            element = $compile('<pa-packery><pa-packery-item ng-if="toggle"></pa-packery-item></pa-packery>')($scope);
            $scope.$digest();
            controller = element.controller('paPackery');
            expect(controller.packery).toBeUndefined();

            spyOn(controller, 'add');
            $scope.toggle = true;
            expect(controller.add).not.toHaveBeenCalled();

            $scope.$digest();
            expect(controller.add).not.toHaveBeenCalled();
        });

        it('should remove the packery item from the paPackery controller when the $destroy event is fired', function () {
            var element;
            var controller;

            element = $compile('<pa-packery><pa-packery-item></pa-packery-item></pa-packery>')($scope);
            $scope.$digest();
            controller = element.controller('paPackery');

            spyOn(controller, 'remove');
            $scope.$broadcast('$destroy');
            expect(controller.remove).toHaveBeenCalledWith(element.children()[0]);
        });
    });
}(window.angular));
