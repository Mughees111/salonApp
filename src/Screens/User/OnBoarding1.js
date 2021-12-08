import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight } from '../../Components/Svgs';
import { StatusBar } from 'expo-status-bar';

const OnBoarding1 = () => {
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
                <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'white', fontSize: 21, fontFamily: 'PBl' }}>Find near by Salons & book services</Text>
                <Text style={{ alignSelf: 'center', color: 'rgba(255,255,255,0.6)', fontFamily: 'PRe', textAlign: 'center', marginTop: 10 }}>Get an overview of how you are performing & motivate yourself to achieve even moew.</Text>
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', alignItems: 'center', bottom: 70, width: "90%", alignSelf: 'center' }}>
                <View style={styles.activeDot}></View>
                <View style={styles.inActiveDot}></View>
                <View style={styles.inActiveDot}></View>
                <TouchableOpacity
                    onPress={() => {
                        navigate('OnBoarding2')
                    }}
                    style={{ width: 62, height: 62, borderRadius: 31, position: 'absolute', right: 0, backgroundColor: '#E2B378', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight />
                </TouchableOpacity>
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

export default OnBoarding1
