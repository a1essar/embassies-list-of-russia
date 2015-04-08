'use strict';

var config = {
    'autoprefixerOptions': [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ],
    'paths': {
        'main': [
            'src/client/favicon.ico',
            'src/client/humans.txt',
            'src/client/index.html',
            'src/client/.htaccess',
            'src/client/index.php',
            'src/client/manifest.webapp',
            'src/client/robots.txt'
        ],
        'server': 'src/server/**',
        'assets': [
            'src/client/images/**',
            'src/client/fonts/**',
            'src/client/json/**',
            'src/client/svg/**'
        ],
        'images': [
            'src/client/images/**'
        ],
        'fonts': 'src/client/fonts/**',
        'json': 'src/client/json/**',
        'svg': 'src/client/svg/**',
        'templates': [
            'src/client/templates/**'
        ],
        'mustache': [
            'src/client/templates/mustache/*.mustache',
            'src/client/templates/mustache/**/*.mustache'
        ],
        'styles': ['src/client/styles/css/*.css', 'src/client/styles/less/*.less', 'src/client/styles/less/**/*.less'],
        'scripts': ['src/client/scripts/js/*.js', 'src/client/scripts/js/**/*.js'],
        'scriptsBase': 'src/client/scripts/js',
        'fontsConverts': {
            'src': 'src/client/fonts/*.ttf',
            'dest': 'src/client/fonts'
        },
        'optimizeImages': {
            'src': 'src/client/images/*',
            'dest': 'src/client/images'
        },
        'dest': {
            'main': 'cordova/www',
            'server': 'cordova/www/server',
            'scripts': 'cordova/www/scripts/js',
            'scriptFileName': 'script.min.js',
            'styles': 'cordova/www/styles/css',
            'styleFileName': 'style.min.css',
            'fonts': 'cordova/www/fonts',
            'images': 'cordova/www/images',
            'json': 'cordova/www/json',
            'svg': 'cordova/www/svg',
            'templates': 'cordova/www/templates',
            'mustache': 'cordova/www/templates'
        },
        'clean': {
            'root': 'cordova/www',
            'main': [
                'cordova/www/favicon.ico',
                'cordova/www/humans.txt',
                'cordova/www/index.html',
                'cordova/www/index.php',
                'cordova/www/.htaccess',
                'cordova/www/manifest.webapp',
                'cordova/www/robots.txt'
            ],
            'server': 'cordova/www/server',
            'images': 'cordova/www/images',
            'fonts': 'cordova/www/fonts',
            'svg': 'cordova/www/svg',
            'json': 'cordova/www/json',
            'styles': 'cordova/www/styles',
            'scripts': 'cordova/www/scripts',
            'templates': 'cordova/www/templates'
        },
        'watch': {
            'main': [
                'src/client/favicon.ico',
                'src/client/humans.txt',
                'src/client/index.html',
                'src/client/.htaccess',
                'src/client/index.php',
                'src/client/manifest.webapp',
                'src/client/robots.txt'
            ],
            'server': 'src/server/**',
            'assets': [
                'src/client/images/**',
                'src/client/fonts/**',
                'src/client/json/**',
                'src/client/svg/**'
            ],
            'images': 'src/client/images/**',
            'fonts': 'src/client/fonts/**',
            'svg': 'src/client/svg/**',
            'json': 'src/client/json/**',
            'templates': [
                'src/client/templates/**'
            ],
            'mustache': [
                'src/client/templates/mustache/*.mustache',
                'src/client/templates/mustache/**/*.mustache',
                'src/client/scripts/js/views/**/*.js'
            ],
            'styles': ['src/client/styles/css/*.css', 'src/client/styles/less/*.less', 'src/client/styles/less/**/*.less'],
            'scripts': ['src/client/scripts/js/*.js', 'src/client/scripts/js/**/*.js']
        },
        'test': 'src/client/scripts/js/test/runner.html'
    }
};


module.exports = config;
