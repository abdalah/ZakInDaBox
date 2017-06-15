/*var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(3000);
*/


var express = require('express')
    , app = module.exports = express();

app.use(express.static(__dirname + '/public'));
 
// Using the .html extension instead of
// having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
 
// Set the folder where the pages are kept
app.set('views', __dirname + '/views');
 
// This avoids having to provide the 
// extension to res.render()
app.set('view engine', 'html');
 
// Serve the index page
app.get('/', function(req, res){
  res.render('index', {
    // PLACEHOLDER
    pageTitle: 'EJS Demo'
  });
});
 
if (!module.parent) {
  app.listen(3000);
  console.log(__dirname);
}
