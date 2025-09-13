import React, { useState } from 'react';
import '../styles/TransferInterface.css';

const TransferInterface = () => {
  const [transferType, setTransferType] = useState('send');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [note, setNote] = useState('');

  const assets = [
    { symbol: 'ETH', name: 'Ethereum', balance: '5.2847' },
    { symbol: 'TGC', name: 'TRW Gold Coin', balance: '15,847' },
    { symbol: 'USDC', name: 'USD Coin', balance: '2,450' }
  ];

  const recentContacts = [
    { name: 'Alice Thompson', address: '0x742d...7c4f', lastSent: '2 days ago' },
    { name: 'Trading Partner', address: '0x8f3a...9b2e', lastSent: '1 week ago' },
    { name: 'Investment Fund', address: '0x1a7b...5d8c', lastSent: '2 weeks ago' }
  ];

  return (
    <div className="transfer-interface">
      <div className="transfer-header">
        <h1 className="page-title">Send & Receive</h1>
        <p className="page-subtitle">Transfer assets securely to any wallet or contact</p>
      </div>

      <div className="transfer-main">
        {/* Left Panel - Transfer Form */}
        <div className="transfer-form-panel">
          {/* Transfer Type Tabs */}
          <div className="transfer-tabs">
            <button 
              className={`tab-btn ${transferType === 'send' ? 'active' : ''}`}
              onClick={() => setTransferType('send')}
            >
              Send
            </button>
            <button 
              className={`tab-btn ${transferType === 'receive' ? 'active' : ''}`}
              onClick={() => setTransferType('receive')}
            >
              Receive
            </button>
          </div>

          {transferType === 'send' ? (
            <div className="send-form">
              {/* Recipient */}
              <div className="form-section">
                <label className="form-label">RECIPIENT</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter wallet address or ENS name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <div className="input-helper">
                  Supports wallet addresses, ENS names, and phone numbers
                </div>
              </div>

              {/* Asset Selection */}
              <div className="form-section">
                <label className="form-label">ASSET</label>
                <div className="asset-grid">
                  {assets.map(asset => (
                    <div 
                      key={asset.symbol}
                      className={`asset-card ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                      onClick={() => setSelectedAsset(asset.symbol)}
                    >
                      <div className="asset-icon">{asset.symbol}</div>
                      <div className="asset-details">
                        <div className="asset-name">{asset.symbol}</div>
                        <div className="asset-balance">{asset.balance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="form-section">
                <label className="form-label">AMOUNT</label>
                <div className="amount-input-group">
                  <input
                    type="number"
                    className="amount-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="max-btn">MAX</button>
                </div>
                <div className="amount-info">
                  <span>Available: {assets.find(a => a.symbol === selectedAsset)?.balance} {selectedAsset}</span>
                  <span>≈ $2,450.75</span>
                </div>
              </div>

              {/* Note */}
              <div className="form-section">
                <label className="form-label">NOTE (OPTIONAL)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add a note for this transaction"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Send Button */}
              <button className="send-btn">
                Send {amount || '0'} {selectedAsset}
              </button>

              {/* Transaction Preview */}
              {amount && (
                <div className="transaction-preview">
                  <div className="preview-row">
                    <span>Amount</span>
                    <span>{amount} {selectedAsset}</span>
                  </div>
                  <div className="preview-row">
                    <span>Network Fee</span>
                    <span>0.002 ETH</span>
                  </div>
                  <div className="preview-row total">
                    <span>Total</span>
                    <span>{(parseFloat(amount || 0) + 0.002).toFixed(3)} {selectedAsset}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="receive-form">
              <div className="qr-section">
                <div className="qr-placeholder">
                  <div className="qr-code">QR CODE</div>
                </div>
                <p className="wallet-address">0x742d35Cc6854C1532C4f7c9c942B8D7c4f7c4f</p>
                <button className="copy-btn">Copy Address</button>
              </div>
              
              <div className="receive-instructions">
                <h3>How to Receive</h3>
                <ul>
                  <li>Share your wallet address or QR code</li>
                  <li>Ensure sender uses correct network (Ethereum)</li>
                  <li>Funds will appear in your balance automatically</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Contacts & Recent */}
        <div className="transfer-sidebar">
          {/* Recent Contacts */}
          <div className="contacts-section">
            <h3 className="section-title">Recent Contacts</h3>
            <div className="contacts-list">
              {recentContacts.map((contact, index) => (
                <div 
                  key={index}
                  className="contact-item"
                  onClick={() => setRecipient(contact.address)}
                >
                  <div className="contact-avatar">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-address">{contact.address}</div>
                    <div className="contact-last-sent">{contact.lastSent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h3 className="section-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action">
                <span className="action-label">Request Payment</span>
              </button>
              <button className="quick-action">
                <span className="action-label">Split Bill</span>
              </button>
              <button className="quick-action">
                <span className="action-label">Recurring Transfer</span>
              </button>
              <button className="quick-action">
                <span className="action-label">Payment Link</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="recent-transactions">
            <h3 className="section-title">Recent Transfers</h3>
            <div className="transaction-list">
              <div className="transaction-item">
                <div className="transaction-type sent">Sent</div>
                <div className="transaction-details">
                  <div className="transaction-amount">-2.5 ETH</div>
                  <div className="transaction-to">To: Alice Thompson</div>
                  <div className="transaction-time">2 hours ago</div>
                </div>
              </div>
              <div className="transaction-item">
                <div className="transaction-type received">Received</div>
                <div className="transaction-details">
                  <div className="transaction-amount">+1,250 TGC</div>
                  <div className="transaction-to">From: Investment Fund</div>
                  <div className="transaction-time">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferInterface;
