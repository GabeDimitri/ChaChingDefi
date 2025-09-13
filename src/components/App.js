import '../App.css';

import { useEffect } from 'react';
import config from '../config.json'
import { useDispatch } from 'react-redux';
import { loadProvider, loadNetwork, loadAccount, loadTokens,loadExchange,subscribeToEvents, loadAllOrders } from '../store/interactions';
import TradingViewWidget from './TradingViewWidget';
import Navbar from './Navbar';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order'
import OrderBook from './OrderBook';
import Trades from './Trades';
import Transactions from './Transactions';
function App() {
  const dispatch = useDispatch();
  const loadBockchainData = async () => {

    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    window.ethereum.on('chainChanged',()=>{
      window.location.reload();
    })
    // fetch account when changeed
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, dispatch)
    })

    // Check if config exists for this chainId before proceeding
    if (!config[chainId]) {
      console.error(`No configuration found for chain ID: ${chainId}`);
      return;
    }

    const TGC = config[chainId].TGC;
    const mETH = config[chainId].mETH;
    await loadTokens(provider, [TGC.address, mETH.address], dispatch);

    const exchangeConfig = config[chainId].exchange;
    const exchange = await loadExchange(provider,exchangeConfig.address,dispatch)
    await loadExchange(provider,exchangeConfig.address,dispatch)
    loadAllOrders(provider,exchange,dispatch)
    subscribeToEvents(exchange,dispatch)
  }
  useEffect(() => {
    loadBockchainData()
    // load more shit
  })
  return (
    <div>
      <Navbar/>
      <main className='exchange grid'>
        <section className='exchange__section--left grid'>
       
          <Markets/>
          <Balance/>
          <Order/>
        </section>
        <section className='exchange__section--right grid'>
          
         
        <TradingViewWidget/>
        <Transactions/>
         <Trades/>
         <OrderBook/>

        </section>
      </main>
      {/* Alert */}
    </div>
  );
}

export default App;
