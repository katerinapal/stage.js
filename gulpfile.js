import ext_fs_fs from "fs";
import ext_browserify_browserify from "browserify";
import ext_gulp_gulp from "gulp";
import ext_gulputil_gutil from "gulp-util";
import ext_gulpuglify_uglify from "gulp-uglify";
import ext_gulpheader_header from "gulp-header";
import ext_gulprename_rename from "gulp-rename";
import ext_vinyltransform_transform from "vinyl-transform";
import ext_vinylsourcestream_source from "vinyl-source-stream";
import ext_vinylbuffer_buffer from "vinyl-buffer";

var pkg = {};

ext_gulp_gulp.task('default', [ 'web', 'cordova' ]);
ext_gulp_gulp.task('web', dist([ './platform/web' ], 'web'));
ext_gulp_gulp.task('cordova', dist([ './platform/cordova' ], 'cordova'));

function dist(files, name) {
  return function() {
    var task = ext_browserify_browserify({
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
      console.log(ext_gulputil_gutil.colors.red(err.message));
      this.emit('end');
    });
    task = task.pipe(ext_vinylsourcestream_source('stage.' + name + '.js')).pipe(ext_vinylbuffer_buffer()); // vinylify
    task = task.pipe(ext_gulpheader_header(ext_fs_fs.readFileSync('lib/license.js'), {
      pkg : pkg
    }));
    task = task.pipe(ext_gulp_gulp.dest('dist'));
    task = task.pipe(ext_gulprename_rename('stage.' + name + '.min.js'));
    task = task.pipe(ext_gulpuglify_uglify({
      output : {
        comments : /(license|copyright)/i
      }
    }));
    task = task.pipe(ext_gulp_gulp.dest('dist'));
    return task;
  };
}