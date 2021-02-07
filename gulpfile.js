const { series, src, dest } = require('gulp');
const cleanCSS = require('gulp-clean-css');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg'); 
var imageminGiflossy = require('imagemin-giflossy');

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
function minImg(){
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
        //jpg very light lossy, use vs jpegtran
        imageminMozjpeg({
            quality: 90
        })
    ])))
    .pipe(dest('./img'));
}



exports.compress = series(clean, build, minCSS, minImg);