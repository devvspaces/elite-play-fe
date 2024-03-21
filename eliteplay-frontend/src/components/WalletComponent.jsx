import React, { useState } from 'react';
import './WalletComponent.css';
import icon1 from '../assets/usdt.svg';
import icon2 from '../assets/solana.svg';
import CustomDropdown from './CustomDropdown';

const options = [
  { text: 'USDT', value: 'usdt', icon: icon1 },
  { text: 'SOL', value: 'solana', icon: icon2 },
  // Add more options as needed
];

const WalletComponent = ({ isNavOpen }) => {
  const [currentSection, setCurrentSection] = useState('Balance');
  const [depositmethod, setDepositMethod] = useState('crypto');

  return (
    <div className={`wallet-comp ${isNavOpen ? 'wallet-comp-extended' : ''}`}>
      <button className="wallet-header">Wallet</button>
      <div className="wallet-comps">
        <div className="wallet-comp_wallet-options">
          <div
            onClick={() => setCurrentSection('Balance')}
            className="wallet-option"
          >
            <img src="./wallet-02.svg" alt="wallet" />
            <span>Balance</span>
          </div>
          <div
            onClick={() => setCurrentSection('Deposit')}
            className="wallet-option"
          >
            <img src="./money-receive-01.svg" alt="wallet" />
            <span>Deposit</span>
          </div>
          <div className="wallet-option">
            <img src="./bitcoin-withdraw.svg" alt="wallet" />
            <span>Withdraw</span>
          </div>
          <div className="wallet-option">
            <img src="./coins-01.svg" alt="wallet" />
            <span>Earnings</span>
          </div>
          <div className="wallet-option">
            <img src="./bitcoin-transaction.svg" alt="wallet" />
            <span>Transaction</span>
          </div>
        </div>
        <div className="wallet-comp_wallet-info">
          {currentSection === 'Balance' && (
            <div>
              <div className="wallet-comp_wallet-balance">
                <div className="pot-info">
                  <img src="./pot-coin.svg" alt="" />
                  <div className="pot-balance">
                    <span className="real-balance">Total Balance</span>
                    <span className="real-balance_amount">USD 300.00</span>
                  </div>
                </div>
                <hr />
                <div className="pot-balance">
                  <span>Real Balance</span>
                  <span>USD 300.00</span>
                </div>
                <div className="pot-balance">
                  <span>Bonus Balance</span>
                  <span>USD 300.00</span>
                </div>
              </div>
              <div className="mainBalance-section">
                <div className="mainBalance_hide">
                  <span>Hide 0 Balance</span>
                  <input type="text" placeholder="Search" />
                </div>
                <p>Fiat Currency</p>
                <div className="mainBalance-fiat-currency">
                  <div className="currency-title">
                    <img src="./cryptocurrency-color_usd.svg" alt="crypto" />
                    <span>USD</span>
                  </div>
                  <div className="mainBalance-amount">
                    <span>20.00</span>
                    <span>Deposit</span>
                    <span>Withdraw</span>
                  </div>
                </div>
                <p>Cryptocurrency</p>
                <div className="mainBalance-fiat-currency">
                  <div className="currency-title">
                    <img src="./twemoji_coin.svg" alt="crypto" />
                    <span>eGold</span>
                  </div>
                  <span className="crypto-amount-balance">300.00</span>
                </div>
              </div>
            </div>
          )}
          {currentSection === 'Deposit' && (
            <div className="wallet-deposit">
              <div className="wallet-deposit_headers">
                <span
                  onClick={() => {
                    setDepositMethod('crypto');
                  }}
                  className={`${
                    depositmethod === 'crypto' ? 'wallet-deposit_active' : ''
                  }`}
                >
                  Crypto
                </span>
                <span
                  onClick={() => {
                    setDepositMethod('fiat');
                  }}
                  className={`${
                    depositmethod === 'fiat' ? 'wallet-deposit_active' : ''
                  }`}
                >
                  Fiat
                </span>
              </div>
              {depositmethod === 'crypto' ? (
                <div className="deposit-wallet_main">
                  <div className="wallet-deposit_cryptocoins">
                    <div>
                      <img src="./usdt.svg" alt="usdt" />
                      <span>USDT</span>
                    </div>
                    <div>
                      <img src="./solana.svg" alt="solana" />
                      <span>SOL</span>
                    </div>
                  </div>
                  <div>
                    <div className="crypto-deposit-method_type">
                      <div>
                        <p>Deposit Currency</p>
                        <select className="options-list">
                          <option value="usdt">USDT</option>
                          <option value="solana">SOL</option>
                        </select>
                      </div>
                      <div>
                        <p>Choose Network</p>
                        <select className="options-list">
                          <option value="erc20">ERC 20</option>
                          <option value="erc21">ERC 21</option>
                        </select>
                      </div>
                    </div>
                    <p>Deposit Address</p>
                    <div className="mainBalance-fiat-currency">
                      <span className="cryptoAddress">
                        0x67
                        <span className="middleAddress">
                          8bD9B31a318af10bb0897905E425dBb
                        </span>
                        Ce5A794
                      </span>
                      <div className="copy-box">
                        <img src="./copy-01.svg" alt="copy-icon" />
                        <span>Copy</span>
                      </div>
                    </div>
                    <div className="deposit-crypto">
                      <img src="./alert-01.svg" alt="alert-icon" />
                      <span>Minimum Deposit: 0.1 USDT</span>
                    </div>
                    <div className="crypto-notice">
                      <span className="crypto-notice_notice-head">
                        NOTICE:{' '}
                      </span>
                      <span className="crypto-notice_notice-info">
                        Send only USDT to this deposit address. Coins will be
                        deposited automatically after 20 network confirmations. 
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="deposit-wallet_main">
                    <div>
                      <div className="crypto-deposit-method_type">
                        <div>
                          <p>Deposit Currency</p>
                          <select className="options-list">
                            <option value="usd">USD</option>
                            <option value="ngn">NGN</option>
                          </select>
                        </div>
                        <div>
                          <p>Choose Network</p>
                          <select className="options-list">
                            <option value="paystack">PayStack</option>
                            <option value="interswitch">Interswitch1</option>
                          </select>
                        </div>
                      </div>
                      <div className='fiat-deposit_amount'>
                      <p>Deposit Amount</p>
                      <p className='fial-deposit_range'>10 - 100000 USD</p>
                      </div>
                      
                      <div className="mainBalance-fiat-currency">
                          <span className="middleAddress">
                           10
                          </span>
                       <span className='deposit-currency'>USD</span>
                      </div>
                      <div className='fiat-deposit_options'>
                        <div className='fiat-deposit_option fiat-deposit_option_active'>
                            <span>USD 10</span>
                        </div>
                        <div className='fiat-deposit_option'>
                            <span>USD 50</span>
                        </div>
                        <div className='fiat-deposit_option'>
                            <span>USD 100</span>
                        </div>
                        <div className='fiat-deposit_option'>
                            <span>USD 500</span>
                        </div>
                        <div className='fiat-deposit_option'>
                            <span>USD 1000</span>
                        </div>
                      </div>
                      <div className='deposit_fiat-btn'>
                        <button>Deposit Fiat</button>
                      </div>
                      <div className="crypto-notice">
                        <span className="crypto-notice_notice-info">
                        1.Your transfer amount has to MATCH the submission amount. <br />
                        2.Each Order ID can ONLY be used once to avoid duplicates. <br />
                        3.DO NOT save and deposit to previous's bank account. Please follow the deposit guideline to make deposit, otherwise your deposit will be missing.
                        </span>
                      </div>
                      <div className='fiat-deposit_info'>
                        <span>You will be redirected to a third-party site verified by elitepay for a secure and trustworthy browsing experience</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
