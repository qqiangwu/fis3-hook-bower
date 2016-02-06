var _opts = {
    bower: 'bower_components'
};
var _packages = {};

function _bowerLocate() {
    return _opts.bower + '/' + Array.prototype.join.call(arguments, '/');
}

function _find(name, dir) {
    return fis.uri(name, dir);
}

function _readPkg(cname) {
    try {
        var pkgFile = _bowerLocate(cname, 'bower.json');
        var file = fis.file(fis.project.getProjectPath(), pkgFile);

        if (file.exists()) {
            var json = JSON.parse(file.getContent());

            _packages[cname] = json;

            return json;
        } else {
            fis.log.debug('Unknown bower package:', cname);
        }
    } catch (e) {
        fis.log.warn('Invalid bower package:', e);
    }

    return null;
}

function _resolveDeps(pkg) {
    // cope with deps
    var deps = pkg.dependencies;
    var depsList = [];

    for (var prop in deps) {
        depsList.push(prop);
    }

    return depsList;
}

function resolveBowerDeps(info, file) {
    // ignore processed files
    if (info.file || file && file.useShortPath === false) {
        return;
    }

    var resolved;
    var m = /^([0-9a-zA-Z\.\-_]+)(?:\/(.+))?$/.exec(info.rest);

    if (m) {
        var cName = m[1];
        var subpath = m[2];

        if (subpath) {
            resolved = _find(_bowerLocate(info.rest), fis.project.getProjectPath());
        } else {
            var pkg = _readPkg(cName);

            if (pkg && pkg.main) {
                var target = _bowerLocate(cName, pkg.main);
                resolved = _find(target, fis.project.getProjectPath());
            }
        }

        if (resolved && resolved.file) {
            var f = resolved.file;
            var id = info.rest;

            // FIXME    is this a bug?
            fis.match(f.id, { id: id });

            info.id = id;
            info.file = f;
        }
    }
}

function injectBowerDeps(info) {
    var pkg = _packages[info.file.id];

    if (pkg) {
        fis.log.debug('[Bower] inject deps:', info.file.id);

        var deps = _resolveDeps(pkg);

        deps.forEach(function(v){
            info.content += '// @require {}\n'.
                replace('{}', fis.compile.lang.jsRequire.wrap(v));
        });
    }
}

module.exports = function(fis, opts) {
    for (var prop in opts) {
        _opts[prop] = opts[prop];
    }

    fis.on('lookup:file', resolveBowerDeps);
    fis.on('standard:js', injectBowerDeps);
};
