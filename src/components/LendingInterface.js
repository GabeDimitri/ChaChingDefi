import React, { useState } from 'react';
import '../styles/LendingInterface.css';

const LendingInterface = () => {
  const [activeTab, setActiveTab] = useState('supply');
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [amount, setAmount] = useState('');

  const assets = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '5.2847',
      supplyAPY: '4.21',
      borrowAPY: '6.47'
    },
    {
      symbol: 'TGC',
      name: 'ChaChing Defi Banking Gold Coin',
      balance: '15,847',
      supplyAPY: '8.93',
      borrowAPY: '12.15'
    }
  ];

  const selectedAssetData = assets.find(a => a.symbol === selectedAsset);

  return (
    <div className="lending-interface">
      {/* Stats Overview */}
      <div className="lending-stats">
        <div className="stat-card">
          <div className="stat-label">TOTAL SUPPLIED</div>
          <div className="stat-value">$6,125.80</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">TOTAL BORROWED</div>
          <div className="stat-value">$6,300.00</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">NET APY</div>
          <div className="stat-value text-positive">2.14%</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lending-main">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Tab Navigation */}
          <div className="lending-tabs">
            <button 
              className={`tab-btn ${activeTab === 'supply' ? 'active' : ''}`}
              onClick={() => setActiveTab('supply')}
            >
              Supply
            </button>
            <button 
              className={`tab-btn ${activeTab === 'borrow' ? 'active' : ''}`}
              onClick={() => setActiveTab('borrow')}
            >
              Borrow
            </button>
          </div>

          {/* Asset Selection */}
          <div className="asset-selector">
            <h3>Supply Asset</h3>
            {assets.map(asset => (
              <div 
                key={asset.symbol}
                className={`asset-option ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(asset.symbol)}
              >
                <div className="asset-info">
                  <div className="asset-icon">{asset.symbol}</div>
                  <div>
                    <div className="asset-name">{asset.name}</div>
                    <div className="asset-symbol">{asset.symbol}</div>
                  </div>
                </div>
                <div className="asset-apy">
                  <div className="apy-label">Supply APY</div>
                  <div className="apy-value">{asset.supplyAPY}%</div>
                </div>
              </div>
            ))}
          </div>

          {/* Amount Input */}
          <div className="amount-section">
            <h3 className="amount-header">Amount</h3>
            <div className="amount-input-wrapper">
              <input
                type="number"
                className="amount-input"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button 
                className="max-button"
                onClick={() => setAmount(selectedAssetData?.balance || '')}
              >
                MAX
              </button>
            </div>
            <div className="balance-info">
              <span>Balance: {selectedAssetData?.balance} {selectedAsset}</span>
            </div>
            <button className="action-button">
              {activeTab === 'supply' ? 'Supply' : 'Borrow'} {selectedAsset}
            </button>
          </div>
        </div>

        {/* Right Panel - Positions */}
        <div className="right-panel">
          <div className="positions-section">
            <h3 className="panel-title">Your Positions</h3>
            
            {/* Supply Positions */}
            <div className="positions-list" style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#737373', marginBottom: '12px' }}>Supply Positions</h4>
              <div className="position-card">
                <div className="position-header">
                  <div className="position-type">
                    <span className="type-badge supply">Supply</span>
                    <span>ETH</span>
                  </div>
                  <div className="position-value">$6,125.80</div>
                </div>
                <div className="position-details">
                  <div className="position-detail">
                    <span className="position-detail-label">Supplied</span>
                    <span className="position-detail-value">2.5 ETH</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">APY</span>
                    <span className="position-detail-value text-positive">4.21%</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">Value</span>
                    <span className="position-detail-value">$6,125.80</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">Earned</span>
                    <span className="position-detail-value">$247.32</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Borrow Positions */}
            <div className="positions-list">
              <h4 style={{ fontSize: '12px', fontWeight: '500', color: '#737373', marginBottom: '12px' }}>Borrow Positions</h4>
              <div className="position-card">
                <div className="position-header">
                  <div className="position-type">
                    <span className="type-badge borrow">Borrow</span>
                    <span>TGC</span>
                  </div>
                  <div className="position-value">$6,300.00</div>
                </div>
                <div className="position-details">
                  <div className="position-detail">
                    <span className="position-detail-label">Borrowed</span>
                    <span className="position-detail-value">2,100 TGC</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">APY</span>
                    <span className="position-detail-value text-negative">12.15%</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">Value</span>
                    <span className="position-detail-value">$6,300.00</span>
                  </div>
                  <div className="position-detail">
                    <span className="position-detail-label">Health</span>
                    <span className="position-detail-value text-positive">Safe (78%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendingInterface;