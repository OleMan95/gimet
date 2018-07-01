import './bootstrap';
import fs from "fs";
import https from "https";
import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import path from "path";
import logger from "morgan";
import cookieParser from 'cookie-parser';

import routes from "./routes/index"
import users from "./routes/users"
import experts from "./routes/experts"

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({msExtendedCode: false}));
app.use(express.static('public'));

app.use('/api', experts);
app.use('/api', users);
app.use('/', routes);

// let options = {
// 	ca: fs.readFileSync('./src/ssl/ca_bundle.crt'),
// 	key: fs.readFileSync('./src/ssl/private.key'),
// 	cert: fs.readFileSync('./src/ssl/certificate.crt')
// };
//
//
// let server = https.createServer(options, app).listen(443, function(){
// 	console.log("Express server listening on port " + 443);
// });

app.listen(PORT, ()=>{
	console.log('Server is listening on port :'+PORT);
});