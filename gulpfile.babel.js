'use strict';

import babelRegister from 'babel-register';
import path from 'path';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import excludeGitignore from 'gulp-exclude-gitignore';
import mocha from 'gulp-mocha';
import coveralls from 'gulp-coveralls';
import istanbul from 'gulp-istanbul';
import nsp from 'gulp-nsp';
import plumber from 'gulp-plumber';

// gulp.task('lint', () =>
//   gulp.src('*|)}>#*.js')
//     .pipe(excludeGitignore())
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
// );

gulp.task('nsp', (cb) => { nsp({ package: path.resolve('package.json') }, cb); });

gulp.task('pre-test', () =>
  gulp.src('generators/app/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      instrumenter: require('isparta').Instrumenter,
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], (cb) => {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec', compilers: { js: babelRegister } }))
    .on('error', (err) => { mochaErr = err; })
    .pipe(istanbul.writeReports())
    .on('end', () => { cb(mochaErr); });
});

gulp.task('coveralls', ['test'], () => {
  if (process.env.CI) {
    return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
      .pipe(coveralls());
  }

  return undefined;
});

gulp.task('watch', () => { gulp.watch(['generators/**/*.js', 'test/**'] , ['test']); });

gulp.task('prepublish', ['nsp', 'coveralls']);
gulp.task('default', [/* 'lint',  */'test']);
