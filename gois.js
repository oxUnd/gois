var fis = module.exports = require('fis');

fis.cli.name = "gois";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');


fis.config.merge({
    modules : {
        parser : {
            tmpl: 'utc'
        },
        postprocessor: {
            js: 'jswrapper'
        }
    },
    roadmap : {
        ext : {
            tmpl : 'js'
        },
        path : [
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                url : 'widget/$1',
                release : '/template/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : '/static/widget/$1'
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                url : 'page/$1',
                release : '/template/page/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg: /^\/(static|test)\/(.*)/i,
                release: '/$1/$2'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg: 'map.json',
                release: '/template/config/map.json'
            },
            {
                reg: /^.+$/,
                release: '/static/$&'
            }
        ]
    },
    settings : {
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});
