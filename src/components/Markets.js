import config from '../config.json'
import { useDispatch, useSelector } from 'react-redux';
import { loadTokens } from '../store/interactions';
const Markets = () => {
    const chainId = useSelector(state => state.provider.chainId);
    const provider = useSelector(state => state.provider.connection);
    const dispatch = useDispatch();

    const marketHandler = async (e) => {
        loadTokens(provider,(e.target.value).split(","),dispatch)
    }
    return (
        <div className='component exchange__markets'>
            <div className='component__header'>
              <h2>Select Market</h2>  
              
                {chainId ?(
                    <select name="markets" id="markets" onChange={marketHandler}>
                    <option value = {`${config[chainId].TGC.address},${config[chainId].mETH.address}`}>TGC / mETH</option>
                    <option value = {`${config[chainId].TGC.address},${config[chainId].mDAI.address}`}>TGC / mDAI</option>
                </select>
                ):(
                    <div>
                        <p> Not deployed to network</p>
                        </div>
                )}
                    
            </div>
            <hr />
        </div>
    )
}

export default Markets;
