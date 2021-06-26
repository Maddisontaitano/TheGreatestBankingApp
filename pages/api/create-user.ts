import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { fname, lname, email, pass } = req.body
  try {
    if (!fname || !lname || !email || !pass) {
      return res
        .status(400)
        .json({ message: '`All fields are required' })
    }

    const results = await query(
      `
      INSERT INTO users (fname, lname, email, pass)
      VALUES (?, ?, ?, ?)
      `,
      [filter.clean(fname), filter.clean(lname), filter.clean(email), filter.clean(pass)]
    )

    console.log(await query('SELECT * FROM users'))

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
