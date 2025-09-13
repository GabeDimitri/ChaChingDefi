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

      {/* Left Sidebar - Trading Controls */}
      <div className="trading-sidebar-left">
        
        {/* Pair Selector */}
        <div className="pair-selector">
          <div className="pair-info">
            <div className="pair-symbol">ETH-PERP</div>
            <div className="pair-price">$4,665.94</div>
          </div>
          <div className="pair-stats">
            <div className="stat-item">
              <span className="stat-label">24h Change</span>
              <span className="stat-value negative">-0.03%</span>
            </div>
          </div>
        </div>

        {/* Order Type Tabs */}
        <div className="order-type-tabs">
          <button className={`tab-btn ${orderType === 'market' ? 'active' : ''}`} onClick={() => setOrderType('market')}>Market</button>
          <button className={`tab-btn ${orderType === 'limit' ? 'active' : ''}`} onClick={() => setOrderType('limit')}>Limit</button>
          <button className={`tab-btn ${orderType === 'stop' ? 'active' : ''}`} onClick={() => setOrderType('stop')}>Stop</button>
        </div>

        {/* Order Inputs */}
        <div className="order-inputs-left">
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
                <span className="input-suffix">USD</span>
              </div>
            </div>
          )}
          
          <div className="input-group">
            <label>Size</label>
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

          <div className="input-group">
            <label>Leverage</label>
            <div className="leverage-selector">
              <button className="leverage-btn active">1x</button>
              <button className="leverage-btn">2x</button>
              <button className="leverage-btn">5x</button>
              <button className="leverage-btn">10x</button>
              <button className="leverage-btn">25x</button>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Total Cost:</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Fill Price</span>
              <span>-</span>
            </div>
            <div className="summary-row">
              <span>Price Impact</span>
              <span>-</span>
            </div>
            <div className="summary-row">
              <span>Max Slippage:</span>
              <span>5%</span>
            </div>
          </div>

          <button className="connect-wallet-btn">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Center - Chart */}
      <div className="chart-section">
        <TradingViewChart
          key={selectedPair}
          ref={chartRef}
          onPriceClick={handleChartPriceClick}
          currentPrice={currentPrice}
          pair={selectedPair}
        />
      </div>

      {/* Right Sidebar - Order Book & Positions */}
      <div className="trading-sidebar-right">
        
        {/* Order Book */}
        <div className="order-book">
          <div className="order-book-header">
            <div className="book-title">
              <span className="amount-label">Amount</span>
              <span className="price-label">Price</span>
              <span className="time-label">Time</span>
            </div>
          </div>
        
          <div className="order-book-table">
            <div className="book-orders">
              {/* Mock order book data matching the Synthetix style */}
              <div className="book-order ask">
                <span className="order-amount">1,377.66</span>
                <span className="order-price sell">$4,730.01</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">200.00</span>
                <span className="order-price sell">$4,785.79</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">4780.00</span>
                <span className="order-price sell">$4,792.44</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">200.00</span>
                <span className="order-price sell">$4,795.70</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">160.00</span>
                <span className="order-price sell">$4,791.67</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">300.00</span>
                <span className="order-price sell">$4,786.02</span>
                <span className="order-time">19d ago</span>
              </div>
              <div className="book-order ask">
                <span className="order-amount">200.00</span>
                <span className="order-price sell">$4,788.08</span>
                <span className="order-time">20d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">4,0000</span>
                <span className="order-price buy">$4,823.27</span>
                <span className="order-time">20d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">50,000</span>
                <span className="order-price buy">$4,763.36</span>
                <span className="order-time">20d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">50,000</span>
                <span className="order-price buy">$4,762.76</span>
                <span className="order-time">21d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">50,000</span>
                <span className="order-price buy">$4,715.00</span>
                <span className="order-time">21d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">240.00</span>
                <span className="order-price buy">$4,328.22</span>
                <span className="order-time">23d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">0.7047</span>
                <span className="order-price buy">$4,231.69</span>
                <span className="order-time">25d ago</span>
              </div>
              <div className="book-order bid">
                <span className="order-amount">0.1175</span>
                <span className="order-price buy">$4,292.76</span>
                <span className="order-time">25d ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
