import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

function getTotal(values) {
    let total = 0;
    for(let i = 0; i < values.length; i++) {
      total += values[i].cost;
    }
  //   console.log(total)
    return total;
}

const handler: NextApiHandler = async (req, res) => {
    const { id } = req.query 
    try {
    const results = await query(
        `
        SELECT transactionId, 
        DATE_FORMAT(date, "%b %e %y") AS transactionDate, 
        DATE_FORMAT(date, "%H-%I") AS transactionTime,
        description,
        transactionType,
        CONCAT('$', FORMAT(cost, 2)) as cost
        FROM transactions
        WHERE userId = ?
        ORDER BY date DESC
        `
        ,
        id
    )       
    const expenses = await query(`SELECT cost FROM transactions WHERE transactionType = "Expense" AND userId = ${id}`)
    const revenues = await query(`SELECT cost FROM transactions WHERE transactionType = "Revenue" AND userId = ${id}`)
    const totalExpenses = getTotal(expenses)
    const totalRevenues = getTotal(revenues)
    // getTotal(revenues)
    const balance = totalRevenues - totalExpenses;

    // Getting user transaction data Step #1
    const data = {
        transactions: results,
        balance: balance
    }
    // console.log(data)
    return res.json( data )
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler