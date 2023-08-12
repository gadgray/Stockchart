import { useEffect, useState, useContext } from "react"
import FinhubApi from "../api/Finhub.api"
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/WatchListContext";
import { useNavigate } from "react-router-dom";
function StockList(){
    const [stock, setStock] = useState()
    // const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])
    const navigate = useNavigate()
    const {watchList, deleteStock} = useContext(WatchListContext)
    useEffect(()=>{
        console.log(watchList)
        let isMounted = true
        const fetchData = async ()=>{
            try {

                const response = await Promise.all( watchList.map(stock=>{
                    let data = FinhubApi.get('/quote', {
                            params:{
                                symbol: stock
                            }
                        })

                    return data
                }) )

                const data = response.map(resp=>{
                    return{
                        data: resp.data,
                        symbol: resp.config.params.symbol,
                    }
                })
                if(isMounted){
                    setStock(data);
                }
                console.log(data)
                
            } catch (error) {
                
            }
        }
        fetchData()
        return ()=>{isMounted = false}
    },[watchList])

    const changeColor = (change)=>{
        return change > 0 ? 'success': 'danger'
    }
    const renderIcon = (change)=>{
        
        return change > 0 ? <BsFillCaretUpFill />: <BsFillCaretDownFill />
    }
    const manageNavigation = (symbol)=>{
        navigate(`/details/${symbol}`)
    }

    return (<div>
    <div className="container-fluid mx-auto">
        <table className="table hover mt-5">
            <thead style={{color: 'rgb(79, 89, 102'}}>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Last</th>
                <th scope="col">chg</th>
                <th scope="col">chg%</th>
                <th scope="col">High</th>
                <th scope="col">Low</th>
                <th scope="col">Open</th>
                <th scope="col">Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock?.map((stockData, key)=>{
                    return(
                        <tr key={stockData.symbol} className="table-row" style={{cursor: "pointer"}} 
                        onClick={()=>{manageNavigation(stockData.symbol)}} >
                            <th scope="row" >{stockData.symbol}</th>
                            <td >{stockData.data.c}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                            <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}</td>
                            <td><button className="btn  btn-outline-danger " onClick={(e)=>{
                                e.stopPropagation()
                                deleteStock(stockData.symbol)
                            }}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </div>)
}

export default StockList