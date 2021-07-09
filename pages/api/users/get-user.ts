import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query
    console.log('*** id ***')
    console.log(id)
    console.log('*** id ***')
    try {
    const results = await query(
        `
        SELECT *
        FROM users
        WHERE userId = ?
        `,
        id
    )
    console.log("*** get user results ***")
    console.log(results)
    console.log("*** get user results ***")
    return res.json(results[0])
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler
