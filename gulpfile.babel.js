'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import babel from "gulp-babel";
import del from "del";
import ngAnnotate from'gulp-ng-annotate';
import uglify from 'gulp-uglifyjs';
import htmlmin from 'gulp-htmlmin';

const dirs = {
	src: 'app',
	dest: 'dist',
	scriptdest: 'dist/scripts',
	sass: function(){
		return {
			src: `${this.src}/styles/*.scss`,
			dest: `${this.dest}/styles/`
		};
	}
};

gulp.task('styles', () => {
	return gulp.src(dirs.sass().src)
			.pipe(sourcemaps.init())
			.pipe(sass.sync({
				outputStyle: 'expanded',
				precision: 10,
				includePaths: ['.']
			}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(dirs.sass().dest))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
		    .pipe(sourcemaps.init())
		    .pipe(ngAnnotate())
		    .pipe(babel())
		    // .pipe(uglify({outSourceMap: true, basePath: "app/scripts", sourceRoot: "http://localhost:3000"}))
		    .pipe(sourcemaps.write('.'))
		    .pipe(gulp.dest('dist/scripts/'))
		    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', () =>{
	return gulp.src('app/**/*.html')
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest(dirs.dest));
});

gulp.task('clean', del.bind(null, [dirs.dest]));
gulp.task('cleanjs', del.bind(null, [dirs.scriptdest]));

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['dist'],
      routes: {
      	'/bower_components': 'bower_components'
      }
    }
  });
});

gulp.task('serve', ['html', 'styles', 'scripts'], () => {
	// gulp.task('serve:dist');
	browserSync({
	    notify: true,
	    port: 3000,
	    ui: false,
	    server: {
	      baseDir: 'dist',
	      routes: {
	        '/bower_components': 'bower_components'
	      }
	    }
	});
	gulp.watch([
			`${dirs.src}/index.html`,
			`${dirs.src}/scripts/**/*.html`
		], ['html']).on('change', browserSync.reload);
	gulp.watch(dirs.sass().src, ['styles']);
	gulp.watch(['app/scripts/**/*.js'], ['scripts']);
});