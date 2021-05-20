require('dotenv').config();
const bodyParser 			= require('body-parser');
const cookieParser		= require('cookie-parser');
const express 				= require('express');
const cookieSession 	= require('cookie-session')
const logger 					= require('morgan');
const path 						= require('path');
const session 				= require('express-session');
const passport 				= require('passport');
const cors 						= require('cors');
const flash 					= require('connect-flash');

//Imported Configs
require('./configs/database-config');
require('./configs/passport-config');
// ---- require('./configs/cloudinary-config');  --- !!

const app = express();

//Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


//Session config
app.set('trust proxy', 1)
app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))
app.use(session({
	secret: 'secret-again',
	resave: true,
	saveUninitialized: true,
	cookie: {
		sameSite: 'none',
		secure: true
	}
}));

//Middleware passport
app.use(passport.initialize());
app.use(passport.session());

//Cors middleware
app.use(
	cors({
		credentials: true,
		origin: [process.env.FRONTEND_POINT, "http://localhost:3000" ] 
	})
);

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth-routes'));

// app.use((req, res, next)=>{
// 	res.sendFile(__dirname + "/public/index.html")
// })

module.exports = app;
