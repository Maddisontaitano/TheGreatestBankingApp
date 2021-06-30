import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query 
    try {
    const results = await query(
        `
        SELECT transactionId, 
        DATE_FORMAT(date, "%D-%M-%Y") AS transactionDate, 
        DATE_FORMAT(date, "%H-%I") AS transactionTime,
        description,
        cost
        FROM transactions
        WHERE accountId = ?
        ORDER BY transactionId DESC
        `
        ,
        id
    )   
    return res.json(results)
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler