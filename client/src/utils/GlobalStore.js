import React, { createContext, useReducer, useContext } from "react";
// import { v4 as uuid } from 'uuid';
import { GET_ITEMS, LOADING } from './actions'

const CryptoContext = createContext({

});
const { Provider } = CryptoContext;

function reducer(state, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.items,
                loading: false
            };
        default:
            return state;
    }
}

function CryptoProvider({ value = [], ...props }) {
    const [state, dispatch] = useReducer(reducer, {
        items: [],
        loading: false
    });

    return <Provider value={{state, dispatch}} {...props} />;
}

function useCryptoContext() {
    return useContext(CryptoContext);
}

export { CryptoProvider, useCryptoContext };
