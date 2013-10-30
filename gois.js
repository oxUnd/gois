var fis = module.exports = require('fis');

fis.cli.name = "gois";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

var TEMPLATE_DIR = process.env['BEEGO_APP_DIR'] || "";

fis.config.merge({
    modules : {
        parser : {
            less : 'less',
            tmpl: 'bdtmpl'
        },
        preprocessor: {
            tpl: 'extlang'
        },
        postprocessor: {
            tpl: 'require-async',
            js: 'jswrapper, go-require-async'
        }
    },
    roadmap : {
        ext : {
            less : 'css',
            tmpl : 'js'
        },
        path : [
            {
                reg : /^\/widget\/(.*\.tpl)$/i,
                isMod : true,
                id : '${namespace}/widget/$1',
                url : '${namespace}/widget/$1',
                release : TEMPLATE_DIR + '/view/${namespace}/widget/$1'
            },
            {
                reg : /^\/widget\/(.*\.(js|css))$/i,
                isMod : true,
                release : TEMPLATE_DIR + '/static/${namespace}/widget/$1'
            },
            {
                reg : /^\/page\/(.+\.tpl)$/i,
                isMod: true,
                id : '${namespace}/widget/$1',
                release : TEMPLATE_DIR + '/view/${namespace}/page/$1',
                extras: {
                    isPage: true
                }
            },
            {
                reg : /\.tmpl$/i,
                release : false
            },
            {
                reg: /^\/(static|config|test)\/(.*)/i,
                release: TEMPLATE_DIR + '/$1/${namespace}/$2'
            },
            {
                reg : /^\/(plugin|server\.conf$|smarty\.conf$)|\.php$/i
            },
            {
                reg: "domain.conf",
                release: TEMPLATE_DIR + '/config/$&'
            },
            {
                reg: "build.sh",
                release: false
            },
            {
                reg : '${namespace}-map.json',
                release : TEMPLATE_DIR + '/config/${namespace}-map.json'
            },
            {
                reg: /^.+$/,
                release: TEMPLATE_DIR + '/static/${namespace}$&'
            }
        ]
    },
    settings : {
        smarty: {
            left_delimiter: '{{',
            right_delimiter: '}}'
        },
        parser : {
            bdtmpl : {
                LEFT_DELIMITER : '<#',
                RIGHT_DELIMITER : '#>'
            }
        },
        postprocessor : {
            jswrapper: {
                type: 'amd'
            }
        }
    }
});
