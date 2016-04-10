"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms JSX into JS
var source = require('vinyl-source-stream'); // Use conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
	port: 9006,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		img: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css',
			'src/css/custom.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
	}
};

// Start a local development server
gulp.task('connect', function (){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}))
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('js', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('copy-bs-fonts', function(){
  return gulp.src('node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(config.paths.dist + '/fonts/'));
});

// Migrates images to dist folder
// Note I could even optimize images here
gulp.task('images', function(){
	gulp.src(config.paths.img)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());

		// Publish favicon
		gulp.src('./src/favicon.ico')
			.pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'copy-bs-fonts', 'images', 'lint', 'open', 'watch']);
