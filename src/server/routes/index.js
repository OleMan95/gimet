import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import {StaticRouter} from 'react-router-dom';

const router = express.Router();

router.get('*', (req, res, next)=>{
	let context = {};
	// if above are no routes has been found - page routes searching here
	const body = renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);

	res.cookie('aat', 'true').send(template({
		body: body,
		title: 'GIMET'
	}));
	next();
});

export default router;

