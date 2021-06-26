import reportsStyles from '../styles/Reports.module.css'
import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'

const reports = () => {

    let [ChartType, changeChartType] = useState(Bar)

    
    const cycleChart = () => {
        console.log('working')
        if(ChartType === Bar) {
            changeChartType(ChartType = Line)
        } else {
            changeChartType(ChartType = Bar)
        } 
    }

    return (
        <div className={reportsStyles.main}>
            <ChartType
                data={{
                    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    datasets: [
                        {
                            label: 'deposite amount',
                            data: [12, 19, 3, 5, 2, 3,10],
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2
                        },
                        {
                            label: 'withdrawl amount',
                            data: [23, 30, 20, 3, 9, 22 ,11],
                            backgroundColor: 'rgba(255, 159, 64, 0.5)',
                            borderColor: 'rgba(255, 189, 64, 1)',
                            borderWidth: 2
                        }
                    ],
                }}
                height={1}
                width={2}
                options={{
                    maintainAspectRation: false
                }}
            />
            <div className={reportsStyles.cycle} onClick={cycleChart}>Change Chart Type</div>
        </div>
    )
}

export default reports