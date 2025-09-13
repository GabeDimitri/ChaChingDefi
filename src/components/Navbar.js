import React from 'react';
import logo from '../assets/logo.png';
import eth from '../assets/eth.svg';
import Blockies from 'react-blockies';
import { useSelector, useDispatch } from 'react-redux';
import { loadAccount } from '../store/interactions';

import config from '../config.json'

const Navbar = () => {
    const provider = useSelector(state => state.provider.connection);
    const chainId = useSelector(state => state.provider.chainId);
    const account = useSelector(state => state.provider.account);
    const balance = useSelector(state => state.provider.balance);
    const dispatch = useDispatch();

    const connectHandler = async () => {
        try {
            await loadAccount(provider, dispatch);
        } catch (error) {
            console.error('Failed to connect wallet', error);
        }
    }

    const networkHandler = async (e) => {
        const chainId = e.target.value;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        } catch (error) {
            // If the chain is not added, add it first
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId,
                                chainName: chainId === '0x7A69' ? 'Localhost 8545' : 'Kovan Test Network',
                                rpcUrls: chainId === '0x7A69' ? ['http://localhost:8545'] : ['https://kovan.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
                                nativeCurrency: {
                                    name: chainId === '0x7A69' ? 'ETH' : 'Kovan ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                blockExplorerUrls: chainId === '0x7A69' ? ['http://localhost:8545'] : ['https://kovan.etherscan.io'],
                            },
                        ],
                    });
                } catch (addError) {
                    console.error('Failed to add network', addError);
                }
            } else {
                console.error('Failed to switch network', error);
            }
        }
    }

    return (
        <div className='exchange__header grid'>
            <div className='exchange__header--brand flex'>
                <img className="logo" src={logo} alt="Logo" />
                <h1>ChaChing Defi Banking Exchange</h1>
            </div>
            <div className='exchange__header--networks flex'>
                <img src={eth} alt="Ethereum Logo" />

                {chainId&&(
                <select name="networks" id="networks" value={chainId && config[chainId] ? `0x${chainId.toString(16)}` : `0`} onChange={networkHandler}>
                    <option value="0" disabled>Select Network</option>
                    <option value="0x7A69">Localhost</option>
                    <option value="0x2a">Kovan</option>
                </select>
                )}
            </div>
            <div className='exchange__header--account flex'>
                {balance ? (
                    <p><small>My balance:</small> {Number(balance).toFixed(4)} ETH</p>
                ) : (
                    <p>0 ETH</p>
                )}
                {account ? (
                    <a href={`https://etherscan.io/address/${account}`} target="_blank" rel="noopener noreferrer">
                        {account.slice(0, 6) + '...' + account.slice(-4)}
                        <Blockies
                            seed={account}
                            size={10}
                            scale={4}
                            className='identicon'
                        />
                    </a>
                ) : (
                    <button className='button' onClick={connectHandler}>Connect your wallet</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
