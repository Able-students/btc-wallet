import axios from "axios";
import store from '../store';
import types from './types';

const addBtcAddress = (address) => {
    axios.get(`https://api.blockchain.info/haskoin-store/btc/address/${address}/balance`).then(res => {
        let balance = res.data.confirmed
        if (balance > 0) {
            balance = balance / Math.pow(10, 8)
        }
        const { usdPrice, walletList } = store.getState().walletReducer
        let usdBalance = balance * usdPrice.last
        let newList = [...walletList, { address, balance, usdBalance }]
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
    })
}

const loadBtcPrice = () => {
    axios.get(`https://blockchain.info/ticker`).then(res => {
        store.dispatch({
            type: types.SET_USD_PRICE,
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
    addBtcAddress,
    loadBtcPrice,
    setError,
    deleteItem
}

export default actions