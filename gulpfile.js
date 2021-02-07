const { series, src, dest } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

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
    return src('./img/*')
    .pipe(imagemin())
    .pipe(dest('./img'))
}



exports.build = build;
exports.default = series(clean, build);
exports.minifyCSS = minCSS;
exports.compress = series(clean, build, minCSS, minImg);