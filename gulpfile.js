var gulp = require("gulp"),
	watch = require("gulp-watch"),
	gutil = require("gulp-util");

var paths = {
	dev: ['dev/**/*']
}

gulp.task("default", ['compileDev']);

gulp.task("compileDev", function () {
    return gulp.src(paths.dev)
        .pipe(gulp.dest("www"));
});

gulp.task("watch", function() {
    gulp.watch(paths.dev, ['compileDev']);
});