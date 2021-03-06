// -------------------------------------------------------------------------
// GET THINGS SET UP
// -------------------------------------------------------------------------

// Include Gulp
var gulp 					= require('gulp');

// CSS plugins
var sass 					= require('gulp-sass');
var combineMediaQueries 	= require('gulp-combine-media-queries');
var autoprefixer 			= require('gulp-autoprefixer');
var cssmin 					= require('gulp-cssmin');

// JS plugins
var concat 					= require('gulp-concat');
var uglify 					= require('gulp-uglify');

// Image plugins
var imagemin 				= require('gulp-imagemin');
var svgmin 					= require('gulp-svgmin');

// General plugins
var browserSync 			= require('browser-sync');
var notify					= require('gulp-notify');

// -------------------------------------------------------------------------
// TASKS
// -------------------------------------------------------------------------

// CSS tasks
gulp.task('css', function() {
	return gulp.src('src/scss/**/*')
		// Compile Sass
		.pipe(sass({ style: 'compressed', noCache: true }))
		// Combine media queries
		.pipe(combineMediaQueries())
		// parse CSS and add vendor-prefixed CSS properties
		.pipe(autoprefixer())
		// Minify CSS
		.pipe(cssmin())
		// Where to store the finalized CSS
		.pipe(gulp.dest('build/css'))
		// Notify us that the task was completed
		.pipe(notify({ message: 'CSS task complete' }));
});

// JS tasks
gulp.task('js', function() {
	return gulp.src('src/js/**/*')
		// Concatenate all JS files into one
		.pipe(concat('production.js'))
		// Minify JS
		.pipe(uglify())
		// Where to store the finalized JS
		.pipe(gulp.dest('build/js'))
		// Notify us that the task was completed
		.pipe(notify({ message: 'Javascript task complete' }));
});

// Image tasks
gulp.task('images', function() {
	return gulp.src('src/images/raster/*')
		// Minify the images
		.pipe(imagemin())
		// Where to store the finalized images
		.pipe(gulp.dest('build/images'))
		// Notify us that the task was completed
		.pipe(notify({ message: 'Image task complete' }));
});

// SVG tasks
gulp.task('svgs', function() {
	return gulp.src('src/images/vector/*')
		// Minify the SVG's
		.pipe(svgmin())
		// Where to store the finalized SVG's
		.pipe(gulp.dest('build/images'))
		// Notify us that the task was completed
		.pipe(notify({ message: 'SVG task complete' }));
});

// Watch files for changes
gulp.task('watch', function() {
	// Watch Sass files
  	gulp.watch('src/scss/**/*', ['css']);
  	// Watch JS files
  	gulp.watch('src/js/**/*', ['js']);
  	// Watch image files
  	gulp.watch('src/images/raster/*', ['images']);
  	// Watch SVG files
  	gulp.watch('src/images/vector/*', ['svgs']);
});

gulp.task('browser-sync', function() {  
    browserSync.init(['build/css/*', 'build/js/*'], {
        server: {
            baseDir: "build"
        }
    });
});

// Default task
gulp.task('default', ['css', 'js', 'images', 'svgs', 'watch', 'browser-sync']);
