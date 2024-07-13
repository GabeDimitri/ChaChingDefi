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
        height: '400',
        symbol: 'BITSTAMP:BTCUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
        studies: [
          'MACD@tv-basicstudies',
          'RSI@tv-basicstudies',
          'BB@tv-basicstudies'
        ],
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div id="tradingview_btcusd" style={{ width: '1080px', height: '720px' }} />;
};

export default TradingViewWidget;
