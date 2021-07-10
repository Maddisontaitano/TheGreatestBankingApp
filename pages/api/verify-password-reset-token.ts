import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
var bcrypt = require('bcryptjs');
const handler: NextApiHandler = async (req, res) => {
  const { token } = req.body;
//   return res.json({email: email})
  try {
    if (!token) {
      return res.status(400).json({ message: '`No Token - Token is required' })
    }
    const results = await query(
      `
      SELECT * FROM password_reset_request WHERE token = '${token}'
      `
    )

    if (results[0]) {
      res.status(200).json({user: results[0]})
    } else {
      return res.status(404).json({message: "Invalid Token"});
    }
    

    

    // console.log(await query('SELECT * FROM users'))

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
