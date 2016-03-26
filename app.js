var express   = require('express'),
		path      = require('path'),
		mongoose  = require('mongoose'),
		chalk     = require('chalk'),
		config    = require('./config/config'),
		routes    = require('./src/routes/routes.js');
var	app = express();

var db = mongoose.connect(config.db, function(err){
	if(err){
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'src/views'));

app.use(routes.router);
app.use('/static', express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT || 3000, function(){
	console.log('The frontend server is now running on port 3000!');
});

