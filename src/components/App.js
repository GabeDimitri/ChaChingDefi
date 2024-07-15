import '../App.css';
import logo from '../assets/logo.png';
import logoTGC from '../assets/tgc.png';
import { useEffect } from 'react';
import config from '../config.json'
import { useDispatch } from 'react-redux';
import { loadProvider, loadNetwork, loadAccount, loadTokens,loadExchange } from '../store/interactions';
import TradingViewWidget from './TradingViewWidget';
import TradingViewChart from './TradingViewChart';

function App() {
  const dispatch = useDispatch();
  const loadBockchainData = async () => {

    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    await loadAccount(provider,dispatch);


    const TGC =config[chainId].TGC;
    const mETH =config[chainId].mETH;
    await loadTokens(provider, [TGC.address,mETH.address], dispatch);

    const exchangeConfig =config[chainId].exchange;
    await loadExchange(provider,exchangeConfig.address,dispatch)
  }
  useEffect(() => {
    loadBockchainData()
    // load more shit
  })
  return (
    <div>
      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>
          <h1>TRW Exchange</h1>
          <img src={logo} alt="Logo" width="60px" height="60px" />
          {/* Markets */}
          {/* Balance */}
          {/* Order */}
        </section>
        <section className='exchange__section--right grid'>
          <h1>Connect your Wallet</h1>
          <img src={logoTGC} alt="LogoTGC" width="80px" height="80px" />

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
