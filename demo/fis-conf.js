fis.set('project.files', ['/views/**', '/modules/**', 'map.json']);

fis.hook('bower', {
    bower: 'import'
});

fis.match('::package', {
    postpackager: [
        fis.plugin('loader'),
        fis.plugin('inline')
    ],
    packager: fis.plugin('map', {
        useTrack: false
    })
});
