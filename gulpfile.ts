"use strict";

const gulp = require("gulp");
const os = require('os');

const dir_build = "build";
const dir_app = dir_build+"/app";
const hash = "__hash__";
const dir_hash = dir_app+"/"+hash;
const dir_assets = dir_hash+"/assets";
const dir_webapp = "webapp";
const dir_server = dir_app;
const dir_temp = dir_build+"/temp";

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var config ={
    port:'3000',
    baseDevUrl:'http://localhost',
    paths: {
        html: './'+dir_webapp+'/*.html',
        dist:'./'+dir_app
    }
};

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
const del = require("del");
const tsc = require("gulp-typescript");
const tsProject = tsc.createProject("tsconfig.json");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
var runSequence = require('gulp-run-sequence');
/***********************************/

/** Remove build Directory **/
gulp.task('clean', (cb) => {
    return del([dir_build], cb);
});
/***********************************/

/** Build CSS to app.min.css **/
//Compile Less/Css 
gulp.task('compile-less-to-css', [], function () {
  return gulp.src(dir_webapp+"/**/*.less")
    .pipe(plugins.less())
    .pipe(gulp.dest(dir_temp+"/css"));
});
//Minify all css
gulp.task('minify-css', ["compile-less-to-css"], function () {
  return gulp.src([dir_assets+"/css/**/*.css", dir_temp+"/css/**/*.css", ""!+dir_temp+"/css/**/*.min.css"])
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dir_temp+"/css"));
});
//build final css to concat files css to one css
gulp.task('build-css', ["minify-css"], function () {
  return gulp.src(dir_temp+"/css/**/*.min.css")
    .pipe(plugins.concatCss("app.min.css"))
    .pipe(gulp.dest(dir_hash))
    .pipe(plugins.livereload());
});
/***********************************/

/** Build default html **/
gulp.task("build-index-html",() => {
    return gulp.src([dir_webapp+"/index.html", dir_webapp+"systemjs.config.js"])
        .pipe(gulp.dest(dir_app))
        .pipe(plugins.htmlMinifier({collapseWhitespace: true}))
        .pipe(plugins.livereload());
});
/***********************************/

/** Build all assets **/
gulp.task('optimise-img', function () {
  return gulp.src(dir_webapp+"/assets/**/*.{png,jpg,jpeg,gif,svg}")
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(dir_assets));
});

gulp.task("build-assets", ["optimise-img"], () => {
    return gulp.src([dir_webapp+"/assets/**/*", "!**/*.{ts,less,css,png,jpg,jpeg,gif,svg}"])
        .pipe(gulp.dest(dir_assets))
        .pipe(plugins.livereload());
});
/***********************************/

/** Build html **/
gulp.task("build-html", ["build-index-html"], () => {
});
/***********************************/

/** Build dependencies **/
gulp.task("build-dependencies", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            'ng2-interceptors/**/*',
            '@angular/**/bundles/**',
            '@angular/material/**/*'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest(dir_hash+"/vendor"))
        .pipe(plugins.livereload());
});
/***********************************/

/** Build all TypeScript files **/
//Lint all custom TypeScript files
gulp.task('tslint', () => {
    return gulp.src(dir_webapp+"/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});
 //Compile TypeScript sources and create sourcemaps in build directory.
gulp.task("create-ts-sourcesmaps", ["tslint"], () => {
    let tsResult = gulp.src(dir_webapp+"/**/*.ts")
        .pipe(plugins.angularEmbedTemplates({basedir: hash, sourceType:'ts'}))
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir_hash));
});

gulp.task("build-app", ["create-ts-sourcesmaps", 'build-html'], () => {
    return gulp.src([dir_webapp+"/**/*", "!**/*.{ts,less,html}","!assets/"])
        .pipe(gulp.dest(dir_hash))
        .pipe(plugins.livereload());
});
/***********************************/

//Build server
gulp.task("build-server", ["create-ts-sourcesmaps"], () => {
    /*return gulp.src(["node_modules/lite-server"])
        .pipe(gulp.dest(dir_server));*/
});
gulp.task("build-server-index", () => {
    return gulp.src([dir_app+"/index.html"])
        .pipe(gulp.dest(dir_server));
});

/***********************************/

/** BUILD ALL **/
gulp.task("clean-temp", ['build-server', 'build-dependencies', 'build-index-html', 'build-css', 'build-assets', "build-app"], (cb) => {
    return del([dir_temp], cb);
});

gulp.task("build", ['clean'], (cb) => {
    runSequence("clean-temp", cb);
});
/***********************************/

/** WATCH MODIFICATION ALL **/
gulp.task('watch', function () {
    plugins.livereload.listen(35732);
     gulp.watch([dir_webapp+"/**/*.ts"], ['build-app']).on('change', function(event) {
        plugins.livereload.changed();
        console.log('File TS', event.path, 'was', event.type);
        console.log('LiveReload is triggered');
    });
     gulp.watch([dir_webapp+"/**/*.less"], ['build-css']).on('change', function(event) {
        plugins.livereload.changed();
        console.log('File LESS', event.path, 'was', event.type);
        console.log('LiveReload is triggered');
    });
     //gulp.watch([dir_webapp+"/assets/**/*", "!**/*.{ts,less,html}"], ['build-assets']).on('change', function(event) {
       // plugins.livereload.changed();
        //console.log('File ASSETS', event.path, 'was', event.type);
        //console.log('LiveReload is triggered');
    //});
     gulp.watch([dir_webapp+"/**/*.html"], ['build-app']).on('change', function(event) {
        plugins.livereload.changed();
        console.log('File HTML', event.path, 'was', event.type);
        console.log('LiveReload is triggered');
    });
});
/** OPEN BROWSER **/
gulp.task('open-browser',function(){
       gulp.src('')
           .pipe(plugins.open({ uri: config.baseDevUrl +':'+ config.port +'', app:browser}));
});

/***********************************/
/************ FOR SERVER ***********/
/***********************************/

/** SERVER **/
gulp.task('start-server', function (cb) {
    var server = plugins.liveServer.static(dir_app+'/', config.port);
    server.start();
    runSequence("open-browser", cb);
});

gulp.task('server', ['start-server'], function (cb) {
    runSequence("watch", cb);
});

/** SERVE **/
gulp.task('start-serve', ['build'], function (cb) {
    var server = plugins.liveServer.static(dir_app+'/', config.port);
    server.start();
    runSequence("open-browser", cb);
});
gulp.task('serve', ['start-serve'], function (cb) {
    runSequence("watch", cb);
});
/***********************************/