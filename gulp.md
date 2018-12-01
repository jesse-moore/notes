# Setup
```bash
npm install gulp-cli -g
npm install gulp -D
touch gulpfile.js
gulp --help
```

# gulp.js
```js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var jsSources = ['**/*.js'],
    hbsSources = ['**/*.hbs'],
    cssSources = ['public/stylesheets/*.css'],
    allSources = hbsSources.concat(cssSources).concat(jsSources);

// Call gulp serve to start server
gulp.task('serve', ['nodemon'], function () {
});

// browser-sync setup 
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000", // Location and port app is running on
        files: allSources, // Files to be watched for changes
        port: 7000, // Port the app will be displayed on in web browser
        ui: {
            port: 8080
        }
    }); 
});

// nodemon setup
gulp.task('nodemon', ['browser-sync'], function (cb) {
    var started = false;
    var stream = nodemon({ 
        script: './bin/www',
        // ext: 'html js', // File types to be watched for changes
        // ignore: ['ignored.js'], // Files to be ignored
        // tasks: [] // Tasks to run on each start / restart
    })
    stream
    .on('start', function () {
        if (!started) {
            cb();
            started = true; 
        } 
    })
    .on('restart', function () {
    console.log('restarted!')
    })
    .on('crash', function() {
    console.error('Application has crashed!\n')
    stream.emit('restart', 10)  // restart the server in 10 seconds
    });
});
```
eslint

jasmine phantom
