var expect = require('chai').expect;
var path = require('path');
var self = require('../');
var fis = require('fis3');
var _ = fis.util;

function hookSelf(opts) {
    self(fis, opts || {});
}

describe('fis3-hook-bower-lookup', function() {
    beforeEach(function () {
        fis.project.setProjectRoot(__dirname);
        fis.media().init();
        fis.config.init();
        fis.compile.setup();
        fis.cache.enable = false;

        hookSelf();
    });

    it('index-lookup', function() {
        var p = fis.project.lookup('angular-route');

        expect(p).to.have.property('file');
        expect(p.id).to.be.equal('angular-route');
    });

    it('file-lookup', function() {
        var p = fis.project.lookup('angular/angular.js');

        expect(p).to.have.property('file');
        expect(p.id).to.be.equal('angular/angular.js');
    });

    it('css-lookup', function() {
        var p = fis.project.lookup('css-pack/x.css');

        expect(p).to.have.property('file');
        expect(p.id).to.be.equal('css-pack/x.css');
    });
});

describe('fis3-hook-bower-deps', function() {
    beforeEach(function () {
        fis.project.setProjectRoot(__dirname);
        fis.media().init();
        fis.config.init();
        fis.compile.setup();
        fis.cache.enable = false;

        hookSelf();
    });

    it('boot-deps', function() {
        var file = fis.file(__dirname + '/boot.js');
        var c = fis.compile(file);

        expect(c.getContent()).to.contain('// @require angular-route');
        expect(c.getContent()).to.contain('// @require css-pack/x.css');
    });

    it('dep-deps', function() {
        var info = fis.project.lookup('angular-route');
        var c = fis.compile(fis.file.wrap(info.file.realpath));

        expect(c.getContent()).to.contain('// @require angular\n');
    });
});
