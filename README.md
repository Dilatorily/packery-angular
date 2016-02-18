# packery-angular

[![NPM version](https://img.shields.io/npm/v/packery-angular.svg?style=flat)](https://www.npmjs.com/package/packery-angular)
[![Build Status](https://travis-ci.org/Dilatorily/packery-angular.svg?style=flat)](https://travis-ci.org/Dilatorily/packery-angular)
[![Coverage Status](https://coveralls.io/repos/Dilatorily/packery-angular/badge.svg?branch=master&service=github&style=flat)](https://coveralls.io/github/Dilatorily/packery-angular?branch=master)
[![Dependency Status](https://david-dm.org/Dilatorily/packery-angular.svg?style=flat)](https://david-dm.org/Dilatorily/packery-angular)
[![devDependency Status](https://david-dm.org/Dilatorily/packery-angular/dev-status.svg?style=flat)](https://david-dm.org/Dilatorily/packery-angular#info=devDependencies)

## Installation
Installation is easy since packery-angular has minimal dependencies.

### Requirements
This module requires the following libraries to be already installed:

  - `angular@1.5.0`
  - `draggabilly@2.1.0`
  - `packery@2.0.0`

### Install using NPM

```bash
$ npm install packery-angular
```

### Install using bower

```bash
$ bower install packery-angular
```

### Import the necessary files
Add the necessary scripts to your HTML page.

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <!-- Include the necessary libraries -->
        <script src="js/angular.min.js"></script>
        <script src="js/draggabilly.pkgd.min.js"></script>
        <script src="js/packery.pkgd.min.js"></script>

        <!-- Include the packery-angular script -->
        <script src="js/packery-angular.min.js"></script>
    </head>
</html>
```

### Inject the module to your project
When all of the dependencies are installed, inject this module to the list of dependencies of your application.

```javascript
angular.module('app', ['packery-angular']);
```

## Usage
This module exposes a couple of directives to simplify the usage of the [`Packery`](http://packery.metafizzy.co/) instance.

### HTML
```html
<pa-packery pa-options="options">
    <pa-packery-item>Sample item 1</pa-packery-item>
    <pa-packery-item>Sample item 2</pa-packery-item>
    <pa-packery-item>Sample item 3</pa-packery-item>
</pa-packery>
```

### JavaScript
```javascript
$scope.options = {
    columnWidth: 1,
    dragSelector: '',
    isAppended: true,
    isDraggable: true,
    itemSelector: '.pa-item',
    rowHeight: 1,
    stamp: '.pa-stamp'
};
```

## [Changelog](CHANGELOG.md)
Please check the [CHANGELOG.md](CHANGELOG.md) for the list of changes.

## [Contributing](CONTRIBUTING.md)
I am open for modifications on this project. Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.

## [License](LICENSE)
This repository is open source and distributed under the MIT License.

Packery is a product of Metafizzy LLC and is distributed under a separate license. Please refer to their [website](http://packery.metafizzy.co/) for information on Packery's license.
