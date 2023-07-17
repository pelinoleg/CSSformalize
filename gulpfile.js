const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');



function sassTask() {
	return src('./scss/*.scss')
		// .pipe(plumber())
		// .pipe(sourcemaps.init()) // Инициализация source map
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		// .pipe(sourcemaps.write('.')) // Запись source map
		.pipe(dest(`./css`));
}

function serve() {
	browserSync.init({
		server: `./`
	});

	watch('./scss/*.scss', sassTask);
	watch(['./css/**/*', './*.html']).on('change', browserSync.reload);

}



exports.default = series(sassTask, serve);
