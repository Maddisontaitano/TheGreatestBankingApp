import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const handler: NextApiHandler = async (req, res) => {
  const { id, oldPassword, newPassword } = req.query // Just needs to be changed to req.body to work with forms
  try {
    if ( !id || !oldPassword || !newPassword ) {
      return res
        .status(400)
        .json({ message: '`All fields are required' })
    }
    const hashedOldPassword = bcrypt.hashSync(oldPassword, salt);

    const user = await query(
      `
      SELECT * FROM users WHERE userId = '${id}'
      `
    )

    if(user[0].pass === hashedOldPassword) {
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        const newUser = await query(
            `
            UPDATE users
            SET pass = '${hashedPassword}' 
            WHERE userId = '${id}'
            `
        )
        return res.json(newUser)
    }
    return res.json({ message: `Error creating new password, check your old password and try again.`})
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler