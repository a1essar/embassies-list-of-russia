'use strict';

var mainBowerFiles = require('main-bower-files');
var _ = require('underscore');

var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpCsso = require('gulp-csso');
var gulpCsslint = require('gulp-csslint');
var gulpIf = require('gulp-if');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpPlumber = require('gulp-plumber');
var gulpUtil = require('gulp-util');

var options = require('../config');

var lessRender = require('../utils/less-render');
var autoprefixerRender = require('../utils/autoprefixer-render');
var urlRebase = require('../utils/url-rebase');

/* start task: styles */
gulp.task('styles', function() {
    var vendors = mainBowerFiles({
        paths: {
            paths: './',
            bowerDirectory: 'vendor',
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        },
        filter: /.less$|.css$/
    });

    vendors = _.union(vendors, options.paths.styles);

    /* custom reporter for gulpCsslint*/
    var customReporter = function(file) {
        if(Object.keys(file.csslint.results[0].error.rule).length <= 0){
            return false;
        }

        var c = gulpUtil.colors;
        process.stderr.write('\x07'); // Send a beep to the terminal so it bounces

        var errorCount = file.csslint.errorCount;
        var plural = errorCount === 1 ? '' : 's';

        gulpUtil.log(c.cyan(errorCount)+' error'+plural+' found in '+c.magenta(file.path));

        file.csslint.results.forEach(function(result) {
            var message = result.error;

            gulpUtil.log(
                c.red('[') +
                (
                    typeof message.line !== 'undefined' ?
                    c.yellow( 'L' + message.line ) +
                    c.red(':') +
                    c.yellow( 'C' + message.col )
                        :
                        c.yellow('GENERAL')
                ) +
                c.red('] ') +
                message.message + ' ' + message.rule.desc + ' (' + message.rule.id + ')');
        });
    };

    return gulp.src(vendors)
        .pipe(gulpPlumber())

        .pipe(gulpSourcemaps.init())

        .pipe(gulpIf(/.less/, lessRender()))

        .pipe(urlRebase())
        .pipe(autoprefixerRender())
        .pipe(gulpCsso())

        .pipe(gulpConcat(options.paths.dest.styleFileName))

        .pipe(gulpSourcemaps.write('.'))

        .pipe(gulp.dest(options.paths.dest.styles))
        ;

    /* see all gulpHtmlmin options: https://github.com/CSSLint/csslint/wiki/Rules-by-ID */
});
/* end task: styles */
