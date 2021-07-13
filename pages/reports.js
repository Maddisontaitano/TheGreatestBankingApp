/* 

Not in a specific order

1. Get api data to populate into amounts DONE
2. Map api data into table for pdf - DONE
3. Create specific API to separate revenues and expenses - DONE
4. Change all withdrawals and deposits to expenses and revenues - DONE
5. Get data display right - DONE

1. Create function that loops

*/


import reportsStyles from '../styles/pages/Reports.module.css'
import dateFormStyles from '../styles/components/DateForm.module.css'
import { useState, useEffect } from 'react'
import { useUserTransactionsDates, useUserTransactionOneYearAvg, useIsLoggedIn } from '@/lib/swr-hooks'
import { Bar, Line } from 'react-chartjs-2'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { autoTable } from 'jspdf-autotable'
import DualButton from '../components/global/DualButton'
import SecondaryButton from '../components/global/SecondaryButton'
import ToggleChartData from '../components/reports/ToggleChartData'
import Transactions from '../components/reports/Transactions'
import ProjectionOverlay from '../components/reports/ProjectionOverlay'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import router from 'next/router'

const reports = () => {

    const getDaysArray = (start, end) => {
        let arr = [];   
        let dt = new Date(start)
        let dtdt = dt.setDate(new Date(start).getDate()+1)
        for(dtdt; dt <= new Date(end).setDate(new Date(end).getDate()+1); dt.setDate(dt.getDate()+1) ){
            arr.push(new Date(dt).toDateString());
        }
        return arr;
    };

    const getTimePeriodDaysArray = (start, end) => {
        let arr = [];   
        for(let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1) ){
            arr.push(new Date(dt).toDateString());
        }
        return arr;
    };

    function dateBackYears(years) {
        return `${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getFullYear()-years}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getMonth()+1}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getDate()}`
    }

    const dataiod = getDaysArray(getCorrectValue(dateMinusDays(7)), getCorrectValue(dateMinusDays(0)))

    const [ChartType, changeChartType] = useState(Bar)
    const [isFormToggled, toggleForm] = useState(false)
    const [dates, setDates] = useState(dataiod)
    const {loggedin, userId} = useIsLoggedIn()
    const [startDate, setStartDate] = useState(getCorrectValue(dateMinusDays(7)))
    const [endDate, setEndDate] = useState(getCorrectValue(dateMinusDays(0)))
    const [customStartDate, setCustomStartDate] = useState(getCorrectValue(dateMinusDays(7)))
    const [customEndDate, setCustomEndDate] = useState(getCorrectValue(dateMinusDays(0)))
    const { data } = useUserTransactionsDates(userId, startDate, endDate)
    const { average } = useUserTransactionOneYearAvg(userId, dateBackYears(1), dateMinusDays(0))
    const [activeChart, setActiveChart] = useState("Revenues")
    const [isProjection, setProjection] = useState(false)

    useEffect(() => {
        !loggedin ? router.push({
                    pathname: '/login',
                    query: { message: "Login or signup to create free reports!"}
                    }) : ''
      }, [])

    const newGetDaysArray = function(start, end) {
        let arr= []
        for(let dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    function getData(type) {
        const newDates = newGetDaysArray(new Date(startDate),new Date(endDate)).map((v)=>v.toISOString().slice(0,10));
        let result = []
        if(data) {
            if (type === "Revenues") {
                newDates.forEach(currentDate => {
                    let found = null;
                    data.revenues.forEach(element => {
                        if(element.date === currentDate){
                            found = element.cost
                        }
                          
                    })
                    result.push(found)
                })
            } else if (type === "Expenses") {
                newDates.forEach(currentDate => {
                    let found = null;
                    data.expenses.forEach(element => {
                        if(element.date === currentDate){
                            found = element.cost
                        }
                          
                    })
                    result.push(found)
                })
            }
        }
        return result
    }
    
    const [revenueNumbers, setRevenueNumbers] = useState(null)
    const [expenseNumbers, setExpenseNumbers] = useState(null)
    const [projectionNumbers, setProjectionNumbers] = useState(null)
    const [chartState, setChartState] = useState({data: revenueNumbers, label: 'Revenue amount', backgroundColor: 'blue', hoverColorBackground: 'lightblue', borderColor: 'darkBlue'})
    useEffect(()=>{
        setRevenueNumbers(getData("Revenues"))
    },[data])


    function dateForwardMonths(months) {
        let years = 0
        let month = new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getMonth()+(1+months)
        while (month > 12){
            month = month - 12
            years = years + 1
        }
        return `${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getFullYear()+years}-${month}-${new Date(new Date().getTime() - (0 * 24 * 60 * 60 * 1000)).getDate()}`
    }

    function selectProjectionMonth(type) {
        setProjection(false)
        let start, end;
        let result = []
        if(type === 3) {
            start = dateForwardMonths(0)
            end = dateForwardMonths(3)
        } else if(type === 6){
            start = dateForwardMonths(0)
            end = dateForwardMonths(6)
        }
        const newDates = newGetDaysArray(new Date(start),new Date(end)).map((v)=>v.toISOString().slice(0,10));
        const day = new Date().getDate()
        let newAverage = average * 12
        newDates.forEach(currentDate => {
            let found = null;
                if(currentDate.split('-')[2].toString() === day.toString()){
                    found = newAverage
                    newAverage += average
                }      
            result.push(found)
        })
        setDates(newDates)
        setProjectionNumbers(result)
    }

    useEffect(()=> {
        setChartState({
            data: projectionNumbers,
            label: 'Projection amount',
            backgroundColor: 'pink',
            hoverColorBackground: 'hotpink',
            borderColor: 'deeppink'
        })
        setActiveChart("Projections")
    }, [projectionNumbers])

    function dateMinusDays(days) {
        return `${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getFullYear()}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getMonth()+1}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getDate()}`
    }

    function getCorrectValue(val) {
        if(val.length < 10) {
            val = val.split('-', 3)
            if (val[1].length === 1) {
                val[1] = '0' + val[1]
            }
            if (val[2].length === 1) {
                val[2] = '0' + val[2]
            }
            val = val.join('-')
            return val
        } else return val;
    }

    const setStart = (start) => {
        setStartDate(getCorrectValue(start))
    }
    const setEnd = (end) => {
        setEndDate(getCorrectValue(end))
    }

    function pickTimePeriod(start, end) {
        const newDates = getTimePeriodDaysArray(start, end)
        setDates(newDates)
    }

    function handleRangeChange(e) {
        e.preventDefault()
        setCustomStartDate(start.value)
        setCustomEndDate(end.value)
        setStartDate(start.value)
        setEndDate(end.value)
        const newDates = getDaysArray(start.value, end.value)
        setDates(newDates)
    }

    const showRevenue = async () => {
        setRevenueNumbers(getData("Revenues"))
    }

    useEffect(()=> {
        setChartState({
            data: revenueNumbers,
            label: 'Revenue amount',
            backgroundColor: 'blue',
            hoverColorBackground: 'lightblue',
            borderColor: 'darkBlue'
        })
        setActiveChart("Revenues")
    }, [revenueNumbers])
    
    const showExpense = () => {
        setExpenseNumbers(getData("Expenses"))
    }
    
    useEffect(()=>{
        setChartState({
            data: expenseNumbers,
            label: 'Expense amount',
            backgroundColor: 'blue',
            hoverColorBackground: 'lightblue',
            borderColor: 'darkblue'
        })
        setActiveChart("Expenses")
    }, [expenseNumbers])

    // const showProjection = () => {
    //     setChartState({
    //         data: projectionNumbers,
    //         label: 'Projection amount',
    //         backgroundColor: 'pink',
    //         hoverColorBackground: 'hotpink',
    //         borderColor: 'deeppink'
    //     })
    //     setActiveChart("Projections")
    // }

    const cycleChart = () => {
        if(ChartType === Bar) {
            changeChartType(Line)
        } else {
            changeChartType(Bar)
        } 
    }

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()
      
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8)
        for (var i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
            align: 'center'
          })
        }
      }

    const generatePDF = async () => {
        if(activeChart == "Revenues" || activeChart == "Expenses") {
            const doc = new jsPDF();

        doc.setProperties({
            title: "test-pdf"
        })

        const width = doc.internal.pageSize.getWidth()
        const height = doc.internal.pageSize.getHeight()

        doc.page = 1; // page counter

        doc.text(`${activeChart} Report for ${startDate} to ${endDate} as of ${dateMinusDays(0)}`, width/2, 10, { align: 'center' })
        // Connects with table in render, even with display none, makes it very easy to render
        const tableWidth = 142;
        const tableMargin = (width - tableWidth) / 2;
        const lineColor = '#c0ecfe95'
        await html2canvas(document.querySelector("#chart"))
            .then((canvas) => {
                // const newCanvas = document.querySelector("#chart");
                const newCanvasImg = canvas.toDataURL("image/jpeg", 1.0);
                doc.addImage(newCanvasImg, "jpeg", 34, 15, (width - (width/3)), height/3.3, )
                addFooters(doc)
            }).then(() => {
                doc.autoTable({
                    html: '#myTable',
                    theme: 'grid',
                    columnDef: [
                        { title: "date", dataKey: "date" },
                        { title: "description", dataKey: "description" },
                        { title: "amount", dataKey: "amount" },
                    ],
                    tableWidth: tableWidth,
                    startY: 110,
                    margin: { top: 20, left: tableMargin, right: tableMargin },
                    headStyles: {
                        lineColor: lineColor,
                        lineWidth: .1,
                        fillColor: '#78a2f3',
                    },
                    styles: {
                        lineColor: lineColor,
                    },
                    columnStyles: { 
                        0: { 
                            fillColor: '#ffffff',
                            halign: "left",
                            cellWidth: 23
                        },
                        1: { 
                            fillColor: '#ffffff',
                            halign: "left",
                        },
                        2: { 
                            fillColor: '#ffffff',
                            cellWidth: 25
                        }
                    },
                    // Needed to set column 2 header to halign right
                    willDrawCell: (hookData) => {
                        if(hookData.column.dataKey === 2) {
                            hookData.cell.styles.halign = "right";
                        }
                    }
                })
                doc.output('save');
            })
        }
        
    }
    if(data) {
        return (
            <div className={reportsStyles.main}>
                { isProjection ? <ProjectionOverlay month3={() => selectProjectionMonth(3)} month6={() => selectProjectionMonth(6)} exit={() => setProjection(false)}/> : null}
                <div className={`${reportsStyles.topContainer} flex row`}>
                    <div id='chart' className={reportsStyles.chartSize}>
                        <ChartType
                            backgroundColor='#ffffff'
                            data={{
                                labels: dates,
                                datasets: [
                                    {
                                        label: chartState.label ,
                                        data: chartState.data ,
                                        backgroundColor: chartState.backgroundColor ,
                                        hoverBackgroundColor: chartState.hoverBackgroundColor ,
                                        borderColor: chartState.borderColor ,
                                        borderWidth: 2,
                                        spanGaps: true
                                    }
                                ],
                            }}
                            height={1}
                            width={2}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        color:'#ffffff',
                                        text: "good day"
                                    }
                                },
                                scales: {
                                    y: {
                                        title: {
                                            display: true,
                                            text: "y axis",
                                            color: '#ffffff'
                                        }
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: "x axis",
                                            color: '#ffffff'
                                        }
                                    }
                                },
                                maintainAspectRation: false,
                                backgroundColor: '#ffffff'
                            }}
                        />
                    </div>
                        <ToggleChartData showRevenue={showRevenue} showExpense={showExpense} 
                        showProjection={() => setProjection(true)} pickTimePeriod={pickTimePeriod} 
                        customOn={() => toggleForm(true)} customOff={() => toggleForm(false)} 
                        setStart={setStart} setEnd={setEnd} > 
                            {isFormToggled ?
                                    <form className={dateFormStyles.rangeForm} onSubmit={handleRangeChange}> 
                                        <input className={dateFormStyles.dateInput} id="start" name="start" type='date' value={customStartDate} onChange={({value}) => {setCustomStartDate(value)}} /><br/>
                                        <input className={dateFormStyles.dateInput} id="end" name="end" type='date' value={customEndDate} onChange={({value}) => {setCustomEndDate(value)}}/><br/>
                                        <SecondaryButton buttonText="Apply"></SecondaryButton>
                                    </form>
                                    : null
                            }
                        </ToggleChartData>
                </div>
                <DualButton classNameProp="buttonContainerB" 
                button1Text="Cycle Chart" button1OnClick={cycleChart} 
                button2Text="Create Report" button2OnClick={generatePDF} />
                <table id="myTable" className="customTable d-none">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    {/* <Transactions transactions={data.all} /> */}
                    {activeChart == "Revenues" ? <Transactions transactions={data.revenues} /> : <></> }
                    {activeChart == "Expenses" ? <Transactions transactions={data.expenses} /> : <></> }
                </table>
            </div>
        )
    } else return(
        <div className={reportsStyles.main}>
            <SkeletonTheme color="#a8c4fd" highlightColor="#cfddfc">
                <p className={reportsStyles.skeletonChartSize}><Skeleton /></p>
            </SkeletonTheme>
        </div>
    ) 
}
// {activeChart == "Revenues" ? <Transactions transactions={data.revenues} /> : <Transactions transactions={data.expenses} /> }


export default reports