require('dotenv').config({ path: 'vars.env' });
const express 				= require('express');
//const bodyParser 			= require('body-parser');
//const cookieParser		= require('cookie-parser');
// const cookieSession 	= require('cookie-session')
//const logger 					= require('morgan');
//const path 						= require('path');
//const session 				= require('express-session');
//const passport 				= require('passport');
const cors 						= require('cors');
//const flash 					= require('connect-flash');

//Imported Configs
require('./configs/database.config');
require('./configs/passport.config');
require('./configs/cloudinary.config');

//const app_name = require('./package.json').name;
//const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


const app = express();

//MIDDLEWARE SETUP
//app.use(logger('dev'));
app.use(express.json({ extended: true }));
//app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(flash());


//Session config
// app.set('trust proxy', 1)
// app.use(cookieSession({
//     name:'session',
//     keys: ['key1', 'key2'],
//     sameSite: 'none',
//     secure: true
// }))

// app.use(session({
// 	secret: 'my-requetesecret',
// 	resave: true,
// 	saveUninitialized: true,
// 	// cookie: {
// 	// 	sameSite: 'none',
// 	// 	secure: true
// 	// }
// }));

//Middleware passport
// app.use(passport.initialize());
// app.use(passport.session());

//Cors middleware
app.options('*', cors());
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_POINT
	})
);

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth-routes'));
app.use('/', require('./routes/exercise-routes'));
app.use('/', require('./routes/result-routes'));
app.use('/', require('./routes/workout-routes'));
app.use('/', require('./routes/metrics-routes'));
app.use('/', require('./routes/measures-routes'));


app.use((req, res, next)=>{
	res.sendFile(__dirname + "/public/index.html")
})


module.exports = app;
