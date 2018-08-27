import nodemailer from 'nodemailer';

class MailController{
	//GET /experts
	async sendMail(req, res){
		try{
			if(!req.cookies.aat || req.cookies.aat != 'true'){
				res.status(400).send({message:'Rejected'});
				return;
			}

      let transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true, //ssl
        auth: {
          user:'info@gimethub.com',
          pass:'ManachiN9595'
        }
      });

      const {email, message, subject} = req.body;

      let MAILBODY ='\n[suject]:\n'+subject+'\n\n[msg]:\n'+message;

      let mailOptions = {
        from: '"GIMETHUB website" <noreply@gimethub.com>',
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