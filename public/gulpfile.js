var gulp = require('gulp'), 
sass = require('gulp-ruby-sass') ,
notify = require("gulp-notify") ,
bower = require('gulp-bower');

var config = {
     sassPath: 'resources/sass',
    jsPath:   'js',
    htmlPath: '../app/Modules/**/*.blade.php',
     bowerDir: 'bower_components' ,
    resourceDir: 'resources'
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
    .pipe(gulp.dest('./resources/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/main.scss')
         .pipe(sass({
             style: 'expanded',
             loadPath: [
                 'resources/sass',
                 config.resourceDir + '/bootstrap/scss'
            ]
         }) 
        .on("error", notify.onError(function (error) {
             return "Error: " + error.message;
         }))) 
         .pipe(gulp.dest('./css'))
    ;
});

gulp.task('js', function(){
    return gulp.src(config.jsPath + '/')
               .pipe(gulp.dest('./temp-js'))
               .pipe(browserSync.stream())
});

gulp.task('server', function() {
     browserSync.init({
        open: 'external',
        host: 'crm.dev',
        proxy: 'http://crm.dev',
        port: 8080
    });
});

 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
    gulp.watch(config.jsPath + '/**/*.js', ['js']); 
    gulp.watch(config.htmlPath).on('change', browserSync.reload);
});

   gulp.task('default', ['bower', 'icons', 'css', 'watch','server']);
