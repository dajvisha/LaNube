import * as express from 'express'
import * as bodyParser from 'body-parser';
import { connect, connection } from "mongoose";
import * as session from 'express-session';
import * as mongoConnect from 'connect-mongo';

import serverConfig from './config';

var MongoStore = mongoConnect(session);

// MongoDB Connection
connect(serverConfig.mongoURL, { useMongoClient: true }, (error: any) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

const app = express();

// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
  res.header("Access-Control-Allow-Credentials",  "true");

  if ('OPTIONS' === req.method){
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: connection
  })
}));

// Router
var usersRoutes = require('./routes/users');
var categoriesRoutes = require('./routes/categories');
var resourcesRoutes = require('./routes/resources');
var sessionsRoutes = require('./routes/sessions');
var tagsRoutes = require('./routes/tags');
var errorHandler = require('./routes/errorHandler');

app.use('/api', sessionsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/tags', tagsRoutes);
app.use(errorHandler);

app.use(function(_, res, __) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
  res.header("Access-Control-Allow-Credentials",  "true");
  
  res.status(404).json("Not found");
});

// start app
app.listen(serverConfig.port, (error: any) => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}!`);
  }
});

export default app;