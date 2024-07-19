import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: 'tradingview_btcusd',
        width: '100%',
        height: '100%',
        symbol: 'BITSTAMP:BTCUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',  // Set theme to dark
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
   
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="tradingview_btcusd" className="exchange__chart" style={{ width: '100%', height: '80vh' }} />;
};

export default TradingViewWidget;
