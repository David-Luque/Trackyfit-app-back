require('dotenv').config({ path: 'vars.env' });
const express 					= require('express');
//const bodyParser 			= require('body-parser');
//const cookieParser		= require('cookie-parser');
// const cookieSession 	= require('cookie-session')
//const logger 					= require('morgan');
//const path 						= require('path');
//const session 				= require('express-session');
//const passport 				= require('passport');
const cors 							= require('cors');
//const flash 					= require('connect-flash');
const connectToDB = require('./configs/database.config');

const app = express();

//Imported Configs
connectToDB();
require('./configs/passport.config');
require('./configs/cloudinary.config');

//const app_name = require('./package.json').name;
//const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

//Cors middleware
app.options('*', cors());
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_POINT
	})
);

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



//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/api/exercises', require('./routes/exercise'));
app.use('/api/results', require('./routes/result'));
app.use('/api/workouts', require('./routes/workout'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/measure', require('./routes/measures'));


app.use((req, res, next)=>{
	res.sendFile(__dirname + "/public/index.html")
})


module.exports = app;
