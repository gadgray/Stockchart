import DetailsRoute from './pages/Details';
import StockOverview  from './pages/StockOverview'
import {Routes, Route } from 'react-router-dom';
import { WatchListContextProvider } from './context/WatchListContext';
function App() {
  
  return (
    <div className="container-fluid m-3">
      <header className="App-header">
      <WatchListContextProvider>
      <Routes >
        <Route path='/' element= {<StockOverview />} >
        </Route>
        
        <Route path='/details/:symbol'>
          <Route index element={<DetailsRoute />} />
        </Route>
      </Routes>
      </WatchListContextProvider>
      
       
      
      </header>
    </div>
  );
}

export default App;
