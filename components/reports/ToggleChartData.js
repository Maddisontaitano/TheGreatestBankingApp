import React, { useState, useEffect } from 'react'
import PrimaryButton from '../global/PrimaryButton'
import dateFormStyles from '../../styles/components/DateForm.module.css'

const ToggleChartData = (props) => {
    const [rangeValue, setRangeValue] = useState()

    const sliceDate = (str) => {
        str = str.substr(4);
        str = str.replace(/ /g, "-");
        return str;
    }

    function dateMinusDays(days) {
        return `${new Date(new Date().getTime() - (days+1 * 24 * 60 * 60 * 1000)).getFullYear()}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getMonth()+1}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getDate()}`
    }

    function dateBackMonths(months) {
        return `${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getFullYear()}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getMonth()+1-months}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getDate()}`
    }

    function dateBackYears(years) {
        return `${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getFullYear()-years}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getMonth()+1}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getDate()}`
    }

    let currentWeek1 = dateMinusDays(7)
    let currentWeek2 = dateMinusDays(0)
    let lastWeek1 = dateMinusDays(14)
    let lastWeek2 = dateMinusDays(7)
    let currentMonth1 = dateBackMonths(1)
    let currentMonth2 = dateMinusDays(0)
    let lastMonth1 = dateBackMonths(2)
    let lastMonth2 = dateBackMonths(1)
    let currentQuarter1 = dateBackMonths(3)
    let currentQuarter2 = dateMinusDays(0)
    let lastQuarter1 = dateBackMonths(6)
    let lastQuarter2 = dateBackMonths(3)
    let currentYear1 = dateBackYears(1)
    let currentYear2 = dateMinusDays(0)
    let lastYear1 = dateBackYears(2)
    let lastYear2 = dateBackYears(1)

    useEffect(() => {

        if (rangeValue === 'custom') {
            props.customOn()
        }
        else if(rangeValue) {
            props.customOff()
            let x = rangeValue;
            let array = x.split(" ", 2)
            let value1 = array[0]
            let value2 = array[1]
            props.setStart(value1)
            props.setEnd(value2)
            // sliceDate(value2)
            console.log("Value 1 " + value1)
            console.log("Value 2 " + value2)
            // props.setRevenues()
            // props.setExpenses()
            props.pickTimePeriod(value1, value2)
        }
    }, [rangeValue])

    return (
        <div className="flex column toggleChartContainer">
            <PrimaryButton buttonText="Revenue" buttonClick={props.showRevenue} />
            <PrimaryButton buttonText="Expenses" buttonClick={props.showExpense} />
            <PrimaryButton buttonText="Projection" buttonClick={props.showProjection} />
            <select className={dateFormStyles.selectDropDown} value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}>
                <i class="fas fa-chevron-circle-down"></i>
                <option disabled selected hidden>Pick a Range</option>
                <option value="custom">Custom Range</option>
                <option value={`${currentWeek1} ${currentWeek2}`}>
                    Current Week</option>  
                <option value={`${lastWeek1} ${lastWeek2}`}>Last Week</option>
                <option value={`${currentMonth1} ${currentMonth2}`}>Current Month</option>
                <option value={`${lastMonth1} ${lastMonth2}`}>Last Month</option>
                <option value={`${currentQuarter1} ${currentQuarter2}`}>Current Quarter</option>
                <option value={`${lastQuarter1} ${lastQuarter2}`}>Last Quarter</option>
                <option value={`${currentYear1} ${currentYear2}`}>Current Year</option>
                <option value={`${lastYear1} ${lastYear2}`}>Last Year</option>
            </select>
            {props.children}
        </div>
    )
}

export default ToggleChartData
