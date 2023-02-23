import types from '../actions/types'

let list = localStorage.getItem('wallets')

const iniatialState = {
    walletList: list ? JSON.parse(list) : [],
    usdPrice: {},
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
        case types.SET_USD_PRICE:
            return {
                ...state,
                usdPrice: action.payload
            }
        default:
            return state
    }
}


export default reducer