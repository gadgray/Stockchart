import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

function StockOverview(){

    return(
        <div>
            <h2>Root Route</h2>
            <AutoComplete />
            <StockList />
        </div>
    )
}

export default StockOverview;