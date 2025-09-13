import React, { useState } from 'react';
import '../styles/SavingsInterface.css';

const SavingsInterface = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoalModal, setNewGoalModal] = useState(false);

  const savingsGoals = [
    {
      id: 1,
      name: 'Emergency Fund',
      target: 50000,
      current: 32400,
      deadline: '2024-12-31',
      apy: '8.5%',
      strategy: 'Conservative Staking',
      monthlyDeposit: 2500,
      asset: 'USDC',
      autoDeposit: true,
      riskLevel: 'Low'
    },
    {
      id: 2,
      name: 'House Down Payment',
      target: 100000,
      current: 28750,
      deadline: '2025-06-15',
      apy: '12.3%',
      strategy: 'Balanced DeFi',
      monthlyDeposit: 5000,
      asset: 'ETH',
      autoDeposit: true,
      riskLevel: 'Medium'
    },
    {
      id: 3,
      name: 'Retirement Savings',
      target: 500000,
      current: 147000,
      deadline: '2035-01-01',
      apy: '15.7%',
      strategy: 'Growth Yield Farming',
      monthlyDeposit: 3000,
      asset: 'Mixed',
      autoDeposit: true,
      riskLevel: 'High'
    }
  ];

  const strategies = [
    {
      name: 'Conservative Staking',
      apy: '6-9%',
      riskLevel: 'Low',
      description: 'Stable staking with established protocols',
      minAmount: 1000
    },
    {
      name: 'Balanced DeFi',
      apy: '10-15%',
      riskLevel: 'Medium',
      description: 'Diversified lending and liquidity pools',
      minAmount: 5000
    },
    {
      name: 'Growth Yield Farming',
      apy: '15-25%',
      riskLevel: 'High',
      description: 'High-yield farming with managed risk',
      minAmount: 10000
    }
  ];

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsToGoal = (current, target, monthlyDeposit, apy) => {
    const monthlyRate = parseFloat(apy) / 100 / 12;
    const remaining = target - current;
    
    if (monthlyRate === 0) {
      return Math.ceil(remaining / monthlyDeposit);
    }
    
    const months = Math.log(1 + (remaining * monthlyRate) / monthlyDeposit) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  return (
    <div className="savings-interface">
      <div className="savings-header">
        <h1 className="page-title">Goal-Based Savings</h1>
        <p className="page-subtitle">Smart savings that work harder for your future</p>
        <button 
          className="create-goal-btn"
          onClick={() => setNewGoalModal(true)}
        >
          Create New Goal
        </button>
      </div>

      {/* Overview Stats */}
      <div className="savings-overview">
        <div className="overview-card">
          <div className="overview-label">TOTAL SAVED</div>
          <div className="overview-value">$208,150</div>
          <div className="overview-change positive">+$12,450 this month</div>
        </div>
        <div className="overview-card">
          <div className="overview-label">AVERAGE APY</div>
          <div className="overview-value">12.2%</div>
          <div className="overview-change">Across all goals</div>
        </div>
        <div className="overview-card">
          <div className="overview-label">PROJECTED COMPLETION</div>
          <div className="overview-value">18 months</div>
          <div className="overview-change">Next goal: House Fund</div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="goals-grid">
        {savingsGoals.map(goal => (
          <div 
            key={goal.id} 
            className={`goal-card ${selectedGoal === goal.id ? 'selected' : ''}`}
            onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
          >
            <div className="goal-header">
              <div className="goal-info">
                <h3 className="goal-name">{goal.name}</h3>
                <div className="goal-strategy">{goal.strategy}</div>
              </div>
              <div className="goal-apy">
                <div className="apy-value">{goal.apy}</div>
                <div className="apy-label">APY</div>
              </div>
            </div>

            <div className="goal-progress">
              <div className="progress-header">
                <span className="progress-current">${goal.current.toLocaleString()}</span>
                <span className="progress-target">of ${goal.target.toLocaleString()}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                />
              </div>
              <div className="progress-percentage">
                {calculateProgress(goal.current, goal.target).toFixed(1)}% complete
              </div>
            </div>

            <div className="goal-details">
              <div className="detail-row">
                <span>Monthly Deposit</span>
                <span>${goal.monthlyDeposit.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span>Target Date</span>
                <span>{new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span>Estimated Completion</span>
                <span>{calculateMonthsToGoal(goal.current, goal.target, goal.monthlyDeposit, goal.apy)} months</span>
              </div>
            </div>

            {selectedGoal === goal.id && (
              <div className="goal-actions">
                <button className="action-btn primary">Add Funds</button>
                <button className="action-btn">Withdraw</button>
                <button className="action-btn">Adjust Goal</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Strategies Section */}
      <div className="strategies-section">
        <h2 className="section-title">Available Strategies</h2>
        <p className="section-subtitle">Choose the right approach for your risk tolerance and timeline</p>
        
        <div className="strategies-grid">
          {strategies.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <div className="strategy-header">
                <h3 className="strategy-name">{strategy.name}</h3>
                <div className={`risk-badge ${strategy.riskLevel.toLowerCase()}`}>
                  {strategy.riskLevel} Risk
                </div>
              </div>
              
              <div className="strategy-apy">
                <span className="apy-range">{strategy.apy}</span>
                <span className="apy-label">Expected APY</span>
              </div>
              
              <p className="strategy-description">{strategy.description}</p>
              
              <div className="strategy-minimum">
                Minimum: ${strategy.minAmount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div className="smart-features">
        <h2 className="section-title">Smart Savings Features</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Auto-Rebalancing</h3>
            <p>Automatically adjusts your portfolio allocation based on market conditions and your timeline.</p>
            <div className="feature-status active">Active</div>
          </div>
          
          <div className="feature-card">
            <h3>Goal Optimizer</h3>
            <p>AI-powered recommendations to help you reach your goals faster with optimal deposit schedules.</p>
            <div className="feature-status active">Active</div>
          </div>
          
          <div className="feature-card">
            <h3>Risk Protection</h3>
            <p>Automatic risk reduction as you approach your target date to protect your savings.</p>
            <div className="feature-status">Enable</div>
          </div>
          
          <div className="feature-card">
            <h3>Tax Optimization</h3>
            <p>Smart withdrawal timing and asset selection to minimize tax implications.</p>
            <div className="feature-status">Enable</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsInterface;
