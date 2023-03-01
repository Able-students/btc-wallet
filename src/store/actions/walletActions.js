import axios from "axios";
import store from '../store';
import types from './types';

const addAddress = async(address,net) => {
    try{
        let balance = null
        if(net === 'eth'){
           balance = await getBalanceFromRpc(address)
        }else{
            let url = `https://api.blockchain.info/haskoin-store/btc/address/${address}/balance`
            let res = await axios.get(url)
            balance = res.data.confirmed
            if (balance > 0) {
                balance = balance / Math.pow(10, 8)
            }
        }
        const { usdBTCPrice, usdETHPrice, walletList } = store.getState().walletReducer
        let usdBalance = balance * usdBTCPrice.last
        if(net === 'eth'){
            usdBalance = balance * usdETHPrice
        }
        let newList = [...walletList, { address, balance, usdBalance, net }]
        let addressExist = walletList.find(wallet => wallet.address === address)
        if (addressExist) {
            setError('Address already exist!')
        } else {
            localStorage.setItem('wallets', JSON.stringify(newList))
            store.dispatch({
                type: types.SET_WALLET_LIST,
                payload: newList
            })
        }
    }catch{
        setError('Choose right network!')
    }
}

const getBalanceFromRpc = async(address) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    var raw = JSON.stringify({
      "method": "eth_getBalance",
      "params": [
        address,
        "latest"
      ],
      "id": 1,
      "jsonrpc": "2.0"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    let response = await fetch("https://eth.llamarpc.com", requestOptions)
    let data = await response.json()
    return parseInt(data.result,16) / Math.pow(10,18)
}

const loadUSDPrice = () => {
    axios.get(`https://blockchain.info/ticker`).then(res => {
        store.dispatch({
            type: types.SET_BTC_USD_PRICE,
            payload: res.data.USD
        })
    })
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR`).then(res => {
        store.dispatch({
            type: types.SET_ETH_USD_PRICE,
            payload: res.data.USD
        })
    })
}

const setError = (error) => {
    store.dispatch({
        type: types.SET_ERROR,
        payload: error
    })
}

const deleteItem = (id) => {
    const { walletList } = store.getState().walletReducer;
    let list = walletList.filter(el => el.address !== id);
    localStorage.setItem('wallets', JSON.stringify(list))
    store.dispatch({
        type: types.SET_WALLET_LIST,
        payload: list
    })
}

const actions = {
    addAddress,
    loadUSDPrice,
    setError,
    deleteItem
}

export default actions