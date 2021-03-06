'use strict';

var fs = require('fs');

var gulp = require('gulp');
var gulpCsscomb = require('gulp-csscomb');
var gulpPlumber = require('gulp-plumber');
var gulpTtf2woff = require('gulp-ttf2woff');
var gulpWebp = require('gulp-webp');
var gulpImage = require('gulp-image');
var gulpSpritesmith = require('gulp.spritesmith');

var options = require('../config');

/* start task: csscomb */
gulp.task('csscomb', function() {
    return gulp.src(options.paths.styles, {base: './'})
        .pipe(gulpPlumber())

        .pipe(gulpCsscomb())

        .pipe(gulp.dest('./'))
        ;
});
/* end task: csscomb */

/* start task: ttf2woff */
gulp.task('ttf2woff', function(){
    gulp.src(options.paths.fontsConverts.src)
        .pipe(gulpTtf2woff())
        .pipe(gulp.dest(options.paths.fontsConverts.dest));
});
/* end task: ttf2woff */

/* start task: images2webp */
gulp.task('images2webp', function () {
    return gulp.src(options.paths.optimizeImages.src)
        .pipe(gulpWebp({quality: 60}))
        .pipe(gulp.dest(options.paths.optimizeImages.dest))
        ;
});
/* end task: images2webp */

/* start task: optimize-images */
gulp.task('optimize-images', function () {
    return gulp.src(options.paths.optimizeImages.src)
        .pipe(gulpImage())
        .pipe(gulp.dest(options.paths.optimizeImages.dest))
        ;
});
/* end task: optimize-images */

/* start task: sprites */
gulp.task('sprites', function () {
    var types = ['png', 'jpg'];

    types.forEach(function (type, i) {
        spriteDirs(type);
    });

    function spriteDirs(type){
        var files = fs.readdirSync('src/client/images/sprites' + '/' + type);
        var dirs = [];

        files.forEach(function(file, i){
            var stat = fs.statSync('src/client/images/sprites' + '/' + type + '/' + file);

            if(stat.isDirectory()){
                dirs.push(file);
            }
        });

        dirs.forEach(function (dir, i) {
            spriteRender(dir, type);
        });
    }

    function spriteRender(dir, type){
        var spriteData = gulp.src('src/client/images/sprites' + '/' + type + '/' + dir + '/*.' + type)
            .pipe(gulpPlumber())

            .pipe(gulpSpritesmith({
                imgName: 'sprite-' + dir + '.' + type,
                cssName: 'sprite-' + dir + '.less',
                cssFormat: 'less',
                algorithm: 'top-down',
                padding: 20,
                cssVarMap: function (sprite) {
                    sprite.name = 'sprite-' + dir + '-' + sprite.name;
                },
                cssSpritesheetName: 'spritesheet-' + dir
            }));

        spriteData.img
            .pipe(gulp.dest('src/client/images'));

        spriteData.css
            .pipe(gulp.dest('src/client/styles/less/sprites'));
    }
});
/* end task: sprites */