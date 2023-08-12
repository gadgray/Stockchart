import { useState, useEffect, useContext } from "react"
import FinhubApi from "../api/Finhub.api"
import { WatchListContext } from "../context/WatchListContext"
function AutoComplete(){
    const[search, setSearch] = useState('')
    const [result, setResult] = useState([])
    console.log(search)
    const {addStock} = useContext(WatchListContext)
    useEffect(()=>{
        let isMounted = true
        async function fetchData(){
            
            try {
                const response = await FinhubApi.get('/search',{
                    params:{
                        'q': search
                    }
                })
                console.log(response.data)
                if(isMounted){
                    return setResult(response.data)
                }
            } catch (error) {
                console.log(error)
            }

            
        }
        
        if(search.length > 0){
            fetchData()
        }else{
            setResult('')
        }
        if(isMounted){
            return()=>{
                isMounted = false
            }
        }
    },[search])

    const changeDisplay = ()=>{
        return search ? 'show': null
    }
    return (<div className="w-80 p-5 rounded mx-auto">
        <div className= "form-floating dropdown">
            <input className= "form-control" id="search" type="text" placeholder="search " value={search} onChange={e=>{
                setSearch(e.target.value)
            }} style= {{backgroundColor: "rgba(145, 158, 171. 0.04)"}}/>
            <label htmlFor="search">Search</label>
            <ul className={`dropdown-menu ${changeDisplay()}`} style={{
                height: "500px",
                width: "500px",
                overflowX: 'hidden',
                overflowY: 'scroll',
                cursor: 'pointer'
            }}>
            {result.result?.map((quote, key)=>{
                return (<li key={key}  className="dropdown-item" onClick={()=>{
                    addStock(quote.displaySymbol)
                    setSearch('')
                }}>{quote.description} {quote.displaySymbol}</li>)
            })}
                
            </ul>

         </div>
    </div>)
}

export default AutoComplete