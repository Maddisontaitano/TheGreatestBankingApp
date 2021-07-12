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
    const { id, startDate, endDate } = req.query 
    try {
    const results = await query(
        `
        SELECT date, cost FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND accountId = ${id}
        `
        ,
        id
    )   

    const expenses = await query(`SELECT cost FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND transactionType = "Expense" AND accountId = ${id}`)
    const revenues = await query(`SELECT cost FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND transactionType = "Revenue" AND accountId = ${id}`)
    const totalExpenses = getTotal(expenses)
    const totalRevenues = getTotal(revenues)
    // getTotal(revenues)
    const balance = totalRevenues - totalExpenses;
    // await query(
    //     `
    //     UPDATE accounts SET balance = ${balance} WHERE accountId = ${id}
    //     `
    // )
    // console.log(results)
    return res.json({ results, balance })
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler  