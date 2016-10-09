var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var childProcess = require('child_process');

var serverFiles = ['*.js', 'server/**/*.js'];
var runExec = function (command) {
    return function(callback) {
        childProcess.exec(command, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            callback(err);
        })
    }

};

gulp.task('start-mongo', runExec('start mongod'));

gulp.task('dev-server', [], function() {
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