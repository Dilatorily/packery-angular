(function (angular, Draggabilly, Packery) {
    'use strict';

    /**
     * @ngdoc overview
     * @name packery-angular
     *
     * @description
     * # packery-angular
     * The packery-angular module contains all of the functionalities of the
     * packery-angular project. To use it, this module must be imported to your
     * project to expose the directives that are available to you.
     *
     * There are also some angular constants that are used internally, but that are
     * exposed in this module.
     *
     * This module depends on the `Draggabilly` and `Packery` libraries to work
     * properly.
     *
     * <pre>
     * <!DOCTYPE html>
     * <html ng-app="app">
     *   <head>
     *     <!-- Include the necessary libraries -->
     *     <script src="js/angular.min.js"></script>
     *     <script src="js/draggabilly.pkgd.min.js.js"></script>
     *     <script src="js/packery.pkgd.min.js.js"></script>
     *
     *     <!-- Include the packery-angular script -->
     *     <script src="js/packery-angular.min.js"></script>
     *
     *     <script>
     *       // Add 'packery-angular' as a dependency
     *       var app = angular.module('app', ['packery-angular']);
     *     </script>
     *   </head>
     *
     *   <body>...</body>
     * </html>
     * </pre>
     */

    /**
     * @ngdoc function
     * @name packery-angular.constant:$paDraggabilly
     * @requires window.Draggabilly
     *
     * @description
     * This AngularJS constant is an interface to the `Draggabilly` function
     * exposed by the [`Draggabilly`](http://draggabilly.desandro.com/) library
     * in the `window.Draggabilly` property.
     */

    /**
     * @ngdoc function
     * @name packery-angular.constant:$paPackery
     * @requires window.Packery
     *
     * @description
     * This AngularJS constant is an interface to the `Packery` function
     * exposed by the [`Packery`](http://packery.metafizzy.co/) library
     * in the `window.Packery` property.
     */
    angular.module('packery-angular', [])
        .constant('$paDraggabilly', Draggabilly)
        .constant('$paPackery', Packery)
        .constant('$paOptions', $OptionsConstant())
        .constant('$paEvents', $EventsConstant())
        .controller('paPackery', PackeryController)
        .directive('paPackery', PackeryDirective)
        .directive('paPackeryItem', PackeryItemDirective);

    /**
     * @ngdoc object
     * @name packery-angular.constant:$paOptions
     *
     * @description
     * This service is an `AngularJS` constant that correspond to the default
     * values of the options to control both
     * [`Draggabilly`](http://draggabilly.desandro.com/) and
     * [`Packery`](http://packery.metafizzy.co/).
     *
     * The `Draggabilly` default option is as follow:
     *   - [`handle`](#/api/packery-angular.constant:$paOptions#properties_dragselector): `''`
     *
     * The `Packery` default options are as follow:
     *   - [`itemSelector`](#/api/packery-angular.constant:$paOptions#properties_itemselector): `'.pa-item'`
     *   - [`columnWidth`](#/api/packery-angular.constant:$paOptions#properties_columnwidth): `1`
     *   - [`rowHeight`](#/api/packery-angular.constant:$paOptions#properties_rowheight): `1`
     *   - [`stamp`](#/api/packery-angular.constant:$paOptions#properties_stamp): `'.pa-stamp'`
     *
     * Moreover, there are more default options to control the behavior of the
     * `Packery` instances:
     *   - [`isAppended`](#/api/packery-angular.constant:$paOptions#properties_isappended): `true`
     *   - [`isDraggable`](#/api/packery-angular.constant:$paOptions#properties_isdraggable): `true`
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#dragSelector
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `''`.
     *
     * @returns {string} The default value of the
     * [`handle`](http://draggabilly.desandro.com/#handle) option that is used
     * by `Draggabilly`.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#itemSelector
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `'.pa-item'`.
     *
     * @returns {string} The default value of the
     * [`itemSelector`](http://packery.metafizzy.co/options.html#itemSelector)
     * option that is used by `Packery`.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#columnWidth
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `1`.
     *
     * @returns {number} The default value of the
     * [`columnWidth`](http://packery.metafizzy.co/options.html#columnWidth)
     * option that is used by `Packery`.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#rowHeight
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `1`.
     *
     * @returns {number} The default value of the
     * [`rowHeight`](http://packery.metafizzy.co/options.html#rowHeight)
     * option that is used by `Packery`.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#stamp
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `'.pa-stamp'`.
     *
     * @returns {string} The default value of the
     * [`stamp`](http://packery.metafizzy.co/options.html#stamp)
     * option that is used by `Packery`.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#isAppended
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `true`.
     *
     * @returns {boolean} The default value of that is used to toggle `Packery`
     * instances to add by appending or prepending.
     */

    /**
     * @ngdoc property
     * @name packery-angular.constant:$paOptions#isDraggable
     * @propertyOf packery-angular.constant:$paOptions
     *
     * @description
     * The default value is `true`.
     *
     * @returns {boolean} The default value of that is used to toggle `Packery`
     * instances to be draggable.
     */
    function $OptionsConstant() {
        return {
            columnWidth: 1,
            dragSelector: '',
            isAppended: true,
            isDraggable: true,
            itemSelector: '.pa-item',
            rowHeight: 1,
            stamp: '.pa-stamp'
        };
    }

    /**
     * @ngdoc object
     * @name packery-angular.constant:$paEvents
     */
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

    /**
     * @ngdoc controller
     * @name packery-angular.controller:paPackery
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paItemAdded
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paItemDestroyed
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paDestroyed
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paInitialized
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paLayoutComplete
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paDragItemPositioned
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paFitComplete
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */

    /**
     * @ngdoc event
     * @name packery-angular.controller:paPackery#$paRemoveComplete
     * @eventOf packery-angular.controller:paPackery
     * @eventType emit
     */
    PackeryController.$inject = [
        '$scope',
        '$element',
        '$q',
        '$timeout',
        '$paPackery',
        '$paDraggabilly',
        '$paEvents',
        '$paOptions'
    ];

    function PackeryController(
        $scope,
        $element,
        $q,
        $timeout,
        Packery,
        Draggabilly,
        $paEvents,
        $paOptions
    ) {
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
                    self.packery.prepended(element);
                }

                if ($scope.draggabilly.isDraggable) {
                    registerDraggableItem(element);
                }

                $scope.$emit($paEvents.ITEM.ADDED, hash, self.packery, element);
                refresh();
            });
        }

        function remove(element) {
            initialized.then(function () {
                if (!isDestroying) {
                    self.packery.remove(element);
                    $scope.$emit($paEvents.ITEM.DESTROYED, hash, self.packery, element);
                    refresh();
                }
            });
        }

        function registerEvents() {
            $scope.$on('$destroy', function (event) {
                isDestroying = true;
                initialized.then(function () {
                    self.packery.destroy();
                    $scope.$emit($paEvents.DESTROYED, hash, self.packery, event);
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
            $scope.$emit($paEvents.INITIALIZED, hash, self.packery);
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
                    $scope.$emit($paEvents.LAYOUT_COMPLETED, hash, self.packery, items);
                });
                self.packery.on($paEvents.PACKERY.DRAGGED, function (item) {
                    $scope.$emit($paEvents.DRAGGED, hash, self.packery, item);
                });
                self.packery.on($paEvents.PACKERY.FITTED, function (item) {
                    $scope.$emit($paEvents.FITTED, hash, self.packery, item);
                });
                self.packery.on($paEvents.PACKERY.REMOVED, function (items) {
                    $scope.$emit($paEvents.REMOVED, hash, self.packery, items);
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

    /**
     * @ngdoc directive
     * @name packery-angular.directive:paPackery
     */
    function PackeryDirective() {
        return {
            controller: 'paPackery',
            restrict: 'A',
            scope: {
                packery: '=?paPackery'
            }
        };
    }

    /**
     * @ngdoc directive
     * @name packery-angular.directive:paPackeryItem
     */
    PackeryItemDirective.$inject = [
        '$paEvents'
    ];

    function PackeryItemDirective() {
        return {
            link: link,
            require: '^paPackery'
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
