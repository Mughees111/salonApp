import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight } from '../../Components/Svgs';
import { StatusBar } from 'expo-status-bar';

const GetStarted = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                hidden={true}
            />
            <Image
                style={{ position: 'absolute', width: "100%", height: "100%", }}
                source={require('../../assets/onBoarding1img.png')}
            />
            <Image
                style={{ position: 'absolute', bottom: 0, width: "100%" }}
                source={require('../../assets/onBoarding1Mask.png')}
            />
            <View style={{ width: "90%", alignSelf: 'center', position: 'absolute', bottom: 150 }}>
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'white', fontSize: 21, fontFamily: 'ABRe' }}>Welcome to the future of your Saloon</Text>
                <Text style={{ alignSelf: 'center', color: 'rgba(255,255,255,0.6)', fontFamily: 'ABRe', textAlign: 'center', marginTop: 15 }}>GGet an overview of how you are performing & motivate yourself to achieve even moew.</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    }
})

export default GetStarted
