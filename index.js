var express = require('express')
    , app = module.exports = express();

process.env.NODE_ENV = 'production';

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

app.listen(process.env.PORT || 3001);