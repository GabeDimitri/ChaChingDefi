import '../App.css';

import { useEffect } from 'react';
import config from '../config.json'
import { useDispatch } from 'react-redux';
import { loadProvider, loadNetwork, loadAccount, loadTokens,loadExchange,subscribeToEvents } from '../store/interactions';
import TradingViewWidget from './TradingViewWidget';
import TradingViewChart from './TradingViewChart';
import Navbar from './Navbar';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order'
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

    const TGC =config[chainId].TGC;
    const mETH =config[chainId].mETH;
    await loadTokens(provider, [TGC.address,mETH.address], dispatch);

    const exchangeConfig =config[chainId].exchange;
    const exchange = await loadExchange(provider,exchangeConfig.address,dispatch)
    await loadExchange(provider,exchangeConfig.address,dispatch)
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
          {/* PriceChart */}
          {/* Transactions */}
          {/* Trades */}
          {/* OrderBook */}

        </section>
      </main>
      {/* Alert */}
    </div>
  );
}

export default App;
