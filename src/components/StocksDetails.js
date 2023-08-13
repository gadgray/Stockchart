import { useContext } from "react"
// import FinhubApi from "../api/Finhub.api"
import { StockContext } from "../context/StockDetailsContext"

function StocksDetails ({symbol}){

    const {stockData} = useContext(StockContext)
    return(<div className="my-5 container-fluid mx-auto ">
        {stockData && (
            <div className="row "> 
            <div className="col-sm-4"> 
                <div> 
                    <span className="fw-bold">Name: </span> 
                    <span>{stockData.name}</span>
                </div>
                <div> 
                    <span className="fw-bold">country:</span> 
                    <span>{stockData.country}</span>
                </div>
                <div> 
                    <span className="fw-bold">Ticker:</span>
                    <span>{stockData.ticker}</span>
                </div>
            </div>
            <div className="col-sm-4"> 
                <div> 
                    <span className="fw-bold">Exchange: </span> 
                    <span>{stockData.exchange}</span>
                </div>
                <div> 
                    <span className="fw-bold">Industry:</span>
                    <span>{stockData.name}</span>
                </div>
                <div> 
                    <span className="fw-bold">IPO:</span>
                    <span>{stockData.ifo}</span>
                </div>
            </div>
            <div className="col-sm-4"> 
                <div> 
                    <span className="fw-bold">MarketCap: </span> 
                    <span>{stockData.marketCapitalization}</span>
                </div>
                <div> 
                    <span className="fw-bold">Shares Outstanding: </span>
                    <span>{stockData.shareOutstanding}</span>
                </div>
                <div> 
                    <span className="fw-bold">URL: </span>
                    <span>{stockData.weburl}</span>
                </div>
            </div>
            </div>
        
        )}
    </div>)
}
export default StocksDetails