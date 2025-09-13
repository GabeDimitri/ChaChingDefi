import React, { useState } from 'react';
import '../styles/MyAccounts.css';

const MyAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState('checking');
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [destinationAccount, setDestinationAccount] = useState('savings');

  const accountTypes = [
    { 
      id: 'checking', 
      name: 'Digital Checking', 
      icon: '💳', 
      color: '#00d4aa',
      description: 'Instant access for daily transactions',
      interestRate: '0.50% APY',
      mechanism: 'Liquidity pools'
    },
    { 
      id: 'savings', 
      name: 'High-Yield Savings', 
      icon: '🏦', 
      color: '#3b82f6',
      description: 'Earn rewards by staking your digital dollars',
      interestRate: '4.25% APY',
      mechanism: 'Staking rewards'
    },
    { 
      id: 'tfsa', 
      name: 'Digital TFSA', 
      icon: '📈', 
      color: '#8b5cf6',
      description: 'Tax-free yield farming and compound growth',
      interestRate: '6.75% APY',
      mechanism: 'Yield farming'
    },
    { 
      id: 'investment', 
      name: 'Investment Account', 
      icon: '📊', 
      color: '#f59e0b',
      description: 'Diversified DeFi strategies and protocols',
      interestRate: 'Variable',
      mechanism: 'Multi-protocol yield'
    }
  ];

  const currencies = [
    { symbol: 'USDC', name: 'Digital US Dollar', balance: '12,450.75', icon: '$', description: 'USD Coin (USDC)' },
    { symbol: 'CADC', name: 'Digital Canadian Dollar', balance: '8,230.50', icon: 'C$', description: 'CAD Coin (CADC)' },
    { symbol: 'EURC', name: 'Digital Euro', balance: '3,680.25', icon: '€', description: 'EUR Coin (EURC)' },
    { symbol: 'GBPC', name: 'Digital British Pound', balance: '2,120.80', icon: '£', description: 'GBP Coin (GBPC)' }
  ];

  const accountBalances = {
    checking: { USDC: '12,450.75', CADC: '3,230.50', EURC: '1,680.25', GBPC: '920.80' },
    savings: { USDC: '25,890.00', CADC: '15,670.25', EURC: '8,450.75', GBPC: '5,240.30' },
    tfsa: { USDC: '18,750.50', CADC: '22,890.75', EURC: '12,340.00', GBPC: '8,920.45' },
    investment: { USDC: '45,230.80', CADC: '32,150.90', EURC: '28,670.50', GBPC: '19,850.25' }
  };

  const recentTransactions = [
    { id: 1, type: 'Stake', amount: '$1,500.00 USDC', from: 'Checking', to: 'Savings', status: 'Completed', time: '2 hours ago', description: 'Staked USDC for 4.25% APY rewards' },
    { id: 2, type: 'Deposit', amount: '$3,200.00 USDC', from: 'External Bank', to: 'Checking', status: 'Pending', time: '1 day ago', description: 'Bank transfer via bridge protocol' },
    { id: 3, type: 'Farm', amount: '$500.00 USDC', from: 'TFSA', to: 'Investment', status: 'Completed', time: '3 days ago', description: 'Added to yield farming pool' },
    { id: 4, type: 'Rewards', amount: '$42.75 USDC', from: 'Staking Pool', to: 'Savings', status: 'Completed', time: '1 week ago', description: 'Weekly staking rewards earned' },
    { id: 5, type: 'Claim', amount: '$18.30 USDC', from: 'Yield Farm', to: 'TFSA', status: 'Completed', time: '2 weeks ago', description: 'Harvested farming rewards' }
  ];

  const handleTransfer = () => {
    if (!transferAmount || !selectedCurrency) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate transfer transaction
    const fromAccount = accountTypes.find(a => a.id === selectedAccount)?.name;
    const toAccount = accountTypes.find(a => a.id === destinationAccount)?.name;
    const currencyIcon = currencies.find(c => c.symbol === selectedCurrency)?.icon;
    alert(`Transferring ${currencyIcon}${transferAmount} ${selectedCurrency} from ${fromAccount} to ${toAccount}`);
    setTransferAmount('');
  };

  return (
    <div className="my-accounts">
      {/* Page Header */}
      <div className="accounts-header">
        <h1 className="page-title">My Accounts</h1>
        <p className="page-subtitle">Manage your digital banking accounts and transfers</p>
      </div>

      {/* Account Overview */}
      <div className="accounts-overview">
        <div className="total-balance-card">
          <div className="balance-summary">
            <h3>Total Account Balance</h3>
            <div className="total-balance">$102,471.35</div>
            <div className="balance-growth">
              <span className="growth-value positive">+$2,847.50 (+2.86%)</span>
              <span className="growth-period">This month</span>
            </div>
          </div>
        </div>
        
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-label">Available to Spend</span>
              <span className="stat-value">$12,450.75</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <span className="stat-label">Interest Earned (YTD)</span>
              <span className="stat-value">$1,247.80</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <span className="stat-label">Investment Growth</span>
              <span className="stat-value">+12.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="accounts-grid">
        
        {/* Left Panel - Account Types */}
        <div className="accounts-panel">
          <h3 className="panel-title">Your Accounts</h3>
          
          <div className="account-selector">
            {accountTypes.map(account => (
              <div 
                key={account.id}
                className={`account-card ${selectedAccount === account.id ? 'active' : ''}`}
                onClick={() => setSelectedAccount(account.id)}
              >
                <div className="account-header">
                  <div className="account-icon" style={{ backgroundColor: account.color }}>
                    {account.icon}
                  </div>
                  <div className="account-info">
                    <h4 className="account-name">{account.name}</h4>
                    <p className="account-description">{account.description}</p>
                  </div>
                </div>
                <div className="account-details">
                  <div className="account-balance">
                    ${Object.values(accountBalances[account.id]).reduce((sum, bal) => 
                      sum + parseFloat(bal.replace(/,/g, '')), 0
                    ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="account-rate-container">
                    <div className="account-rate">{account.interestRate}</div>
                    <div className="account-mechanism">{account.mechanism}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Account Currency Balances */}
          <div className="currency-balances">
            <h4>{accountTypes.find(a => a.id === selectedAccount)?.name} Balances</h4>
            <div className="balance-list">
              {currencies.map(currency => (
                <div key={currency.symbol} className="balance-item">
                  <div className="balance-info">
                    <div className="currency-icon">{currency.icon}</div>
                    <div className="currency-details">
                      <span className="currency-symbol">{currency.name}</span>
                      <span className="currency-name">{currency.description}</span>
                    </div>
                  </div>
                  <div className="balance-amounts">
                    <div className="balance-amount">
                      {currency.icon}{accountBalances[selectedAccount]?.[currency.symbol] || '0.00'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Transfer Interface */}
        <div className="transfer-panel">
          <div className="transfer-section">
            <h3 className="panel-title">Transfer Between Accounts</h3>
            
            <div className="transfer-form">
              <div className="transfer-accounts">
                <div className="transfer-from">
                  <label>From Account</label>
                  <select 
                    value={selectedAccount} 
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="account-select"
                  >
                    {accountTypes.map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="transfer-arrow">→</div>
                
                <div className="transfer-to">
                  <label>To Account</label>
                  <select 
                    value={destinationAccount} 
                    onChange={(e) => setDestinationAccount(e.target.value)}
                    className="account-select"
                  >
                    {accountTypes.filter(a => a.id !== selectedAccount).map(account => (
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="transfer-currency">
                <label>Currency</label>
                <select 
                  value={selectedCurrency} 
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="currency-select"
                >
                  {currencies.map(currency => (
                    <option key={currency.symbol} value={currency.symbol}>
                      {currency.icon} {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div className="transfer-amount">
                <label>Amount</label>
                <div className="amount-input-container">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="amount-input"
                  />
                  <span className="amount-suffix">{selectedCurrency}</span>
                </div>
                <div className="balance-available">
                  Available: {currencies.find(c => c.symbol === selectedCurrency)?.icon}{accountBalances[selectedAccount]?.[selectedCurrency] || '0.00'}
                </div>
              </div>

              <div className="transfer-summary">
                <div className="summary-row">
                  <span>Transfer Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-row">
                  <span>Processing Time</span>
                  <span>Instant</span>
                </div>
                <div className="summary-row total">
                  <span>Amount to Transfer</span>
                  <span>{currencies.find(c => c.symbol === selectedCurrency)?.icon}{transferAmount || '0.00'} {selectedCurrency}</span>
                </div>
              </div>

              <button className="transfer-btn" onClick={handleTransfer}>
                Transfer Funds
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="recent-transactions">
            <h4>Recent Activity</h4>
            <div className="transaction-history">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-type-amount">
                      {transaction.type} • {transaction.amount}
                    </div>
                    <div className="transaction-route">
                      {transaction.from} → {transaction.to}
                    </div>
                    <div className="transaction-description">
                      {transaction.description}
                    </div>
                  </div>
                  <div className="transaction-details">
                    <div className={`transaction-status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </div>
                    <div className="transaction-time">{transaction.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccounts;
