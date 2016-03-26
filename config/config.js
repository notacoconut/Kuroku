module.exports = {
	app: {
		title: 'kuroku',
		desciption: 'An app for tracking labor time',
		keywords: 'mongoDB, express, angularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/kuroku'
};