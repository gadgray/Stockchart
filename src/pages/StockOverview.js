import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";
import logo from '../Logo/pngwing.com.png'
// import {Image} from 'react'
function StockOverview(){

    return(
        <div className="d-flex flex-column w-100 justify-contents-center">
            <h2 className="">StockOverview</h2>
            <img src={logo} className="w-50 align-self-center my-4" alt="stock Logo"></img>
            <AutoComplete />
            <StockList />
        </div>
    )
}

export default StockOverview;