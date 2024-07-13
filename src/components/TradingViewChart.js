import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const TradingViewChart = () => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries();

    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=30')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(d => ({
          time: d[0] / 1000, // Convert milliseconds to seconds
          open: d[1],
          high: d[2],
          low: d[3],
          close: d[4]
        }));
        candlestickSeries.setData(formattedData);
      });

    const positionSeries = chart.addLineSeries({
      color: 'red',
      lineWidth: 2,
    });

    const positionData = [
      { time: Math.floor(Date.now() / 1000) - 86400 * 5, value: 30000 },
      { time: Math.floor(Date.now() / 1000) - 86400 * 4, value: 31000 },
      { time: Math.floor(Date.now() / 1000) - 86400 * 3, value: 32000 },
    ];
    positionSeries.setData(positionData);

    const handleResize = () => {
      chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '80vh' }} />;
};

export default TradingViewChart;
