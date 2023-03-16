import types from '../actions/types'

let list = localStorage.getItem('wallets')

const iniatialState = {
    walletList: list ? JSON.parse(list) : [],
    usdBTCPrice: {},
    usdETHPrice: {},
    error: false
}

function reducer(state = iniatialState, action){
    switch(action.type){
        case types.SET_WALLET_LIST:
            return {
                ...state,
                walletList: action.payload
            }
        case types.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case types.SET_BTC_USD_PRICE:
            return {
                ...state,
                usdBTCPrice: action.payload
            }
        case types.SET_ETH_USD_PRICE:
            return {
                ...state,
                usdETHPrice: action.payload
            }
        default:
            return state
    }
}


export default reducer