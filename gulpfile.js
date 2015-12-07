var gulp = require("gulp"),
	watch = require("gulp-watch"),
	gutil = require("gulp-util"),
	babel = require("gulp-babel");

var paths = {
	es6: ['dev/es6/**/*.js'],
	dev: ['dev/**/*']
}

gulp.task("default", ['compileDev', 'babel']);

gulp.task("compileDev", function () {
    return gulp.src(paths.dev)
        .pipe(gulp.dest("www"));
});

gulp.task("babel", function () {
  return gulp.src(paths.es6)
    .pipe(babel())
    .pipe(gulp.dest("www/js"));

});

gulp.task("watch", function() {
    gulp.watch(paths.dev, ['compileDev']);
    gulp.watch(paths.es6, ['babel']);
});