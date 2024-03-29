import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query 
    console.log("**** Account Id ****")
    console.log(id)
    console.log("**** Account Id ****")
    try {
    const results = await query(
        `
        SELECT *
        FROM accounts
        WHERE userId = ?
        `,
        id
    )   
    console.log("*** Get Account Results")
    console.log(results)
    console.log("*** Get Account Results")
    return res.json(results)
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler