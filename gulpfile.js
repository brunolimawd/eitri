'use strict';

var gulp = require('gulp');
var plugin = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var publicUrl = '';

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 15',
  'chrome >= 30',
  'safari >= 5',
  'opera >= 23',
  'ios >= 6',
  'android >= 2.3',
  'bb >= 10'
];

// lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('js/app/*.js')
    .pipe(reload({stream: true, olsnce: true}))
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter('jshint-stylish'))
    .pipe(plugin.if(!browserSync.active, plugin.jshint.reporter('fail')));
});

// otimizando imagens
gulp.task('images-conetnt', function () {
  return gulp.src(['img/content/*'])
    .pipe(plugin.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('img/content/'));
});

gulp.task('images-layout', function () {
  return gulp.src(['img/layout/*'])
    .pipe(plugin.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('img/layout/'));
});

// copilando o less e adicionando os prefix
gulp.task('styles', function () {
  return gulp.src(['assets/styles/less/*.less'])
    .pipe(plugin.changed('styles', {extension: '.less'}))
    .pipe(plugin.less().on('error', console.error.bind(console)))
    .pipe(plugin.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(plugin.csso())
    .pipe(gulp.dest('assets/styles/dist'));
});

// observando mudanças para da reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    proxy: 'localhost:8080'
  });

  gulp.watch(['assets/styles/less/*.less'], ['styles']);
  gulp.watch(['assets/styles/dist/*.css'], reload);
  gulp.watch(['js/app/*.js'], ['jshint']);
  gulp.watch(['img/content/*', 'img/layout/*'], reload);
});

// google pagespeed insights
// trocar a variavel 'publicUrl' quando o site estiver publico
gulp.task('pagespeed-mobile', pagespeed.bind(null, {
  url: publicUrl,
  strategy: 'mobile'
}));

gulp.task('pagespeed-desktop', pagespeed.bind(null, {
  url: publicUrl,
  strategy: 'desktop'
}));

// Task padrão, exibe o menu de tasks
gulp.task('default', function (callback) {
  plugin.menu(this);
});