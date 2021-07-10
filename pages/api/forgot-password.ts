import { NextApiHandler } from 'next'
import { query } from '../../lib/db';
import { nanoid } from 'nanoid'
import moment from 'moment';
import Filter from 'bad-words'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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");

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.body;
    console.log('*** email ***')
    console.log(email)
    console.log('*** email ***')
    try {
    const results = await query(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `,
        email
    )
    if (results[0]) {
        const passwordResetToken = nanoid(10);
        
        await query(
            `
            INSERT INTO password_reset_request (userId, token, date, expiry)
            VALUES ('${results[0].userId}', '${passwordResetToken}', '${moment().format('MMMM Do YYYY, h:mm')}', '${moment().add(4, 'minutes').format('MMMM Do YYYY, h:mm')}')
            `
          )
        
        const msg = {
            to: email, // Change to your recipient
            from: 'udokovic@gmail.com', // Change to your verified sender
            subject: 'Password Reset - NorthArk Bank',
            text: 'as',
            html: `<div style="width: 550px; height: 550px; background: #F6F9FC; padding: 25px; margin:0 auto"> <h1 class="larger-text" style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;" > Hello User, </h1> <p style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;"> We\'ve received a request to reset the password for the NorthArk account associated with leviokoye@gmail.com. </p> <p style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;"> You can reset your password by clicking the link below </p> <a href="http://localhost:3000/passwordreset/reset/${passwordResetToken}" ><button style=" font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding-left: 25px; padding-top: 9px; padding-bottom: 9px; padding-right: 25px; background-color: #666ee8; border: none; color: white " > Reset your password </button></a > <p style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;"> If you did not request a new password, please let us know immediatley by replying to this email. </p> <p style=" font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; " > - NorthArk Team. </p> </div>`,
          }
        sgMail
        .send(msg)
        .then(() => {
            return res.status(200).json({token: passwordResetToken, user: results[0]})
        })
        .catch((error) => {
            return res.status(500).json({msg: 'Error', error})
        })
    }else {
        return  res.status(404).json({msg: 'User not found'})
    }
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    // res.json({email})
    }

export default handler