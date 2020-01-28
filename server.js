import Path from "path";
import Express from "express";
import Browserify from "browserify-middleware";
import ServeIndex from "serve-index";

var app = Express();

app.set('port', process.env.PORT || 6565);

if ('development' == app.get('env')) {
  app.use('/dist/stage.web.js', Browserify('./platform/web.js', {
    standalone : 'Stage'
  }));
}
app.use(Express.static(__dirname));

app.get('/', function(req, res) {
  res.redirect('./example/')
});

app.use(ServeIndex(__dirname, {
  icons : true,
  css : 'ul#files li{float:none;}' // not actually working!
}));


app.listen(app.get('port'), function() {
  console.log('Checkout http://localhost:' + app.get('port'));
});