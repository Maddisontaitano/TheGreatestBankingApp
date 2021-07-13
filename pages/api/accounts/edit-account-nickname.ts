import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id, nickname } = req.query
    console.log('*** id ***')
    console.log(id)
    console.log('*** id ***')
    try {
    const results = await query(
        `
        UPDATE accounts SET nickname = "${nickname}" WHERE accountId = ${id}
        `,
    )
    return res.json(results)
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler