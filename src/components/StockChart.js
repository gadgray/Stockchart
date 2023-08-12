import Chart from 'react-apexcharts'
import { useState, useContext } from 'react'
import { StockContext } from '../context/StockDetailsContext'
export const StockChart = ({chartData, symbol})=>{
        const {day, week, year} =chartData
        const [date, setDate] = useState('24h')
        const {stockData} = useContext(StockContext) 
        function determineTime(){
            switch (date) {
                case '24h':
                    return day;
                case '7d':
                    return week;
                case '1y':
                    return year;
            
                default:
                    return day;
            }
        }
        const color = ()=> {
            if(determineTime() != null){
                let value = (determineTime()[determineTime().length - 1].y) - (determineTime()[0].y)

            return (value > 0 ? 'green': 'red')
            }
        }
        const options = {
            colors: [color()],
            title:{
                text : symbol,
                align : "center",
                style:{
                    fontSize: '23px'
                }
            },chart: {
                id: "stock data",
                animation: {
                    speed: 1300
                }
            }, xaxis: {
                type: 'datetime',
                label: {
                    dateTimeUTC : false
                }
            },tooltip: {
                x:{
                    format: "MMM dd HH:MM"
                }
            }
        }
        const series = [{
            name: symbol,
            data: determineTime()
        }]

        

        const renderBtn = (button)=>{
            const classes = 'mx-2 btn-sm btn shadow-md'

            if(button === date){
                
                return classes +' btn-primary'
            }else{
                return classes +' btn-outline-primary'
            }
        }
    return (
        <div className='mt-5 p-4 shadow-md bg-white'>
            <div className='d-flex justify-content-center'>
                <img className='text-center rounded-5' src={stockData?.logo} alt='company Logo' width={'150px'} />
            </div>
            {date && (<Chart options={options} series={series} type="area" width= "100%"/>)}
            <div>
                <button className={renderBtn('24h')} onClick={()=> setDate('24h')}>24hrs</button>
                <button className={renderBtn('7d')} onClick={()=> setDate('7d')}>7D</button>
                <button className={renderBtn('1y')} onClick={()=> setDate('1y')}>1Y</button>
            </div>
        </div>
    )
}