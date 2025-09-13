import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/TradingInterface.css';
import tgc from '../assets/tgc.png';
import eth from '../assets/eth.svg';
import TradingViewChart from './TradingViewChart';

const TradingInterface = () => {
  const [selectedPair, setSelectedPair] = useState('ETH/TGC');
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(2449.75);
  const chartRef = useRef();

  // Handle chart price clicks
  const handleChartPriceClick = (clickedPrice, clickedSide) => {
    setPrice(clickedPrice.toString());
    if (clickedSide) {
      setSide(clickedSide);
    }
    if (orderType === 'market') {
      setOrderType('limit');
    }
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!amount || (!price && orderType === 'limit')) {
      alert('Please fill in all required fields');
      return;
    }

    const orderPrice = orderType === 'market' ? currentPrice : parseFloat(price);
    const orderAmount = parseFloat(amount);
    const slPrice = stopLoss ? parseFloat(stopLoss) : null;
    const tpPrice = takeProfit ? parseFloat(takeProfit) : null;

    // Validate stop loss and take profit logic
    if (slPrice) {
      if ((side === 'buy' && slPrice >= orderPrice) || (side === 'sell' && slPrice <= orderPrice)) {
        alert('Stop loss must be below entry price for buy orders and above entry price for sell orders');
        return;
      }
    }

    if (tpPrice) {
      if ((side === 'buy' && tpPrice <= orderPrice) || (side === 'sell' && tpPrice >= orderPrice)) {
        alert('Take profit must be above entry price for buy orders and below entry price for sell orders');
        return;
      }
    }

    // Add order overlay to chart
    if (chartRef.current && chartRef.current.addOrderOverlay) {
      chartRef.current.addOrderOverlay({
        side,
        price: orderPrice,
        amount: orderAmount,
        type: orderType,
        stopLoss: slPrice,
        takeProfit: tpPrice
      });
    }

    // Calculate risk/reward for notification
    let rrInfo = '';
    if (slPrice && tpPrice) {
      const risk = Math.abs(orderPrice - slPrice);
      const reward = Math.abs(tpPrice - orderPrice);
      const ratio = (reward / risk).toFixed(2);
      rrInfo = ` | R:R 1:${ratio}`;
    }

    // Simulate order execution
    setTimeout(() => {
      const slInfo = slPrice ? ` | SL: $${slPrice.toFixed(2)}` : '';
      const tpInfo = tpPrice ? ` | TP: $${tpPrice.toFixed(2)}` : '';
      alert(`${side.toUpperCase()} order placed: ${orderAmount} ETH at $${orderPrice.toFixed(2)}${slInfo}${tpInfo}${rrInfo}`);
      setAmount('');
      setPrice('');
      setStopLoss('');
      setTakeProfit('');
    }, 500);
  };

  const mockOrderbook = {
    bids: [
      { price: 2449.50, amount: 1.234, total: 3018.48 },
      { price: 2449.25, amount: 0.567, total: 1388.66 },
      { price: 2449.00, amount: 2.145, total: 5253.11 },
      { price: 2448.75, amount: 0.891, total: 2182.04 },
      { price: 2448.50, amount: 1.678, total: 4108.62 },
    ],
    asks: [
      { price: 2450.00, amount: 0.789, total: 1933.05 },
      { price: 2450.25, amount: 1.456, total: 3567.56 },
      { price: 2450.50, amount: 0.234, total: 573.42 },
      { price: 2450.75, amount: 2.167, total: 5310.27 },
      { price: 2451.00, amount: 0.945, total: 2316.20 },
    ]
  };

  const recentTrades = [
    { price: 2449.75, amount: 0.1234, side: 'buy', time: '14:32:15' },
    { price: 2449.50, amount: 0.5678, side: 'sell', time: '14:32:12' },
    { price: 2450.00, amount: 0.2345, side: 'buy', time: '14:32:08' },
    { price: 2449.25, amount: 0.8901, side: 'sell', time: '14:32:05' },
    { price: 2450.25, amount: 0.3456, side: 'buy', time: '14:32:01' },
  ];

  return (
    <div className="trading-interface">

      {/* Main Trading Layout */}
      <div className="trading-content">
        
        {/* Left Column - TradingView Chart */}
        <div className="chart-section">
          <TradingViewChart
            key={selectedPair}
            ref={chartRef}
            onPriceClick={handleChartPriceClick}
            currentPrice={currentPrice}
            pair={selectedPair}
          />
        </div>

        {/* Sidebar - Order Book & Order Panel */}
        <div className="trading-sidebar">
          
          {/* Order Book */}
          <div className="order-book">
            <div className="order-book-header">
              <h3 className="panel-title">Order Book</h3>
              <div className="order-book-tabs">
                <button className="book-tab active">0.01</button>
                <button className="book-tab">0.1</button>
                <button className="book-tab">1</button>
              </div>
            </div>
          
            <div className="order-book-table">
              <div className="book-headers">
                <span className="book-header">Price</span>
                <span className="book-header">Amount</span>
                <span className="book-header">Total</span>
              </div>
            
              {/* Order Book Data */}
              <div className="book-orders">
                {mockOrderbook.asks.reverse().map((ask, index) => (
                  <div key={index} className="book-order ask">
                    <span className="order-price">${ask.price.toFixed(2)}</span>
                    <span className="order-amount">{ask.amount.toFixed(3)}</span>
                    <span className="order-total">${ask.total.toFixed(2)}</span>
                  </div>
                ))}
                
                {mockOrderbook.bids.map((bid, index) => (
                  <div key={index} className="book-order bid">
                    <span className="order-price">${bid.price.toFixed(2)}</span>
                    <span className="order-amount">{bid.amount.toFixed(3)}</span>
                    <span className="order-total">${bid.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            
            </div>
          </div>
          
          {/* Order Panel */}
          <div className="order-panel">
            <div className="panel-header">
              <div className="side-selector">
                <button 
                  className={`side-btn buy ${side === 'buy' ? 'active' : ''}`}
                  onClick={() => setSide('buy')}
                >
                  Buy
                </button>
                <button 
                  className={`side-btn sell ${side === 'sell' ? 'active' : ''}`}
                  onClick={() => setSide('sell')}
                >
                  Sell
                </button>
              </div>
            </div>
            
            <div className="order-type-selector">
              <button 
                className={`order-type-btn ${orderType === 'market' ? 'active' : ''}`}
                onClick={() => setOrderType('market')}
              >
                Market
              </button>
              <button 
                className={`order-type-btn ${orderType === 'limit' ? 'active' : ''}`}
                onClick={() => setOrderType('limit')}
              >
                Limit
              </button>
            </div>
            
            <div className="order-inputs">
              {orderType === 'limit' && (
                <div className="input-group">
                  <label>Price</label>
                  <div className="input-container">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="order-input"
                    />
                    <span className="input-suffix">USDC</span>
                  </div>
                </div>
              )}
              
              <div className="input-group">
                <label>Amount</label>
                <div className="input-container">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="order-input"
                  />
                  <span className="input-suffix">ETH</span>
                </div>
              </div>
              
              <div className="percentage-buttons">
                <button className="percent-btn">25%</button>
                <button className="percent-btn">50%</button>
                <button className="percent-btn">75%</button>
                <button className="percent-btn">100%</button>
              </div>

              {/* Advanced Order Options */}
              <div className="advanced-options">
                <button 
                  className="advanced-toggle"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <span>Risk Management</span>
                  <span className={`toggle-icon ${showAdvanced ? 'open' : ''}`}>▼</span>
                </button>
                
                {showAdvanced && (
                  <div className="sl-tp-inputs">
                    <div className="input-group">
                      <label>
                        <span className="sl-label">Stop Loss</span>
                        <span className="sl-hint">
                          {side === 'buy' ? '(below entry)' : '(above entry)'}
                        </span>
                      </label>
                      <div className="input-container">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          className="order-input sl-input"
                        />
                        <span className="input-suffix">USD</span>
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <label>
                        <span className="tp-label">Take Profit</span>
                        <span className="tp-hint">
                          {side === 'buy' ? '(above entry)' : '(below entry)'}
                        </span>
                      </label>
                      <div className="input-container">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          className="order-input tp-input"
                        />
                        <span className="input-suffix">USD</span>
                      </div>
                    </div>

                    {/* Risk/Reward Calculator */}
                    {price && stopLoss && takeProfit && (
                      <div className="risk-reward-calc">
                        <div className="rr-header">Risk/Reward Analysis</div>
                        <div className="rr-details">
                          <div className="rr-item">
                            <span>Risk:</span>
                            <span className="risk-amount">
                              ${Math.abs(parseFloat(price) - parseFloat(stopLoss)).toFixed(2)}
                            </span>
                          </div>
                          <div className="rr-item">
                            <span>Reward:</span>
                            <span className="reward-amount">
                              ${Math.abs(parseFloat(takeProfit) - parseFloat(price)).toFixed(2)}
                            </span>
                          </div>
                          <div className="rr-item ratio">
                            <span>R:R Ratio:</span>
                            <span className="ratio-value">
                              1:{(Math.abs(parseFloat(takeProfit) - parseFloat(price)) / Math.abs(parseFloat(price) - parseFloat(stopLoss))).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="order-summary">
                <div className="summary-row">
                  <span>Total</span>
                  <span>≈ $0.00</span>
                </div>
                <div className="summary-row">
                  <span>Fee</span>
                  <span>≈ $0.00</span>
                </div>
              </div>
              
              <button 
                className={`place-order-btn ${side}`}
                onClick={handlePlaceOrder}
              >
                {side === 'buy' ? 'Buy ETH' : 'Sell ETH'}
              </button>
            </div>
          </div>
          

          {/* Recent Trades */}
          <div className="recent-trades">
            <div className="trades-header">
              <h3 className="panel-title">Recent Trades</h3>
            </div>
            <div className="trades-list">
              <div className="trade-item">
                <div className="trade-price buy">$2449.75</div>
                <div className="trade-amount">0.1234</div>
                <div className="trade-time">14:32:15</div>
              </div>
              <div className="trade-item">
                <div className="trade-price sell">$2449.50</div>
                <div className="trade-amount">0.5678</div>
                <div className="trade-time">14:32:12</div>
              </div>
              <div className="trade-item">
                <div className="trade-price buy">$2450.00</div>
                <div className="trade-amount">0.2345</div>
                <div className="trade-time">14:32:08</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
