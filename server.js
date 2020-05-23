import ext_path_Path from "path";
import ext_express_Express from "express";
import ext_browserifymiddleware_Browserify from "browserify-middleware";
import ext_serveindex_ServeIndex from "serve-index";

var app = ext_express_Express();

app.set('port', process.env.PORT || 6565);

if ('development' == app.get('env')) {
  app.use('/dist/stage.web.js', ext_browserifymiddleware_Browserify('./platform/web.js', {
    standalone : 'Stage'
  }));
}
app.use(ext_express_Express.static(__dirname));

app.get('/', function(req, res) {
  res.redirect('./example/')
});

app.use(ext_serveindex_ServeIndex(__dirname, {
  icons : true,
  css : 'ul#files li{float:none;}' // not actually working!
}));


app.listen(app.get('port'), function() {
  console.log('Checkout http://localhost:' + app.get('port'));
});