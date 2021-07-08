import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const handler: NextApiHandler = async (req, res) => {
  const { userId, updatedPassword } = req.body;
  try {
    if (!userId || !updatedPassword) {
      return res.status(400).json({ message: '`User Email And Password Is Required' })
    }

    const hashedPassword = bcrypt.hashSync(updatedPassword, salt);

    const results = await query(
      `
      UPDATE users SET pass = '${hashedPassword}' WHERE userId = '${userId}'
      `
    );

        res.json({reset: true})

  } catch (e) {
    res.status(500).json({ message: "Failed" })
  }
}

export default handler
