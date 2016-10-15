var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');

var serverFiles = ['*.js', 'server/**/*.js'];

gulp.task('test-server', function (){
    gulp.src('./test/server/**/*spec.js').pipe(jasmine());
});

gulp.task('server', [], function() {
    var options = {
        script: './bin/www',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: serverFiles
    };
    return nodemon(options)
        .on('restart', function(e) {
            console.log('Restarting Server...');
        });
});