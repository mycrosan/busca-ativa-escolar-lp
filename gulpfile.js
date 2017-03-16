var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	include = require('gulp-include'),
	compass = require('gulp-compass'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload');

var path = {
	src: 'src/',
	dest: 'public/dist/'
};

gulp.task('compass', function() {
	gulp.src(path.sass + 'sass/**/*.scss')
		.pipe(compass({
			css: path.dest + "css",
			sass: path.src + "sass",
			image: "public/images",
			fonts: "public/fonts",
			import_path: './',
			style: 'nested',
			line_comments: false,
			sourcemap: true,
			relative_assets: true
		}))
		.on('error', function(error) {
			console.log(error);
			this.emit('end');
		})
		.pipe(gulp.dest(path.dest + "css"))
		.pipe(minifyCSS())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(path.dest + "css"))
});

gulp.task('compress', function() {
	return gulp.src(path.src + "js/*.js")
		.pipe(include())
		.pipe(gulp.dest(path.dest + 'js'))
		.pipe(uglify())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest(path.dest + 'js'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch([path.src + "js/*.js", path.src + "js/**/*.js"], ['compress']);
	gulp.watch([path.src + "sass/**/*.scss"], ['compass']);
	gulp.watch([path.dest + "css/*.css", path.dest + "js/*.js", "public/*.html"]).on('change', livereload.changed);
});

gulp.task('develop', ['watch', 'compress', 'compass']);