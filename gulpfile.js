// Importar las funciones específicas de la API de gulp que vamos a utilizar
const { src, dest, series, parallel, watch } = require('gulp');

// Importar los paquetes con los que vamos a trabajar
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
//constantes nuevas funciones
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const imageMin = require('gulp-imagemin')

// Constantes de trabajo
const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html',
    jvsPath: 'src/js/**/*.js',
    imgPath: 'src/images/**/*'
}

function helloWorldTask(result) {
    console.log("hello world! :D");
    result();
}

/**
 * Compilar los archivos de sass en estilos en cascada para el navegador (CSS)
 */
function scssTask() {
    return src(files.scssPath)
        .pipe(sass())
        .pipe(dest('dist/css'));
}


/**
 * Observar cambios en los archivos de sass para compilarlos automaticamente
 */
function watchTask() {
    watch(
        [files.scssPath, files.htmlPath, files.jvsPath, files.imgPath],
        series(scssTask, minifyJVSTask, imgTask, reloadTask)
    )
}


function serveTask(d) {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    d();
}


function reloadTask(d) {
    browserSync.reload();
    d();
}

/**Compilador de archivos de scss a css
*se pasan archivos de scss a CSS
*se minifica el CSS producido por el SASS
*/
function compscssTask(done){
    return  scr(files.jvsPath)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('dist/css'));
}
/**
 * funcion para poder minificar los archivos JavaScript
 */
function minifyJVSTask(done){
    return src(files.jvsPath)
    .pipe(uglify())
    .pipe(dest('dist/js'))
}
/**
 * funcion para las imagenes
 */
function imgTask(done){
    return src(files.imgPath)
    .pipe(imageMin())
    .pipe(dest('dist/images'))
}



exports.default = series(scssTask, serveTask, watchTask);
exports.imageTask = imgTask;