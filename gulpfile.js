import fs from "fs";
import browserify from "browserify";
import gulp from "gulp";
import gutil from "gulp-util";
import uglify from "gulp-uglify";
import header from "gulp-header";
import rename from "gulp-rename";
import transform from "vinyl-transform";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

var pkg = require('./package.json');

gulp.task('default', [ 'web', 'cordova' ]);
gulp.task('web', dist([ './platform/web' ], 'web'));
gulp.task('cordova', dist([ './platform/cordova' ], 'cordova'));

function dist(files, name) {
  return function() {
    var task = browserify({
      entries : files,
      standalone : 'Stage'
    });
    task = task.transform({
      fromString : true,
      compress : false,
      mangle : false,
      output : {
        beautify : true,
        comments : /^((?!@license)[\s\S])*$/i
      }
    }, 'uglifyify');
    task = task.bundle();
    task.on('error', function(err) {
      console.log(gutil.colors.red(err.message));
      this.emit('end');
    });
    task = task.pipe(source('stage.' + name + '.js')).pipe(buffer()); // vinylify
    task = task.pipe(header(fs.readFileSync('lib/license.js'), {
      pkg : pkg
    }));
    task = task.pipe(gulp.dest('dist'));
    task = task.pipe(rename('stage.' + name + '.min.js'));
    task = task.pipe(uglify({
      output : {
        comments : /(license|copyright)/i
      }
    }));
    task = task.pipe(gulp.dest('dist'));
    return task;
  };
}