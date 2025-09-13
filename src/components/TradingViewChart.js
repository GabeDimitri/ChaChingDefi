import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import '../styles/TradingViewChart.css';

const TradingViewChart = React.forwardRef(({ onPriceClick, currentPrice = 2450, pair = "ETH/TGC" }, ref) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const volumeSeriesRef = useRef();
  const [orders, setOrders] = useState([]);
  const [hoveredPrice, setHoveredPrice] = useState(null);
  const [activeOrderLines, setActiveOrderLines] = useState([]);
  const [stopLossLines, setStopLossLines] = useState([]);
  const [takeProfitLines, setTakeProfitLines] = useState([]);

  // Generate realistic market data
  const generateMarketData = () => {
    const data = [];
    const volumeData = [];
    let basePrice = currentPrice;
    const now = Date.now();
    
    for (let i = 200; i >= 0; i--) {
      const time = Math.floor((now - i * 60000) / 1000); // 1 minute intervals
      
      // Realistic price movement
      const volatility = 0.002; // 0.2% volatility
      const change = (Math.random() - 0.5) * volatility * basePrice;
      basePrice += change;
      
      const open = basePrice;
      const high = open + Math.random() * 0.01 * basePrice;
      const low = open - Math.random() * 0.01 * basePrice;
      const close = low + Math.random() * (high - low);
      
      data.push({
        time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
      
      volumeData.push({
        time,
        value: Math.random() * 100 + 10,
        color: close > open ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255, 82, 82, 0.8)'
      });
      
      basePrice = close;
    }
    
    return { candleData: data, volumeData };
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up existing chart if it exists
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 800,
      height: 500,
      layout: {
        background: { color: '#0a0a0a' },
        textColor: 'rgba(255, 255, 255, 0.8)',
      },
      watermark: {
        visible: false,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: 'rgba(59, 130, 246, 0.8)',
          style: 2,
        },
        horzLine: {
          width: 1,
          color: 'rgba(59, 130, 246, 0.8)',
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'rgba(255, 255, 255, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        textColor: 'rgba(255, 255, 255, 0.8)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: 'rgba(0, 150, 136, 1)',
      downColor: 'rgba(255, 82, 82, 1)',
      borderVisible: false,
      wickUpColor: 'rgba(0, 150, 136, 1)',
      wickDownColor: 'rgba(255, 82, 82, 1)',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    volumeSeriesRef.current = volumeSeries;

    // Position volume scale
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    // Generate and set data immediately
    const { candleData, volumeData } = generateMarketData();
    
    // Ensure we have data before setting
    if (candleData.length > 0) {
      candlestickSeries.setData(candleData);
    }
    if (volumeData.length > 0) {
      volumeSeries.setData(volumeData);
    }
    
    // Force immediate render
    chart.timeScale().fitContent();


    // Handle chart clicks for order placement
    chart.subscribeClick((param) => {
      if (param.point && param.time) {
        const price = candlestickSeries.coordinateToPrice(param.point.y);
        if (price && onPriceClick) {
          onPriceClick(parseFloat(price.toFixed(2)));
        }
      }
    });

    // Handle mouse move for price hover
    chart.subscribeCrosshairMove((param) => {
      if (param.point) {
        const price = candlestickSeries.coordinateToPrice(param.point.y);
        setHoveredPrice(price ? parseFloat(price.toFixed(2)) : null);
      } else {
        setHoveredPrice(null);
      }
    });

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        if (chart) {
          chart.remove();
        }
      } catch (error) {
        console.warn('Error removing chart:', error);
      }
    };
  }, [onPriceClick, currentPrice, pair]);

  // Add order to chart with stop loss and take profit
  const addOrderOverlay = (order) => {
    if (!chartRef.current || !candlestickSeriesRef.current) return;

    const newOrder = {
      id: Date.now(),
      ...order,
      timestamp: Date.now(),
    };

    setOrders(prev => [...prev, newOrder]);

    // Add main order price line
    const mainPriceLine = {
      price: order.price,
      color: order.side === 'buy' ? '#00C853' : '#FF5722',
      lineWidth: 3,
      lineStyle: 0, // Solid
      axisLabelVisible: true,
      title: `${order.side.toUpperCase()} ${order.amount} ETH @ $${order.price}`,
    };

    const mainLine = candlestickSeriesRef.current.createPriceLine(mainPriceLine);
    setActiveOrderLines(prev => [...prev, { id: newOrder.id, line: mainLine, type: 'main' }]);

    // Add stop loss line if provided
    if (order.stopLoss) {
      const stopLossLine = {
        price: order.stopLoss,
        color: '#FF1744',
        lineWidth: 2,
        lineStyle: 2, // Dashed
        axisLabelVisible: true,
        title: `Stop Loss $${order.stopLoss}`,
      };

      const slLine = candlestickSeriesRef.current.createPriceLine(stopLossLine);
      setStopLossLines(prev => [...prev, { id: newOrder.id, line: slLine, price: order.stopLoss }]);
    }

    // Add take profit line if provided
    if (order.takeProfit) {
      const takeProfitLine = {
        price: order.takeProfit,
        color: '#00E676',
        lineWidth: 2,
        lineStyle: 2, // Dashed
        axisLabelVisible: true,
        title: `Take Profit $${order.takeProfit}`,
      };

      const tpLine = candlestickSeriesRef.current.createPriceLine(takeProfitLine);
      setTakeProfitLines(prev => [...prev, { id: newOrder.id, line: tpLine, price: order.takeProfit }]);
    }

    // Auto-remove after 30 seconds for SL/TP orders (longer for visibility)
    setTimeout(() => {
      setOrders(prev => prev.filter(o => o.id !== newOrder.id));
      
      // Remove price lines
      setActiveOrderLines(prev => {
        const linesToRemove = prev.filter(l => l.id === newOrder.id);
        linesToRemove.forEach(l => {
          try {
            candlestickSeriesRef.current.removePriceLine(l.line);
          } catch (e) {
            console.log('Line already removed');
          }
        });
        return prev.filter(l => l.id !== newOrder.id);
      });

      setStopLossLines(prev => {
        const linesToRemove = prev.filter(l => l.id === newOrder.id);
        linesToRemove.forEach(l => {
          try {
            candlestickSeriesRef.current.removePriceLine(l.line);
          } catch (e) {
            console.log('SL Line already removed');
          }
        });
        return prev.filter(l => l.id !== newOrder.id);
      });

      setTakeProfitLines(prev => {
        const linesToRemove = prev.filter(l => l.id === newOrder.id);
        linesToRemove.forEach(l => {
          try {
            candlestickSeriesRef.current.removePriceLine(l.line);
          } catch (e) {
            console.log('TP Line already removed');
          }
        });
        return prev.filter(l => l.id !== newOrder.id);
      });
    }, 30000);
  };

  // Expose method to parent component
  React.useImperativeHandle(ref, () => ({
    addOrderOverlay,
  }));

  return (
    <div className="tradingview-chart-container">
      <div className="chart-header">
        <div className="chart-info">
          <h3 className="chart-title">{pair}</h3>
          <div className="price-info">
            <span className="current-price">${currentPrice.toFixed(2)}</span>
            <span className="price-change positive">+2.4%</span>
          </div>
        </div>
        
        <div className="chart-controls">
          <div className="timeframe-selector">
            <button className="timeframe-btn active">1m</button>
            <button className="timeframe-btn">5m</button>
            <button className="timeframe-btn">15m</button>
            <button className="timeframe-btn">1h</button>
            <button className="timeframe-btn">4h</button>
            <button className="timeframe-btn">1D</button>
          </div>
          
        <div className="chart-tools">
          <button className="tool-btn" title="Drawing Tools">Draw</button>
          <button className="tool-btn" title="Indicators">Indicators</button>
          <button className="tool-btn" title="Settings">Settings</button>
          <button className="tool-btn" title="Fullscreen">Expand</button>
        </div>
        </div>
      </div>

      <div 
        ref={chartContainerRef} 
        className="chart-canvas" 
        style={{ 
          width: '100%', 
          height: '500px',
          background: '#0a0a0a',
          position: 'relative'
        }} 
      />
      
      {hoveredPrice && (
        <div className="price-hover-tooltip">
          <div className="hover-price">${hoveredPrice.toFixed(2)}</div>
          <div className="hover-actions">
            <button 
              className="quick-buy-btn"
              onClick={() => onPriceClick && onPriceClick(hoveredPrice, 'buy')}
            >
              Buy
            </button>
            <button 
              className="quick-sell-btn"
              onClick={() => onPriceClick && onPriceClick(hoveredPrice, 'sell')}
            >
              Sell
            </button>
          </div>
        </div>
      )}

      {/* Order Overlays */}
      <div className="order-overlays">
        {orders.map(order => (
          <div key={order.id} className={`order-overlay ${order.side}`}>
            <div className="order-header">
              <div className="order-main-info">
                <span className="order-side">{order.side.toUpperCase()}</span>
                <span className="order-amount">{order.amount} ETH</span>
                <span className="order-price">@ ${order.price}</span>
              </div>
              <div className="order-status">Active</div>
            </div>
            
            {(order.stopLoss || order.takeProfit) && (
              <div className="order-sl-tp">
                {order.stopLoss && (
                  <div className="sl-tp-item stop-loss">
                    <span className="sl-tp-label">SL</span>
                    <span className="sl-tp-price">${order.stopLoss}</span>
                  </div>
                )}
                {order.takeProfit && (
                  <div className="sl-tp-item take-profit">
                    <span className="sl-tp-label">TP</span>
                    <span className="sl-tp-price">${order.takeProfit}</span>
                  </div>
                )}
                {order.stopLoss && order.takeProfit && (
                  <div className="risk-reward">
                    <span className="rr-label">R:R</span>
                    <span className="rr-ratio">
                      1:{((Math.abs(order.takeProfit - order.price) / Math.abs(order.price - order.stopLoss))).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Click instruction */}
      <div className="chart-instructions">
        <div className="instruction-text">
          Click chart to place order at price level
        </div>
      </div>
    </div>
  );
});

export default TradingViewChart;