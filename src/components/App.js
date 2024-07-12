import '../App.css';
import logo from '../assets/logo.png';
import logoTGC from '../assets/tgc.png';
import {useEffect} from 'react';
import {ethers} from 'ethers';
import TOKEN_ABI from '../abis/Token.json';
import config from '../config.json'
function App() {
  const loadBockchainData = async() =>{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
    
    //connect ethers to blockchainm
    const provider= new ethers.providers.Web3Provider(window.ethereum)
    const {chainId} = await provider.getNetwork()

    console.log(chainId)

    // Token Smart Contract
    const token = new ethers.Contract(config[chainId].TGC.address, TOKEN_ABI, provider);
    console.log(token.address)
    const symbol = await token.symbol()
    console.log(symbol)

  }
  useEffect(()=>{
    loadBockchainData()
    // load more shit
  })
  return (
    <div>
      {/* Navbar */}
      <h1>TRW Exchange</h1>
          <img src={logo} alt="Logo" width="60px" height="60px" />
      <main className='exchange grid'>
        <section className='exchange__section--left grid'>
          
          {/* Markets */}
          {/* Balance */}
          {/* Order */}
        </section>
        <section className='exchange__section--right grid'>
          <h1>Connect your Wallet</h1>
          <img src={logoTGC} alt="LogoTGC"  width="80px" height="80px"/>

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
