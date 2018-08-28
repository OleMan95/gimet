import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import jwtService from '../services/jwt-service';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class MailController{
	//POST /api/mail
	async sendMail(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}

      let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
          user:'noreply@gimethub.com',
          pass:'ManachiN9595'
        }
      });

      const {email, message, subject} = req.body;

			const noReplyEmail = 'noreply@gimethub.com';

			let MAILBODY ='\n[suject]:\n'+subject+'\n\n[msg]:\n'+message;

      let mailOptions = {
        from: `GIMETHUB website <${noReplyEmail}>`,
        to: 'info@gimethub.com',
        subject: email,
        text: MAILBODY
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send({error: {message: 'Unable to send email'}});
          return console.log(error);
        }
        console.log('Message sent: %s', info);
        res.send({data: {info}});
      });


		}catch(err){
			res.status(500).send({error:{message: err.message}});
		}
	}
}
export default MailController;