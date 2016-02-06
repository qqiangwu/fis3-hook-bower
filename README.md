# fis3-hook-bower
Bower module integraion for fis3.

Fis3 is an excellent frontend compiler. In frontend engineering, modularity plays an important role. It would be better to reused existing packages. Bower is a good candidate.

This hook will help you cope with bower dependencies. But it could be better to use npm. Also see [fis3-hook-npm](https://www.npmjs.com/package/fis3-hook-npm).

## Installation
```
npm install fis3-hook-bower
```

or

```
npm install fis3-hook-bower -g
```

## Configuration
Generally `bower_components/` is very large, so it is a good idea to exclude it from your `project.files`.

```
// By default: lookup packages in bower_components
fis.hook('bower');

// or

fis.hook('bower', {
    bower: 'bower_dir'
});
```

## Usage
Declare dependencies in your file as follows, the hook will automatically load all dependencies recursively:

```
// @require angular
// @require angular-route

var module = angular.module('app', ['ngRoute']);
```

## Demo
+ See `demo/`
+ [Simple Blog](https://github.com/qqiangwu/reins-ssh)

## TODO
+ What if `bower.json` is an array?
