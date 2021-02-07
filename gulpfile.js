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
            //png
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.mozjpeg({
                progressive: true
            }),
            //jpg very light lossy, use vs Mozjpeg
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
        // See http://mdn.io/string.replace#Specifying_a_string_as_a_parameter
        .pipe(replace((/(\.(png|jpg|jpeg))/g), '.webp'))
        .pipe(dest('./'));
}

exports.compress = series(clean, build, minCSS, minImg, minJS, convertWebp, replaceSrc);
