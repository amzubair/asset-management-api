import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { uptime } from 'os';
import moment from 'moment';
import path from 'path'
import config from './config/main'

// development Logging
import morgan from 'morgan';
import errorhandler from 'errorhandler';

// Environment Variables
let ENV = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


if (process.env.NODE_ENV === 'development') {
	// development code
	app.use(morgan('dev'));
	app.use(errorhandler());
};

if (process.env.NODE_ENV === "production") {
	// Production code
}

app.get('/', (req, res) => {
	res.send('test data')
})


let server = http.createServer(app).listen(config.port, (err) => {
	process.startTime = moment().format('HH:MM:SS');
	process.startDate = moment().format('DD/MM/YYYY');
	console.log('-----------------------------------------------------')
	console.log('      Status: Application Started');
	console.log(' Environment: ' + ENV);
	console.log('        Port: ' + server.address().port);
	console.log('  Start Date: ' + process.startDate);
	console.log('  Start Time: ' + process.startTime);
	console.log('-----------------------------------------------------')
})
