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
import "./expert-bot"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser())
	.use(logger('dev'))
	.use(express.json())
	.use(express.urlencoded({msExtendedCode: false}))
	.use(express.static('public'))
	.use('/api', experts)
	.use('/api', users)
	.use('/', routes);

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
