const {
    series,
    src,
    dest
} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const replace = require('gulp-replace');

function clean(cb) {
    cb();
}

function build(cb) {
    cb();
}

function minCSS() {

    return src('./css/*.css')
        .pipe(cleanCSS())
        .pipe(dest('/.css'));

}

function minImg() {
    return src(['./img/**/*.{gif,png,jpg,svg}'])
        .pipe(cache(imagemin([
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1]
            }),
            imageminZopfli({
                more: true
            }),
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            imagemin.mozjpeg({
                progressive: true
            }),
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(dest('./img'));
}

function minJS() {
    return src(['./js/*.js'])
        .pipe(uglify())
        .pipe(dest('./js'));
}

function convertWebp() {
    return src(['./img/**', '!./img/*.webp'])
        .pipe(webp())
        .pipe(dest('./img'))
}

function replaceSrc() {
    return src(['./*.html'])
        .pipe(replace((/(\.(png|jpg|jpeg))/g), '.webp'))
        .pipe(dest('./'));
}

exports.compress = series(clean, build, minCSS, minImg, minJS, convertWebp, replaceSrc);