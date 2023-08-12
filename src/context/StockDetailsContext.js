import { createContext, useEffect, useState } from "react";
import FinhubApi from "../api/Finhub.api";
export  const StockContext = createContext()

export const StockContextProvider =({symbol, children})=>{
    console.log(symbol)
    
    const [stockData, setStockdata] = useState('') 
    
    useEffect(()=>{
        let isMounted = true
        async function fetchData(){
            try {
                
                const response = await FinhubApi.get('/stock/profile2', {
                    params: {
                        symbol
                    }
                })
                if(isMounted){
                    console.log(response.data)
                    setStockdata(response.data)
                }
            } catch (error) {
                
            }
        }

        fetchData()
        return ()=> (isMounted = false)

    },[symbol])
    return(<StockContext.Provider value={{stockData, setStockdata}}>
        {children}
    </StockContext.Provider>)

}