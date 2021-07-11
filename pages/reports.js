import reportsStyles from '../styles/pages/Reports.module.css'
import { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { autoTable } from 'jspdf-autotable'
import DualButton from '../components/global/DualButton'
import ToggleChartData from '../components/reports/ToggleChartData'

const reports = () => {
    
    function dateMinusDays(days) {
        return `${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getFullYear()}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getMonth()+1}-${new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000)).getDate()}`
    }

    const [ChartType, changeChartType] = useState(Bar)
    const [dates, setDates] = useState([])
    const [startDate, setStartDate] = useState(dateMinusDays(7))
    const [endDate, setEndDate] = useState(dateMinusDays(0))
    const [depositNumbers, setDepositNumbers] = useState([1,2,3,4,5,6,7])
    const [withdrawlNumbers, setWithdrawlNumbers] = useState([3,2,5,12,3,10,2])
    const [predictionNumbers, setPredictionNumbers] = useState([6,5,3,3,4,6,7])
    const [chartState, setChartState] = useState({data: depositNumbers, label: 'Deposit amount', backgroundColor: 'blue', hoverColorBackground: 'lightblue', borderColor: 'darkBlue'})

    function pickTimePeriod(start, end) {
        const newDates = getDaysArray(start, end)
        setDates(newDates)
    }

    const getDaysArray = (start, end) => {
        let arr = [];
        let date;
        for(let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1) ){
            arr.push(new Date(dt).toDateString());
        }
        return arr;
    };

    function handleRangeChange(e) {
        e.preventDefault()
        const newDates = getDaysArray(start.value, end.value)
        setDates(newDates)
    }

    const showDeposit = () => {
        setChartState({
            data: depositNumbers,
            label: 'Deposit amount',
            backgroundColor: 'blue',
            hoverColorBackground: 'lightblue',
            borderColor: 'darkBlue'
        })
    }
    
    const showWithdrawl = () => {
        setChartState({
            data: withdrawlNumbers,
            label: 'Withdrawl amount',
            backgroundColor: 'blue',
            hoverColorBackground: 'lightblue',
            borderColor: 'darkblue'
        })
    }
    
    const showPrediction = () => {
        setChartState({
            data: predictionNumbers,
            label: 'Prediction amount',
            backgroundColor: 'pink',
            hoverColorBackground: 'hotpink',
            borderColor: 'deeppink'
        })
    }

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

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setProperties({
            title: "test-pdf"
        })

        const width = doc.internal.pageSize.getWidth()
        const height = doc.internal.pageSize.getHeight()

        doc.page = 1; // page counter

        doc.text("Expense Report for 1/10/21 to 7/10/21 as of 7/10/21", width/2, 10, { align: 'center' })
        // Connects with table in render, even with display none, makes it very easy to render
        const tableWidth = 142;
        const tableMargin = (width - tableWidth) / 2;
        const lineColor = '#c0ecfe95'
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
                    cellWidth: 17
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
                console.log(hookData)
                if(hookData.column.dataKey === 2) {
                    hookData.cell.styles.halign = "right";
                }
            }
        })
        // Converting chart to image
        html2canvas(document.querySelector("#chart"))
            .then((canvas) => {
                // const newCanvas = document.querySelector("#chart");
                const newCanvasImg = canvas.toDataURL("image/jpeg", 1.0);
                doc.addImage(newCanvasImg, "jpeg", 34, 15, (width - (width/3)), height/3.3, )
                addFooters(doc)
                doc.output('dataurlnewwindow');
            })
    }

    return (
        <div className={reportsStyles.main}>
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
                                    borderWidth: 2
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
                    <ToggleChartData showDeposit={showDeposit} showWithdrawl={showWithdrawl} 
                    showPrediction={showPrediction} pickTimePeriod={pickTimePeriod} /> 
                    
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
                <tbody>
                    <tr>
                        <td>7/11/21</td>
                        <td>lowes</td>
                        <td>$30.00</td>
                    </tr>
                    <tr>
                        <td>7/11/21</td>
                        <td>starbucks</td>
                        <td>$2.11</td>
                    </tr>
                </tbody>
            </table>
            <form onSubmit={handleRangeChange}>
                {console.log(startDate)}
                <label htmlFor="start">Start </label>
                <input id="start" name="start" type='date' value={startDate} onChange={({value}) => setStartDate(value)} /><br/>
                <label htmlFor="end">End </label>
                <input id="end" name="end" type='date' value={endDate} onChange={({value}) => setEndDate(value)}/><br/>
                <button>Apply</button>
            </form>
        </div>
    )
}

export default reports