var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

var publicFolder = 'docs';

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dev',
            https: true
        }
    });
});

gulp.task('sass', function() {
    return gulp.src('dev/scss/**/*.scss') // Gets all files ending with .scss in dev/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass
        .pipe(gulp.dest('dev/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

var reload = browserSync.reload;
// Watchers
gulp.task('watch', function() {
    gulp.watch('dev/scss/**/*.scss', ['sass']);
    gulp.watch('dev/*.html', reload);
    gulp.watch('dev/js/**/*.js', reload);
    gulp.watch('dev/lib/**/*.js', reload);
    gulp.watch('dev/**/*.+(png|jpg|jpeg|gif|svg|ttf)', reload);
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
    return gulp.src('dev/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', autoprefixer()))
        .pipe(gulpIf('*.css', csso()))
        .pipe(gulp.dest(publicFolder));
});

// Optimizing Images 
gulp.task('images', function() {
    return gulp.src('dev/**/*.+(ico|png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest(publicFolder));
});

// Copying other files 
gulp.task('copy', function() {
    return gulp.src('dev/**/*.+(xml|json)')
        .pipe(gulp.dest(publicFolder));
});
gulp.task('copy:cname', function() {
    return gulp.src('dev/+(CNAME|sw.js)')
        .pipe(gulp.dest(publicFolder));
});
// Cleaning
gulp.task('clean', function() {
    return del.sync(publicFolder);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync'], 'watch',
        callback
    );
});

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'sass', ['useref', 'images', 'copy', 'copy:cname'],
        callback
    );
});
