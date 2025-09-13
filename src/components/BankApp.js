import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json'
import { loadProvider, loadNetwork, loadAccount, loadTokens, loadExchange, subscribeToEvents, loadAllOrders } from '../store/interactions';

// Import all components
import Navbar from './Navbar';
import BankDashboard from './BankDashboard';
import LendingInterface from './LendingInterface';
import YieldFarming from './YieldFarming';
import TransferInterface from './TransferInterface';
import SavingsInterface from './SavingsInterface';
import TradingInterface from './TradingInterface';
import Markets from './Markets';
import Balance from './Balance';
import Order from './Order'
import OrderBook from './OrderBook';
import Trades from './Trades';
import Transactions from './Transactions';

// Import styles
import '../styles/BankApp.css';
import '../styles/PremiumAnimations.css';

function BankApp() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('dashboard');

  const loadBlockchainData = async () => {
    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        console.warn('MetaMask not detected - running in demo mode');
        return;
      }

      const provider = loadProvider(dispatch);
      if (!provider) {
        console.warn('No provider available - running in demo mode');
        return;
      }

      const chainId = await loadNetwork(provider, dispatch);

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      
      // Fetch account when changed
      window.ethereum.on('accountsChanged', () => {
        loadAccount(provider, dispatch)
      })

      // Check if config exists for this chainId before proceeding
      if (!config[chainId]) {
        console.warn(`No configuration found for chain ID: ${chainId} - running in demo mode`);
        return;
      }
      const TGC = config[chainId].TGC;
      const mETH = config[chainId].mETH;
      await loadTokens(provider, [TGC.address, mETH.address], dispatch);

      const exchangeConfig = config[chainId].exchange;
      const exchange = await loadExchange(provider, exchangeConfig.address, dispatch)
      await loadExchange(provider, exchangeConfig.address, dispatch)
      loadAllOrders(provider, exchange, dispatch)
      subscribeToEvents(exchange, dispatch)
    } catch (error) {
      console.warn('Blockchain connection failed - running in demo mode:', error.message);
      return;
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <BankDashboard />;
      case 'lending':
        return <LendingInterface />;
      case 'farming':
        return <YieldFarming />;
      case 'trading':
        return <TradingInterface />;
      case 'savings':
        return <SavingsInterface />;
      case 'transfer':
        return <TransferInterface />;
      default:
        return <BankDashboard />;
    }
  };

  return (
    <div className="bank-app">
      {/* Navigation Tabs */}
      <div className="bank-navigation glass-enhanced">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 className="brand-title">TRW</h1>
            <span className="brand-subtitle">Private Banking</span>
          </div>
          
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="tab-label">Overview</span>
            </button>
            
            <button 
              className={`nav-tab ${activeTab === 'trading' ? 'active' : ''}`}
              onClick={() => setActiveTab('trading')}
            >
              <span className="tab-label">Trading</span>
            </button>
            
            <button 
              className={`nav-tab ${activeTab === 'lending' ? 'active' : ''}`}
              onClick={() => setActiveTab('lending')}
            >
              <span className="tab-label">Lending</span>
            </button>
            
            <button 
              className={`nav-tab ${activeTab === 'farming' ? 'active' : ''}`}
              onClick={() => setActiveTab('farming')}
            >
              <span className="tab-label">Yield</span>
            </button>
            
            <button 
              className={`nav-tab ${activeTab === 'savings' ? 'active' : ''}`}
              onClick={() => setActiveTab('savings')}
            >
              <span className="tab-label">Savings</span>
            </button>
            
            <button 
              className={`nav-tab ${activeTab === 'transfer' ? 'active' : ''}`}
              onClick={() => setActiveTab('transfer')}
            >
              <span className="tab-label">Transfer</span>
            </button>
          </div>
          
          <div className="nav-stats">
            <div className="stat-item">
              <span className="stat-label">AUM</span>
              <span className="stat-value">$9.4M</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Volume</span>
              <span className="stat-value">$847K</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Clients</span>
              <span className="stat-value">2,847</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bank-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default BankApp;
