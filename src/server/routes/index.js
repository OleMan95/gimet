import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import Footer from "../../components/sections/Footer/index";
import {StaticRouter} from 'react-router-dom';
import sgMail from '@sendgrid/mail';

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/mail', async (req, res) => {
	const {receiver, message, subject} = req.body;

	sgMail.send({
		to: receiver,
		from: 'aom-95@live.com',
		subject: subject,
		text: message
	}, (err, res)=>{
		if(err)
			res.status(500).send({error: {
				message: 'Send mail error.'
			}});
	});

	res.send('ok');
});

router.get('*', (req, res, next)=>{
	console.log('Cookies: ', req.cookies);
	let context = {};
	// if above are no routes has been found - page routes searching here
	const body = renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);
	const footer = renderToString(<Footer />);

	res.cookie('aat', 'true').send(template({
		body: body,
		footer: footer,
		title: 'GIMET'
	}));
	next();
});

export default router;

