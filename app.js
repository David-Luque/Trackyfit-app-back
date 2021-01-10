const bodyParser 			= require('body-parser');
const cookieParser		= require('cookie-parser');
const express 				= require('express');
const cookieSession 	= require('cookie-session')
const logger 					= require('morgan');
const hbs 						= require('hbs');
const path 						= require('path');
const session 				= require('express-session');
const passport 				= require('passport');
const cors 						= require('cors');
const flash 					= require('connect-flash');
require('dotenv').config();


//1. Databse configuration
const mongoose = require('mongoose');

mongoose
	.connect(`mongodb+srv://david_lq_lb:${process.env.DB_PASS}@cluster0.algat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log(`Connected to ${process.env.DB_NAME} !`);
	})
	.catch((err) => {
		console.log('error connecting to Mongo: ', err);
	});

const app = express();

//2. Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//3. Cors middleware
app.use(
	cors({
		credentials: true,
		origin: ["https://trackifit.netlify.app" ] 
	})
);

//4. Session configuration
app.set('trust proxy', 1)
app.use(cookieSession({
    name:'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))
app.use(
	session({
		secret: 'secret-again',
		resave: true,
		saveUninitialized: true,
		cookie: {
			sameSite: 'none',
			secure: true
		}
	})
);

//5. Passport configuration
require('./config/passportConfig');

//6. Middleware passport
app.use(passport.initialize());
app.use(passport.session());

//7. Routes
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

module.exports = app;
