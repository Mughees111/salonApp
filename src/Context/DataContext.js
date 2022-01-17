import createDataContext from "./createDataContext";
// import React from 'react'









const dataReducer = (state, action) => {
    switch (action.type) {
        case 'setUserData':
            return { ...state, userData: action.payload }
        case 'setUserLocation':
            return { ...state, userLocation: action.payload }
        default: return state
    }

}


const setUserGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserData', payload: data })
    }
}

const setUserLocationGlobal = dispatch => {
    return (data) => {
        dispatch({ type: 'setUserLocation', payload: data })
    }
}


export const { Provider, Context } = createDataContext(
    dataReducer,
    {
        setUserGlobal,
        setUserLocationGlobal
    },
    {
        userData: [],
        userLocation: {},
    }
)