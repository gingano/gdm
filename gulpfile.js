'use strict'

let gulp = require('gulp')
let browserSync = require('browser-sync').create()
let surge = require('gulp-surge')
let ghPages = require('gulp-gh-pages')

function fastDeploy () {
  return surge({
    project: './dist',
    domain: 'gdm.gingano.surge.sh'
  })
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./css/*.css').on('change', browserSync.reload)
  gulp.watch('./dist/js/*js').on('change', browserSync.reload)
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
}

function deploy() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
}

exports.watch = watch
exports.deploy = deploy
exports.surge = fastDeploy