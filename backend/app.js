const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const projectRouter = require('./routes/projectRoutes');
const restaurantRouter = require('./routes/restaurantRoutes');
const hotelRouter = require('./routes/hotelRoutes');
const eventRouter = require('./routes/eventRoutes');
const transferRouter = require('./routes/transferRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.enable('trust proxy');

// GLOBAL MIDDLEWARES

//Sets security HTTP headers
app.use(helmet());

app.use(cors());
//To allow cors only from the react app
//app.use(cors({origin: 'https://www.cuttevents-backend.com}))

//options is an http method that we can response to (pre-flight phase)
app.options('*', cors());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limits requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/', limiter);

//Body parser - reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use('/public', express.static(`${__dirname}/storage`));

//reading the cookie
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevents parameter pollution
app.use(
  hpp({
    whitelist: ['price'],
  })
);

app.use(compression());

app.use('/v1/projects', projectRouter);
app.use('/v1/restaurants', restaurantRouter);
app.use('/v1/hotels', hotelRouter);
app.use('/v1/events', eventRouter);
app.use('/v1/transfers', transferRouter);
app.use('/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
