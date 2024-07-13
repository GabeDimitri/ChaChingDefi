export const provider = (state = {}, action) => {
    switch (action.type) {
        case 'PROVIDER_LOADDED':
            return {
                ...state,
                connection: action.connection
            }
        case 'NETWORK_LOADDED':
            return {
                ...state,
                connection: action.chainId
            }
        case 'ACCOUNT_LOADDED':
            return {
                ...state,
                connection: action.account
            }
        case 'TOKEN_LOADDED':
            return {
                ...state,
                connection: action.token
            }
        default:
            return state
    }
}

export const tokens = (state = { loaded: false, contract: null }, action) => {
    switch (action.type) {

        case 'TOKEN_LOADDED':
            return {
                ...state,
                loaded:true,
                contract: action.token,
                symbol:action.symbol,
            }
        default:
            return state
    }
}