import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
var bcrypt = require('bcryptjs');
const handler: NextApiHandler = async (req, res) => {
  const { email, pass } = req.body;
//   return res.json({email: email})
  try {
    if (!email || !pass) {
      return res.status(400).json({ message: '`All fields are required' })
    }

    const results = await query(
      `
      SELECT pass FROM users WHERE email = '${email}'
      `
    )
    return res.json({success: bcrypt.compareSync(pass, results[0].pass)});

    

    // console.log(await query('SELECT * FROM users'))

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
