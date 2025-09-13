import React, { useState } from 'react';
import '../styles/YieldFarming.css';

const YieldFarming = () => {
  const [filter, setFilter] = useState('all');

  const farms = [
    {
      id: 1,
      pair: 'ETH-TGC LP',
      apy: '147.3',
      tvl: '$2.4M',
      featured: true,
      userStake: '$8,429.00',
      pendingRewards: '247.3',
      rewardToken: 'TRW',
      dailyRewards: '$12.47'
    },
    {
      id: 2,
      pair: 'ETH-USDC LP',
      apy: '67.8',
      tvl: '$5.8M',
      userStake: '$0.00',
      pendingRewards: '0',
      rewardToken: 'TRW',
      dailyRewards: '$0.00'
    }
  ];

  return (
    <div className="yield-farming">
      <div className="yield-header">
        <h1 className="page-title">Available Farms</h1>
      </div>

      {/* Filter Tabs */}
      <div className="farm-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Farms
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </button>
      </div>

      {/* Farms Grid */}
      <div className="farms-grid">
        {farms.map(farm => (
          <div key={farm.id} className={`farm-card ${farm.featured ? 'featured' : ''}`}>
            {farm.featured && <div className="featured-badge">Featured</div>}
            
            <div className="farm-header">
              <div className="farm-pair">
                <div className="pair-icons">
                  <div className="pair-icon">ETH</div>
                  <div className="pair-icon">TGC</div>
                </div>
                <span className="pair-name">{farm.pair}</span>
              </div>
              <div className="farm-apy">
                <div className="apy-value">{farm.apy}%</div>
                <div className="apy-label">APY</div>
              </div>
            </div>

            <div className="farm-tvl">
              <span className="farm-tvl-label">TVL</span>
              <span className="farm-tvl-value">{farm.tvl}</span>
            </div>

            {farm.userStake !== '$0.00' && (
              <>
                <div className="farm-user-stats">
                  <div className="user-stat">
                    <span className="user-stat-label">YOUR STAKE</span>
                    <span className="user-stat-value">{farm.userStake}</span>
                  </div>
                  <div className="user-stat">
                    <span className="user-stat-label">DAILY REWARDS</span>
                    <span className="user-stat-value">{farm.dailyRewards}</span>
                  </div>
                </div>

                <div className="farm-rewards">
                  <div className="rewards-header">
                    <div>
                      <div className="rewards-label">PENDING</div>
                      <div className="rewards-value">{farm.pendingRewards} TRW</div>
                    </div>
                    <div className="rewards-token">REWARD TOKEN</div>
                  </div>
                  <div className="rewards-progress">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div className="farm-actions">
                  <button className="farm-btn">+ Stake</button>
                  <button className="farm-btn">- Unstake</button>
                  <button className="farm-btn primary" style={{ gridColumn: '1 / -1' }}>
                    Harvest ({farm.pendingRewards} TRW)
                  </button>
                </div>
              </>
            )}

            {farm.userStake === '$0.00' && (
              <div className="farm-actions">
                <button className="farm-btn primary" style={{ gridColumn: '1 / -1' }}>
                  Start Farming
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="performance-section">
        <div className="performance-chart">
          <h3>Farming Performance</h3>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '85%' }}></div>
            <div className="chart-bar" style={{ height: '95%' }}></div>
            <div className="chart-bar" style={{ height: '100%' }}></div>
          </div>
        </div>

        <div className="reward-history">
          <h3>Reward History</h3>
          <div className="history-list">
            <div className="history-item">
              <span className="history-date">Today</span>
              <div className="history-amount">
                <span className="history-token">+15.7 TRW</span>
                <span className="history-value">$82.80</span>
              </div>
            </div>
            <div className="history-item">
              <span className="history-date">Yesterday</span>
              <div className="history-amount">
                <span className="history-token">+18.2 TRW</span>
                <span className="history-value">$72.80</span>
              </div>
            </div>
            <div className="history-item">
              <span className="history-date">2 days ago</span>
              <div className="history-amount">
                <span className="history-token">+16.9 TRW</span>
                <span className="history-value">$67.60</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-action-item">
          <div className="action-info">
            <h4>Harvest All Rewards</h4>
            <p>247.3 TRW</p>
          </div>
          <div className="action-value">~$988.20</div>
        </div>
        <div className="quick-action-item">
          <div className="action-info">
            <h4>Auto-Compound</h4>
            <p>Reinvest rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldFarming;