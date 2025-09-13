import React from 'react';
import '../styles/BankDashboard.css';

const BankDashboard = () => {
  return (
    <div className="bank-dashboard">
      {/* Portfolio Overview */}
      <div className="portfolio-overview">
        <div className="portfolio-card">
          <div className="portfolio-label">TOTAL PORTFOLIO VALUE</div>
          <div className="portfolio-value">$127,543.21</div>
          <div className="portfolio-change positive">
            +$1,247.83 (24h)
          </div>
        </div>

        <div className="portfolio-card">
          <div className="portfolio-label">TOTAL EARNINGS</div>
          <div className="portfolio-value">$2,847.93</div>
          <div className="portfolio-change positive">Average APY: 12.4%</div>
        </div>

        <div className="portfolio-card">
          <div className="portfolio-label">QUICK ACTIONS</div>
          <div className="quick-actions">
            <button className="quick-action-btn primary">Deposit</button>
            <button className="quick-action-btn">Withdraw</button>
            <button className="quick-action-btn">Swap</button>
            <button className="quick-action-btn">Borrow</button>
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div className="holdings-section">
        <div className="section-header">
          <h3 className="section-title">Your Holdings</h3>
          <a href="#" className="view-all-link">View All</a>
        </div>
        
        <div className="holdings-list">
          <div className="holding-item">
            <div className="holding-info">
              <div className="holding-icon">ETH</div>
              <div className="holding-details">
                <h4>Ethereum</h4>
                <p>ETH</p>
              </div>
            </div>
            <div className="holding-value">
              <div className="holding-price">$12,947.32</div>
              <div className="holding-amount">5.2847 ETH</div>
            </div>
          </div>

          <div className="holding-item">
            <div className="holding-info">
              <div className="holding-icon">TGC</div>
              <div className="holding-details">
                <h4>ChaChing Defi Banking Gold Coin</h4>
                <p>TGC</p>
              </div>
            </div>
            <div className="holding-value">
              <div className="holding-price">$47,541.00</div>
              <div className="holding-amount">15,847 TGC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="markets-grid">
        {/* Lending Markets */}
        <div className="lending-markets">
          <div className="section-header">
            <h3 className="section-title">Lending Markets</h3>
            <a href="#" className="view-all-link">View All</a>
          </div>

          <table className="markets-table">
            <thead>
              <tr>
                <th>ASSET</th>
                <th>SUPPLY APY</th>
                <th>BORROW APY</th>
                <th>TOTAL SUPPLIED</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="market-asset">
                  <span>ETH</span>
                </td>
                <td className="apy-value text-positive">4.21%</td>
                <td>6.47%</td>
                <td>$2.4M</td>
              </tr>
              <tr>
                <td className="market-asset">
                  <span>TGC</span>
                </td>
                <td className="apy-value text-positive">8.93%</td>
                <td>12.15%</td>
                <td>$850K</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Yield Farming */}
        <div className="yield-farming">
          <div className="section-header">
            <h3 className="section-title">Yield Farming</h3>
            <a href="#" className="view-all-link">View All</a>
          </div>

          <div className="farming-card">
            <div className="farm-header">
              <div className="farm-pair">ETH-TGC LP</div>
              <div className="farm-apy">
                <div className="apy-value text-positive">147.3%</div>
                <div className="apy-label">APY</div>
              </div>
            </div>
            <div className="farm-details">
              <div className="farm-stat">
                <span className="stat-label">YOUR STAKE</span>
                <span className="stat-value">$8,429.00</span>
              </div>
              <div className="farm-stat">
                <span className="stat-label">PENDING REWARDS</span>
                <span className="stat-value">247.3 ChaChing Defi Banking</span>
              </div>
            </div>
            <button className="harvest-btn">Harvest Rewards</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDashboard;