import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import template from "../template";
import App from "../../components/App";
import {StaticRouter} from 'react-router-dom';
import sgMail from '@sendgrid/mail';

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/api/mail', async (req, res) => {
	const {email, message, subject} = req.body;

	await sgMail.send({
		to: 'manachinskiy@gmail.com',
		from: email,
		subject: subject,
		text: message
	}, (err, responce)=>{
		if(err) {
			console.log('error: ', err);
			res.status(500).send({error: {
					message: 'Send mail error.'
				}});
			return;
		}

		res.send({data: {message: 'Message has sent successfully.'}});
	});
});

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

