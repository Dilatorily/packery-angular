(function (angular, Draggabilly, Packery) {
    'use strict';

    angular.module('packery-angular', [])
        .constant('Draggabilly', Draggabilly)
        .constant('Packery', Packery)
        .constant('$paOptions', $OptionsConstant())
        .constant('$paEvents', $EventsConstant())
        .controller('paPackery', PackeryController)
        .directive('paPackery', PackeryDirective)
        .directive('paPackeryItem', PackeryItemDirective);

    function $OptionsConstant() {
        return {
            columnWidth: 1,
            dragSelector: '',
            isAppended: true,
            isDraggable: true,
            itemSelector: '.pa-item',
            percentPosition: false,
            rowHeight: 1,
            stamp: '.pa-stamp'
        };
    }

    function $EventsConstant() {
        return {
            DESTROYED: '$paDestroyed',
            DRAGGED: '$paDragItemPositioned',
            FITTED: '$paFitComplete',
            INITIALIZED: '$paInitialized',
            ITEM: {
                ADDED: '$paItemAdded',
                DESTROYED: '$paItemDestroyed'
            },
            LAYOUT_COMPLETED: '$paLayoutComplete',
            PACKERY: {
                DRAGGED: 'dragItemPositioned',
                FITTED: 'fitComplete',
                LAYOUT_COMPLETED: 'layoutComplete',
                REMOVE: 'removeComplete'
            },
            REMOVE: '$paRemoveComplete'
        };
    }

    PackeryController.$inject = [
        '$scope',
        '$element',
        '$q',
        '$timeout',
        'Packery',
        'Draggabilly',
        '$paEvents',
        '$paOptions'
    ];

    function PackeryController($scope, $element, $q, $timeout, Packery, Draggabilly, $paEvents, $paOptions) {
        var self = this;
        var deferred = $q.defer();
        var initialized = deferred.promise;
        var isDestroying = false;
        var hash = new Date().getTime();

        self.packery = undefined;
        self.add = add;
        self.remove = remove;

        registerEvents();
        applyDefaultOptions();
        $timeout(initializePackery);

        function add(element) {
            initialized.then(function () {
                if ($scope.isAppended) {
                    self.packery.appended(element);
                } else {
                    self.packery.preprended(element);
                }

                if ($scope.draggabilly.isDraggable) {
                    registerDraggableItem(element);
                }

                $scope.$emit($paEvents.ITEM.ADDED, {
                    element: element,
                    hash: hash,
                    packery: self.packery
                });
                refresh();
            });
        }

        function remove(element) {
            initialized.then(function () {
                if (isDestroying) {
                    self.packery.remove(element);
                    $scope.$emit($paEvents.ITEM.DESTROYED, {
                        element: element,
                        hash: hash,
                        packery: self.packery
                    });
                    refresh();
                }
            });
        }

        function registerEvents() {
            $scope.$on('$destroy', function (event) {
                isDestroying = true;
                initialized.then(function () {
                    self.packery.destroy();
                    $scope.$emit($paEvents.DESTROYED, {
                        event: event,
                        hash: hash,
                        packery: self.packery
                    });
                });
            });
        }

        function applyDefaultOptions() {
            $scope.options = $scope.packery ? angular.copy($scope.packery) : {};
            applyMissingDefaultOptions();
            preparePackeryOptions();
            prepareDraggabillyOptions();

            function applyMissingDefaultOptions() {
                var option;

                for (option in $paOptions) {
                    if ($paOptions.hasOwnProperty(option) && !$scope.options.hasOwnProperty(option)) {
                        $scope.options[option] = angular.copy($paOptions[option]);
                    }
                }
            }

            function preparePackeryOptions() {
                $scope.isAppended = $scope.options.isAppended;
                delete $scope.options.isAppended;
            }

            function prepareDraggabillyOptions() {
                $scope.draggabilly = {
                    dragSelector: $scope.options.dragSelector,
                    isDraggable: $scope.options.isDraggable
                };
                delete $scope.options.dragSelector;
                delete $scope.options.isDraggable;
            }
        }

        function initializePackery() {
            self.packery = new Packery($element[0], $scope.options);
            $scope.$emit($paEvents.INITIALIZED, {
                hash: hash,
                packery: self.packery
            });
            configureDraggable();
            registerPackeryEvents();
            deferred.resolve();

            function configureDraggable() {
                var children = $element[0].children;
                var i;

                if ($scope.draggabilly.isDraggable) {
                    for (i = 0; i < children.length; ++i) {
                        registerDraggableItem(children[i]);
                    }
                }
            }

            function registerPackeryEvents() {
                self.packery.on($paEvents.PACKERY.LAYOUT_COMPLETED, function (items) {
                    $scope.$emit($paEvents.LAYOUT_COMPLETED, {
                        hash: hash,
                        laidOutItems: items,
                        packery: self.packery
                    });
                });
                self.packery.on($paEvents.PACKERY.DRAGGED, function (item) {
                    $scope.$emit($paEvents.DRAGGED, {
                        draggedItem: item,
                        hash: hash,
                        packery: self.packery
                    });
                });
                self.packery.on($paEvents.PACKERY.FITTED, function (item) {
                    $scope.$emit($paEvents.FITTED, {
                        hash: hash,
                        item: item,
                        packery: self.packery
                    });
                });
                self.packery.on($paEvents.PACKERY.REMOVED, function (items) {
                    $scope.$emit($paEvents.REMOVED, {
                        hash: hash,
                        packery: self.packery,
                        removedItems: items
                    });
                });
            }
        }

        function registerDraggableItem(element) {
            var draggabilly = new Draggabilly(element, {
                handle: $scope.draggabilly.dragSelector
            });

            self.packery.bindDraggabillyEvents(draggabilly);
        }

        function refresh() {
            initialized.then(function () {
                $timeout(function () {
                    self.packery.layout();
                });
            });
        }
    }

    function PackeryDirective() {
        return {
            controller: 'paPackery',
            restrict: 'A',
            scope: {
                packery: '=?paPackery'
            }
        };
    }

    PackeryItemDirective.$inject = [
        '$paEvents'
    ];

    function PackeryItemDirective() {
        return {
            link: link,
            require: '^paPackery',
            restrict: 'A'
        };

        function link(scope, element, attributes, controller) {
            if (controller.packery) {
                controller.add(element[0]);
            }

            scope.$on('$destroy', function () {
                controller.remove(element[0]);
            });
        }
    }
}(window.angular, window.Draggabilly, window.Packery));
