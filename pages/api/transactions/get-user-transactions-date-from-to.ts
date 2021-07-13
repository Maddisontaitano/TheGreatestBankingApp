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
    console.log("start date: " + startDate)
    console.log("end date: " + endDate)
    try {
    const results = await query(
        `
        SELECT date, cost, description, transactionType, transactionId FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND userId = ${id} ORDER BY date DESC
        `
        ,
        id
    )   

    const expenses = await query(`SELECT date, cost, description, transactionType, transactionId FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND transactionType = "Expense" AND userId = ${id} ORDER BY date DESC`)
    const revenues = await query(`SELECT date, cost, description, transactionType, transactionId FROM transactions WHERE date >= "${startDate}" AND date <= "${endDate}" AND transactionType = "Revenue" AND userId = ${id} ORDER BY date DESC`)
    const totalExpenses = getTotal(expenses)
    const totalRevenues = getTotal(revenues)
    // getTotal(revenues)
    const balance = totalRevenues - totalExpenses;
    

    const data = {
      all: results,
      expenses: expenses,
      revenues: revenues,
      balance: balance
    }
    console.log(data)
    return res.json(data)
    } catch (e) {
    res.status(500).json({ message: e.message })
    }
    }

export default handler