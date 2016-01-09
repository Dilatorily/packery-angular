(function (angular) {
    'use strict';

    describe('paPackery controller', function () {
        var $controller;
        var $scope;
        var $element;
        var $timeout;
        var $paEvents;
        var controller;

        beforeEach(function () {
            module('packery-angular');
            angular.mock.inject([
                '$controller',
                '$rootScope',
                '$timeout',
                '$paEvents',
                function (_$controller_, $rootScope, _$timeout_, _$paEvents_) {
                    $controller = _$controller_;
                    $scope = $rootScope.$new();
                    $element = [
                        {
                            children: [
                                'test child 1',
                                'test child 2',
                                'test child 3'
                            ]
                        }
                    ];
                    $timeout = _$timeout_;
                    $paEvents = _$paEvents_;
                }
            ]);
        });

        it('should have default options', function () {
            expect($scope.packery).toBeUndefined();
            expect($scope.options).toBeUndefined();
            expect($scope.isAppended).toBeUndefined();
            expect($scope.draggabilly).toBeUndefined();

            controller = $controller('paPackery', {
                $element: $element,
                $scope: $scope
            });
            expect($scope.packery).toBeUndefined();
            expect($scope.options).toBeDefined();
            expect($scope.options).toEqual({
                columnWidth: 1,
                itemSelector: '.pa-item',
                percentPosition: false,
                rowHeight: 1,
                stamp: '.pa-stamp'
            });
            expect($scope.isAppended).toBeDefined();
            expect($scope.isAppended).toBe(true);
            expect($scope.draggabilly).toBeDefined();
            expect($scope.draggabilly).toEqual({
                dragSelector: '',
                isDraggable: true
            });
        });

        it('should overwrite the default options', function () {
            $scope.packery = {
                columnWidth: 2,
                dragSelector: 'test drag selector',
                isAppended: false,
                isDraggable: false,
                itemSelector: 'test item selector',
                percentPosition: true,
                rowHeight: 1000,
                stamp: 'test stamp'
            };
            expect($scope.options).toBeUndefined();
            expect($scope.isAppended).toBeUndefined();
            expect($scope.draggabilly).toBeUndefined();

            controller = $controller('paPackery', {
                $element: $element,
                $scope: $scope
            });
            expect($scope.options).toBeDefined();
            expect($scope.options).toEqual({
                columnWidth: 2,
                itemSelector: 'test item selector',
                percentPosition: true,
                rowHeight: 1000,
                stamp: 'test stamp'
            });
            expect($scope.isAppended).toBeDefined();
            expect($scope.isAppended).toBe(false);
            expect($scope.draggabilly).toBeDefined();
            expect($scope.draggabilly).toEqual({
                dragSelector: 'test drag selector',
                isDraggable: false
            });
        });

        it('should not overwrite the optional options', function () {
            $scope.packery = {
                foo: 'bar'
            };
            expect($scope.options).toBeUndefined();
            expect($scope.isAppended).toBeUndefined();
            expect($scope.draggabilly).toBeUndefined();

            controller = $controller('paPackery', {
                $element: $element,
                $scope: $scope
            });
            expect($scope.options).toBeDefined();
            expect($scope.options).toEqual({
                columnWidth: 1,
                foo: 'bar',
                itemSelector: '.pa-item',
                percentPosition: false,
                rowHeight: 1,
                stamp: '.pa-stamp'
            });
            expect($scope.isAppended).toBeDefined();
            expect($scope.isAppended).toBe(true);
            expect($scope.draggabilly).toBeDefined();
            expect($scope.draggabilly).toEqual({
                dragSelector: '',
                isDraggable: true
            });
        });

        describe('after a successful initialization', function () {
            var mockedDate;
            var Packery;
            var Draggabilly;
            var bindDraggabillyEvents;
            var on;
            var packeryEvent;
            var packeryCallback;

            beforeEach(function () {
                bindDraggabillyEvents = jasmine.createSpy('packery.bindDraggabillyEvents');
                on = jasmine.createSpy('packery.on');

                Packery = spyOn(window, 'Packery').and.callFake(function () {
                    this.on = on;
                    this.bindDraggabillyEvents = bindDraggabillyEvents;
                    this.destroy = jasmine.createSpy('packery.destroy');
                    this.appended = jasmine.createSpy('packery.appended');
                    this.prepended = jasmine.createSpy('packery.prepended');
                    this.remove = jasmine.createSpy('packery.remove');
                    this.layout = jasmine.createSpy('packery.layout');
                });

                Draggabilly = spyOn(window, 'Draggabilly').and.callFake(function () {});

                mockedDate = new Date(2016, 1, 1);
                jasmine.clock().install();
                jasmine.clock().mockDate(mockedDate);

                $scope.packery = { dragSelector: 'test drag selector' };

                controller = $controller('paPackery', {
                    $element: $element,
                    $scope: $scope,
                    Draggabilly: Draggabilly,
                    Packery: Packery
                });
            });

            afterEach(function () {
                jasmine.clock().uninstall();
            });

            it('should initialize a draggable Packery instance', function () {
                $scope.draggabilly.isDraggable = true;
                $scope.$on($paEvents.INITIALIZED, function (event, hash, packery) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toBe(controller.packery);
                });

                $timeout.flush();
                expect(window.Packery).toHaveBeenCalledWith($element[0], $scope.options);
                expect(Draggabilly).toHaveBeenCalled();
                expect(Draggabilly.calls.count()).toBe(3);
                expect(Draggabilly).toHaveBeenCalledWith('test child 1', { handle: 'test drag selector' });
                expect(Draggabilly).toHaveBeenCalledWith('test child 2', { handle: 'test drag selector' });
                expect(Draggabilly).toHaveBeenCalledWith('test child 3', { handle: 'test drag selector' });
                expect(bindDraggabillyEvents).toHaveBeenCalled();
                expect(bindDraggabillyEvents.calls.count()).toBe(3);
            });

            it('should initialize a non-draggable Packery instance', function () {
                $scope.draggabilly.isDraggable = false;
                $scope.$on($paEvents.INITIALIZED, function (event, hash, packery) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toEqual(controller.packery);
                });

                $timeout.flush();
                expect(window.Packery).toHaveBeenCalledWith($element[0], $scope.options);
                expect(Draggabilly).not.toHaveBeenCalled();
                expect(bindDraggabillyEvents).not.toHaveBeenCalled();
            });

            it('should listen for a Packery layoutComplete event', function () {
                on.and.callFake(function (event, callback) {
                    if (event === $paEvents.PACKERY.LAYOUT_COMPLETED) {
                        packeryEvent = event;
                        packeryCallback = callback;
                    }
                });

                $timeout.flush();
                expect(on).toHaveBeenCalledWith($paEvents.PACKERY.LAYOUT_COMPLETED, packeryCallback);

                $scope.$on($paEvents.LAYOUT_COMPLETED, function (event, hash, packery, items) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toBe(controller.packery);
                    expect(items).toBe('test items');
                });
                packeryCallback('test items');
            });

            it('should listen for a Packery dragItemPositioned event', function () {
                on.and.callFake(function (event, callback) {
                    if (event === $paEvents.PACKERY.DRAGGED) {
                        packeryEvent = event;
                        packeryCallback = callback;
                    }
                });

                $timeout.flush();
                expect(on).toHaveBeenCalledWith($paEvents.PACKERY.DRAGGED, packeryCallback);

                $scope.$on($paEvents.DRAGGED, function (event, hash, packery, items) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toBe(controller.packery);
                    expect(items).toBe('test item');
                });
                packeryCallback('test item');
            });

            it('should listen for a Packery fitComplete event', function () {
                on.and.callFake(function (event, callback) {
                    if (event === $paEvents.PACKERY.FITTED) {
                        packeryEvent = event;
                        packeryCallback = callback;
                    }
                });

                $timeout.flush();
                expect(on).toHaveBeenCalledWith($paEvents.PACKERY.FITTED, packeryCallback);

                $scope.$on($paEvents.FITTED, function (event, hash, packery, items) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toBe(controller.packery);
                    expect(items).toBe('test item');
                });
                packeryCallback('test item');
            });

            it('should listen for a Packery removeComplete event', function () {
                on.and.callFake(function (event, callback) {
                    if (event === $paEvents.PACKERY.REMOVED) {
                        packeryEvent = event;
                        packeryCallback = callback;
                    }
                });

                $timeout.flush();
                expect(on).toHaveBeenCalledWith($paEvents.PACKERY.REMOVED, packeryCallback);

                $scope.$on($paEvents.REMOVED, function (event, hash, packery, items) {
                    expect(hash).toEqual(mockedDate.getTime());
                    expect(packery).toBe(controller.packery);
                    expect(items).toBe('test items');
                });
                packeryCallback('test items');
            });

            describe('and a successful Packery initialization', function () {
                beforeEach(function () {
                    $timeout.flush();
                });

                it('should listen for an AngularJS $destroy event', function () {
                    expect(controller.packery.destroy).not.toHaveBeenCalled();

                    $scope.$broadcast('$destroy', 'test angular event');
                    expect(controller.packery.destroy).not.toHaveBeenCalled();

                    $scope.$on($paEvents.DESTROYED, function (event, hash, packery, angularEvent) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(angularEvent).toEqual(jasmine.any(Object));
                    });
                    $scope.$digest();
                    expect(controller.packery.destroy).toHaveBeenCalled();
                });

                it('should append a draggable element', function () {
                    $scope.isAppended = true;
                    $scope.draggabilly.isDraggable = true;

                    controller.add('test element');
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    $scope.$on($paEvents.ITEM.ADDED, function (event, hash, packery, element) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(element).toBe('test element');
                    });

                    $scope.$digest();
                    expect(controller.packery.appended).toHaveBeenCalled();
                    expect(controller.packery.appended).toHaveBeenCalledWith('test element');
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(4);
                    expect(window.Draggabilly).toHaveBeenCalledWith('test element', { handle: 'test drag selector' });
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(4);

                    expect(controller.packery.layout).not.toHaveBeenCalled();
                    $timeout.flush();
                    expect(controller.packery.layout).toHaveBeenCalled();
                });

                it('should append a non-draggable element', function () {
                    $scope.isAppended = true;
                    $scope.draggabilly.isDraggable = false;

                    controller.add('test element');
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    $scope.$on($paEvents.ITEM.ADDED, function (event, hash, packery, element) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(element).toBe('test element');
                    });

                    $scope.$digest();
                    expect(controller.packery.appended).toHaveBeenCalled();
                    expect(controller.packery.appended).toHaveBeenCalledWith('test element');
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    expect(controller.packery.layout).not.toHaveBeenCalled();
                    $timeout.flush();
                    expect(controller.packery.layout).toHaveBeenCalled();
                });

                it('should prepend a draggable element', function () {
                    $scope.isAppended = false;
                    $scope.draggabilly.isDraggable = true;

                    controller.add('test element');
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    $scope.$on($paEvents.ITEM.ADDED, function (event, hash, packery, element) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(element).toBe('test element');
                    });

                    $scope.$digest();
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).toHaveBeenCalled();
                    expect(controller.packery.prepended).toHaveBeenCalledWith('test element');
                    expect(window.Draggabilly.calls.count()).toBe(4);
                    expect(window.Draggabilly).toHaveBeenCalledWith('test element', { handle: 'test drag selector' });
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(4);

                    expect(controller.packery.layout).not.toHaveBeenCalled();
                    $timeout.flush();
                    expect(controller.packery.layout).toHaveBeenCalled();
                });

                it('should prepend a non-draggable element', function () {
                    $scope.isAppended = false;
                    $scope.draggabilly.isDraggable = false;

                    controller.add('test element');
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).not.toHaveBeenCalled();
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    $scope.$on($paEvents.ITEM.ADDED, function (event, hash, packery, element) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(element).toBe('test element');
                    });

                    $scope.$digest();
                    expect(controller.packery.appended).not.toHaveBeenCalled();
                    expect(controller.packery.prepended).toHaveBeenCalled();
                    expect(controller.packery.prepended).toHaveBeenCalledWith('test element');
                    expect(window.Draggabilly.calls.count()).toBe(3);
                    expect(controller.packery.bindDraggabillyEvents.calls.count()).toBe(3);

                    expect(controller.packery.layout).not.toHaveBeenCalled();
                    $timeout.flush();
                    expect(controller.packery.layout).toHaveBeenCalled();
                });

                it('should remove an element if it is not being destroyed', function () {
                    controller.remove('test element');
                    expect(controller.packery.remove).not.toHaveBeenCalled();

                    $scope.$on($paEvents.ITEM.DESTROYED, function (event, hash, packery, element) {
                        expect(hash).toEqual(mockedDate.getTime());
                        expect(packery).toBe(controller.packery);
                        expect(element).toBe('test element');
                    });

                    $scope.$digest();
                    expect(controller.packery.remove).toHaveBeenCalled();
                    expect(controller.packery.remove).toHaveBeenCalledWith('test element');
                    expect(controller.packery.layout).not.toHaveBeenCalled();

                    $timeout.flush();
                    expect(controller.packery.layout).toHaveBeenCalled();
                });

                it('should not remove an element if it is being destroyed', function () {
                    $scope.$broadcast('$destroy');
                    controller.remove('test element');
                    expect(controller.packery.remove).not.toHaveBeenCalled();

                    $scope.$digest();
                    expect(controller.packery.remove).not.toHaveBeenCalled();
                    expect(controller.packery.layout).not.toHaveBeenCalled();

                    $timeout.flush();
                    expect(controller.packery.remove).not.toHaveBeenCalled();
                    expect(controller.packery.layout).not.toHaveBeenCalled();
                });
            });
        });
    });
}(window.angular));
