var express = require('express'),
		path = require('path');
		routes = require('./src/routes/routes.js');
var	app = express();


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'src\\views'));


app.use(routes.router);
app.use('/static', express.static(path.join(__dirname ,'public')));

app.listen(3000, function(){
	console.log('The frontend server is now running on port 3000!');
});

