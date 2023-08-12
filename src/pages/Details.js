import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FinhubApi from "../api/Finhub.api";
import { StockChart } from "../components/StockChart";
import StocksDetails from '../components/StocksDetails'
import { StockContextProvider } from "../context/StockDetailsContext";
const formatData = (data)=>{
    return data.t.map((el, key)=>{
        return({
            x: el*1000,
            y: Math.floor(data.c[key]),
        })
    })
}

function DetailsRoute(){
    const {symbol} = useParams();
    const [chartData, setChartData] = useState([])
   
    useEffect(()=>{
        async function getData(){
            try {
               
                const date = new Date();
                const currentTIme = Math.floor(date.getTime()/ 1000)
                let prevDay = currentTIme - (60*60*24)
                const day = date.getDay();
                let prevWeek = currentTIme - (7*60*60*24)
                let prevYear = currentTIme - (365*60*60*24)
                if(day === 6){
                    prevDay = currentTIme - (60*60*24*2)
                }
                if(day === 0){
                    prevDay = currentTIme - (60*60*24*3)
                }

                const response = await Promise.all([FinhubApi.get('/stock/candle', {
                        params :{
                            symbol,
                            from: prevDay,
                            to: currentTIme,
                            resolution: 30
                        }
                    }), FinhubApi.get('/stock/candle', {
                        params :{
                            symbol,
                            from: prevWeek,
                            to: currentTIme,
                            resolution: 30
                        }
                    }),FinhubApi.get('/stock/candle', {
                        params :{
                            symbol,
                            from: prevYear,
                            to: currentTIme,
                            resolution: 30
                        }
                    }),
                ])
                setChartData({
                    day: formatData(response[0].data),
                    week: formatData(response[1].data),
                    year: formatData(response[2].data),
                })

            } catch (error) {
                
            }
        }
        getData()
    }, [symbol])
    return(
        <div>
        <StockContextProvider symbol = {symbol}>

            {chartData && (<div>
                <StockChart chartData = {chartData} symbol={symbol} />
                
             <div>
                <StocksDetails symbol={symbol}/>
             </div>
             </div>)}
        </StockContextProvider>

        </div>
    )
}

export default DetailsRoute;