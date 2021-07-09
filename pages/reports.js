import reportsStyles from '../styles/pages/Reports.module.css'
import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'

const reports = () => {

    let [ChartType, changeChartType] = useState(Bar)

    
    const cycleChart = () => {
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
                            backgroundColor: '#e7f378',
                            hoverBackgroundColor: '#d0e22dd3',
                            borderColor: '#d4df76',
                            borderWidth: 2
                        },
                        {
                            label: 'withdrawl amount',
                            data: [23, 30, 20, 3, 9, 22 ,11],
                            backgroundColor: '#f6a4eb',
                            hoverBackgroundColor: '#ff56e8be',
                            borderColor: '#f397e7',
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