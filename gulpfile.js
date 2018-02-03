var gulp = require('gulp');
	sass = require('gulp-sass');
	pug = require('gulp-pug');
	browserSync = require('browser-sync');
	del = require('del');
	build = require('gulp-build');

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('pug', function() {
	return gulp.src("src/pug/*.pug")
		.pipe(pug())
		.pipe(gulp.dest('src/'));
});

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('src/pug/*', ['pug']);
	gulp.watch('src/css/main.css', browserSync.reload);
	gulp.watch('src/scss/main.scss', ['sass']);
	gulp.watch('src/index.html', browserSync.reload);
});

gulp.task('default', ['pug', 'watch']);

gulp.task('sass', function() {
	return gulp.src('src/scss/main.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({
	stream: true
}));
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('build', ['clean'], function() {
	gulp.src('src/css/main.css')
		.pipe(gulp.dest('dist/css'));

	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));


	gulp.src('src/js/main.js')
		.pipe(gulp.dest('dist/js'));

	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});
