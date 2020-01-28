var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _browserifyMiddleware = require("browserify-middleware");

var _browserifyMiddleware2 = _interopRequireDefault(_browserifyMiddleware);

var _serveIndex = require("serve-index");

var _serveIndex2 = _interopRequireDefault(_serveIndex);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

app.set('port', process.env.PORT || 6565);

if ('development' == app.get('env')) {
  app.use('/dist/stage.web.js', (0, _browserifyMiddleware2.default)('./platform/web.js', {
    standalone: 'Stage'
  }));
}
app.use(_express2.default.static(__dirname));

app.get('/', function (req, res) {
  res.redirect('./example/');
});

app.use((0, _serveIndex2.default)(__dirname, {
  icons: true,
  css: 'ul#files li{float:none;}' // not actually working!
}));

app.listen(app.get('port'), function () {
  console.log('Checkout http://localhost:' + app.get('port'));
});
