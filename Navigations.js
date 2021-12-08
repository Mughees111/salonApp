import React from 'react'
// import { CommonActions } from '@react-navigation/native';




export const navigationRef = React.createRef();


export const navigate = (screen, params ) => {
    navigationRef.current && navigationRef.current.navigate(screen, {
        params
    })
}

export const navigateFromStack = (stack, screen, params) => {
    navigationRef.current && navigationRef.current.navigate(stack,
        {
            screen: screen,
            params: params
        }
    )
}

export const  goBack = () =>{
    navigationRef.current && navigationRef.current.goBack();

}