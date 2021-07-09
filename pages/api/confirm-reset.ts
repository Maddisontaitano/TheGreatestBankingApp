import { NextApiHandler } from 'next'
import { query } from '../../lib/db';
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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");

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.body;
    try {
    

        const msg = {
            to: email, // Change to your recipient
            from: 'udokovic@gmail.com', // Change to your verified sender
            subject: 'Your Password Was Reset - NorthArk Bank',
            text: 'as',
            html: `Your password was reset`,
          }
        sgMail
        .send(msg);

    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    // res.json({email})
    }

export default handler