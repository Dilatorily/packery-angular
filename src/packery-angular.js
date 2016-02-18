/*!
 * packery-angular v1.0.0 (http://dilatorily.github.io/packery-angular)
 * Copyright 2016 Dilatorily
 * Licensed under the MIT license
 */
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
     *     <head>
     *         <!-- Include the necessary libraries -->
     *         <script src="js/angular.min.js"></script>
     *         <script src="js/draggabilly.pkgd.min.js"></script>
     *         <script src="js/packery.pkgd.min.js"></script>
     *
     *         <!-- Include the packery-angular script -->
     *         <script src="js/packery-angular.min.js"></script>
     *
     *         <script>
     *             // Add 'packery-angular' as a dependency
     *             var app = angular.module('app', ['packery-angular']);
     *         </script>
     *     </head>
     *
     *     <body>...</body>
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
     * This service is an `AngularJS` constant that corresponds to the default
     * values of the options to control both
     * [`Draggabilly`](http://draggabilly.desandro.com/) and
     * [`Packery`](http://packery.metafizzy.co/).
     *
     * The `Draggabilly` default option is as follow:
     *
     *   - [`handle`](#/api/packery-angular.constant:$paOptions#properties_dragselector): `''`
     *
     * The `Packery` default options are as follow:
     *
     *   - [`itemSelector`](#/api/packery-angular.constant:$paOptions#properties_itemselector): `'.pa-item'`
     *   - [`columnWidth`](#/api/packery-angular.constant:$paOptions#properties_columnwidth): `1`
     *   - [`rowHeight`](#/api/packery-angular.constant:$paOptions#properties_rowheight): `1`
     *   - [`stamp`](#/api/packery-angular.constant:$paOptions#properties_stamp): `'.pa-stamp'`
     *
     * Moreover, there are more default options to control the behavior of the
     * `Packery` instances:
     *
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
     *
     * @description
     * This service is an `AngularJS` constant that corresponds to all of the
     * events fired from this library. It also contains the list of
     * [`Packery`](http://packery.metafizzy.co/) events that are listened by
     * this library.
     *
     * The list of fired events is as follow:
     *
     *   - [`$paDestroyed`](#/api/packery-angular.controller:paPackery#events_$padestroyed)
     *   - [`$paDragItemPositioned`](#/api/packery-angular.controller:paPackery#events_$padragitempositioned)
     *   - [`$paFitComplete`](#/api/packery-angular.controller:paPackery#events_$pafitcomplete)
     *   - [`$paInitialized`](#/api/packery-angular.controller:paPackery#events_$painitialized)
     *   - [`$paItemAdded`](#/api/packery-angular.controller:paPackery#events_$paitemadded)
     *   - [`$paItemDestroyed`](#/api/packery-angular.controller:paPackery#events_$paitemdestroyed)
     *   - [`$paLayoutComplete`](#/api/packery-angular.controller:paPackery#events_$palayoutcomplete)
     *   - [`$paRemoveComplete`](#/api/packery-angular.controller:paPackery#events_$paremovecomplete)
     *
     * The list of listened `Packery` events is as follow:
     *
     *   - [`layoutComplete`](http://packery.metafizzy.co/events.html#layoutcomplete)
     *   - [`dragItemPositioned`](http://packery.metafizzy.co/events.html#dragitempositioned)
     *   - [`fitComplete`](http://packery.metafizzy.co/events.html#fitcomplete)
     *   - [`removeComplete`](http://packery.metafizzy.co/events.html#removecomplete)
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
     *
     * @description
     * The `paPackery` controller contains all the logic to manage a
     * `packery-angular` instance. It wraps the
     * [`Packery`](http://packery.metafizzy.co/) instance and exposes an API to
     * add and remove `Packery` items.
     *
     * This controller also wraps and extends the native `Packery` events.
     * Those events are emitted them through the `$rootScope`.
     *
     * @requires $scope
     * @requires $element
     * @requires $q
     * @requires $timeout
     * @requires packery-angular.constant:$paPackery
     * @requires packery-angular.constant:$paDraggabilly
     * @requires packery-angular.constant:$paEvents
     * @requires packery-angular.constant:$paOptions
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

                /**
                 * @ngdoc event
                 * @name packery-angular.controller:paPackery#$paItemAdded
                 * @eventOf packery-angular.controller:paPackery
                 * @eventType emit
                 *
                 * @description
                 * This event is fired when a [`packery-item`](#/api/packery-angular.directive:paPackeryItem)
                 * is added to the `Packery` instance.
                 *
                 * @param {number} hash The unique hash of the `paPackery` controller
                 * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                 * @param {Object} element The `packery-item` element that has been added
                 */
                $scope.$emit($paEvents.ITEM.ADDED, hash, self.packery, element);
                refresh();
            });
        }

        function remove(element) {
            initialized.then(function () {
                if (!isDestroying) {
                    self.packery.remove(element);

                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paItemDestroyed
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when a [`packery-item`](#/api/packery-angular.directive:paPackeryItem)
                     * is destroyed from the `Packery` instance.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} element The `packery-item` element that has been destroyed
                     */
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

                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paDestroyed
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when the `Packery` instance
                     * associated with the `paPackery` controller is destroyed.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} event The `$destroy` event that triggered this event
                     */
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

            /**
             * @ngdoc event
             * @name packery-angular.controller:paPackery#$paInitialized
             * @eventOf packery-angular.controller:paPackery
             * @eventType emit
             *
             * @description
             * This event is fired when the `Packery` instance
             * associated with the `paPackery` controller is initialized.
             *
             * @param {number} hash The unique hash of the `paPackery` controller
             * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
             */
            $scope.$emit($paEvents.INITIALIZED, hash, self.packery);
            configureDraggable();
            registerPackeryEvents();
            deferred.resolve();

            function configureDraggable() {
                var children = $element[0].children;

                if ($scope.draggabilly.isDraggable) {
                    angular.forEach(children, function (child) {
                        registerDraggableItem(child);
                    });
                }
            }

            function registerPackeryEvents() {
                self.packery.on($paEvents.PACKERY.LAYOUT_COMPLETED, function (items) {
                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paLayoutComplete
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when the [`layoutComplete`](http://packery.metafizzy.co/events.html#layoutcomplete)
                     * event is fired by the `Packery` instance associated with
                     * the `paPackery` controller.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} items The items broadcasted from the `Packery` event
                     */
                    $scope.$emit($paEvents.LAYOUT_COMPLETED, hash, self.packery, items);
                });
                self.packery.on($paEvents.PACKERY.DRAGGED, function (item) {
                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paDragItemPositioned
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when the [`dragItemPositioned`](http://packery.metafizzy.co/events.html#dragitempositioned)
                     * event is fired by the `Packery` instance associated with
                     * the `paPackery` controller.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} items The item broadcasted from the `Packery` event
                     */
                    $scope.$emit($paEvents.DRAGGED, hash, self.packery, item);
                });
                self.packery.on($paEvents.PACKERY.FITTED, function (item) {
                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paFitComplete
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when the [`fitComplete`](http://packery.metafizzy.co/events.html#fitcomplete)
                     * event is fired by the `Packery` instance associated with
                     * the `paPackery` controller.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} items The item broadcasted from the `Packery` event
                     */
                    $scope.$emit($paEvents.FITTED, hash, self.packery, item);
                });
                self.packery.on($paEvents.PACKERY.REMOVED, function (items) {
                    /**
                     * @ngdoc event
                     * @name packery-angular.controller:paPackery#$paRemoveComplete
                     * @eventOf packery-angular.controller:paPackery
                     * @eventType emit
                     *
                     * @description
                     * This event is fired when the [`removeComplete`](http://packery.metafizzy.co/events.html#removecomplete)
                     * event is fired by the `Packery` instance associated with
                     * the `paPackery` controller.
                     *
                     * @param {number} hash The unique hash of the `paPackery` controller
                     * @param {Object} packery The `Packery` instance associated with the `paPackery` controller
                     * @param {Object} items The items broadcasted from the `Packery` event
                     */
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
     * @restrict EA
     *
     * @description
     * The `pa-packery` directive marks a HTML element to contain the
     * [`Packery`](http://packery.metafizzy.co/) instance.
     *
     * @param {Object=} paOptions The [options](http://packery.metafizzy.co/options.html)
     * object that should be passed to the `Packery` instance to configure it.
     *
     * A couple more attributes are used to configure the behaviour of the
     * `Packery` instance.
     *
     *   - `paPackery.isAppended`: Configures if new `packery-item` are appended or prepended
     *   - `paPackery.isDraggable`: Configures if `packery-item` are draggable
     *
     * One more attribute can be used to configure `Draggabilly`:
     *
     *   - `paPackery.dragSelector`: Corresponds to the [`handle`](http://draggabilly.desandro.com/#handle) option from `Draggabilly`
     *
     * @example
     * The following HTML code shows the usage of the `pa-packery`
     * directive in the template.
     *
     * <pre>
     * <pa-packery pa-options="options">...</pa-packery>
     * </pre>
     *
     * The following JavaScript code should be located in the corresponding
     * controller for the template shown above.
     *
     * <pre>
     * $scope.options = {
     *     columnWidth: 1,
     *     dragSelector: '',
     *     isAppended: true,
     *     isDraggable: true,
     *     itemSelector: '.pa-item',
     *     rowHeight: 1,
     *     stamp: '.pa-stamp'
     * };
     * </pre>
     */
    function PackeryDirective() {
        return {
            controller: 'paPackery',
            restrict: 'EA',
            scope: {
                packery: '<?paOptions'
            }
        };
    }

    /**
     * @ngdoc directive
     * @name packery-angular.directive:paPackeryItem
     * @restrict EA
     *
     * @description
     * The `pa-packery-item` directive marks a HTML element to contain an item
     * in a [`Packery`](http://packery.metafizzy.co/) instance.
     *
     * @example
     * The following HTML code shows the usage of the `pa-packery-item`
     * directive in the template.
     *
     * <pre>
     * <pa-packery>
     *     <pa-packery-item>...</pa-packery-item>
     * </pa-packery>
     * </pre>
     */
    PackeryItemDirective.$inject = [
        '$paEvents'
    ];

    function PackeryItemDirective() {
        return {
            link: link,
            require: '^paPackery',
            restrict: 'EA'
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
