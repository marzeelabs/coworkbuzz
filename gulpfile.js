var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    cp = require('child_process'),
    harp = require('harp'),
    harpConfig = require('./harp.json'),
    jimp = require('gulp-jimp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');


/**
 * Serve the Harp Site
 */
gulp.task('serve', ['fast-build'], function () {
  harp.server('.', {
    port: 3330
  }, function () {
    browserSync({
      proxy: "localhost:3330",
      open: false,
      port: 3333,
      ui: {
        port: 3335
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["public/**/*.scss"], function () {
      reload("public/css/app.css", {stream: true});
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });

    /**
     * Watch for image changes
     */
    gulp.watch(["public/_posts-images/*"], ['jimp']);
    gulp.watch(["public/images/**/*"], function () {
      reload();
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });

    /**
     * Watch for JS changes
     */
    gulp.watch(["public/_scripts/*.js"], ['uglify']);
    gulp.watch(["public/js/**/*"], function () {
      reload();
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });

    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["public/**/*.jade", "public/**/*.json", "public/**/*.md", "public/**/*.ejs"], function () {
      reload();
      cp.exec('harp compile . www', {stdio: 'inherit'});
    });
  });
});


/**
 * Serve the Harp Site in production
 */
gulp.task('serveprod', ['build'], function() {
  harp.server('.', {
    port: process.env.PORT || 5000
  }, function () {
  });
});


/**
 * Build the Harp Site
 */
gulp.task('build', ['copy-css-assets', 'jimp', 'uglify'], function () {
  return cp.exec('harp compile . www', {stdio: 'inherit'});
});

/**
 * Build the Harp Site without jimp
 */
gulp.task('fast-build', ['copy-css-assets', 'uglify'], function () {
  return cp.exec('harp compile . www', {stdio: 'inherit'});
});


// Jimp variables
var imgSrc          = 'public/_posts-images/*',
    imgDest         = 'public/images/posts/',
    imgQuality      = 80,
    largeWidth      = harpConfig.globals.breakpoints.large,
    regularWidth    = harpConfig.globals.breakpoints.regular,
    mediumWidth     = harpConfig.globals.breakpoints.medium,
    smallWidth      = harpConfig.globals.breakpoints.small;

// Clean the image folder
gulp.task('jimp-clean', function() {
  return cp.exec('rm ' + imgDest + '*', {stdio: 'inherit'});
});

// Copy original image
gulp.task('jimp-original', function() {
  return gulp.src(imgSrc).pipe(gulp.dest(imgDest));
});

// Create large image
gulp.task('jimp-large', function() {
  return gulp.src(imgSrc).pipe(jimp({
    '-large': {
      resize: { width: largeWidth, height: jimp.AUTO },
      quality: imgQuality
    }
  })).pipe(gulp.dest(imgDest));
});

// Create Regular image
gulp.task('jimp-regular', function() {
  // Regular image
  return gulp.src(imgSrc).pipe(jimp({
    '-regular': {
      resize: { width: regularWidth, height: jimp.AUTO },
      quality: imgQuality
    }
  })).pipe(gulp.dest(imgDest));
});

// Create Medium image
gulp.task('jimp-medium', function() {
  return gulp.src(imgSrc).pipe(jimp({
    '-medium': {
      resize: { width: mediumWidth, height: jimp.AUTO },
      quality: imgQuality
    }
  })).pipe(gulp.dest(imgDest));
});

// Create Small image
gulp.task('jimp-small', function() {
  return gulp.src(imgSrc).pipe(jimp({
    '-small': {
      resize: { width: smallWidth, height: jimp.AUTO },
      quality: imgQuality
    }
  })).pipe(gulp.dest(imgDest));
});

/**
 * Create responsive images with JIMP
 *
 * We divide this into several tasks so we can have a callback
 * and make sure 'build' runs after it's finished.
 */
gulp.task('jimp', function (callback) {
  runSequence(
    'jimp-clean',
    ['jimp-original','jimp-large', 'jimp-regular', 'jimp-medium', 'jimp-small'],
    callback
  );
});


/**
 * Copy css assets from NODE Modules
 */
gulp.task('copy-css-assets', function() {
  return gulp.src(
  /** Insert below the css path **/
  ['  ']
  ).pipe(gulp.dest('./public/css/vendors'));
});

/**
 * Copy js assets from NODE Modules
 */
gulp.task('copy-js-assets', function() {
  return gulp.src(
  /** Insert below the js path **/
  ['  ']
  ).pipe(gulp.dest('./public/_scripts'));
});


/**
 * Concatenate JS files
 */
gulp.task('uglify', ['copy-js-assets'], function () {
  return gulp.src([
    'public/_scripts/jquery-1.10.2.min.js',
    'public/_scripts/jquery.countdown.min.js',
    'public/_scripts/site.js'
  ]).pipe(concat('site.min.js')).pipe(uglify()).pipe(gulp.dest('public/js'));
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);

