import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {  CommonActions } from '@react-navigation/native';



const AppointBooked = (props) => {

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('blur', () => {
            props.navigation.dispatch(state => {
                const routes = state.routes.filter(r => r.name !== 'AppointBooked');
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: 0,
                });
            });
        })
        return () => {
            unsubscribe;
        }
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Image
                        style={{ width: "50%", alignSelf: 'center', resizeMode: 'contain', marginTop: -50 }}
                        source={require('../../assets/done.gif')}
                    />
                    <Text style={{ color: acolors.primary, fontFamily: 'PMe', fontSize: 17, marginTop: -150, alignSelf: 'center' }}>Your Appointment has been booked</Text>
                    <Text style={{ fontFamily: "PRe", fontSize: 14, color: '#FFFFFF', marginTop: 10, alignSelf: 'center' }}>{props.route.params}</Text>
                </View>
                <MainButton
                    btnStyle={{ position: 'absolute', bottom: 50, width: "90%", alignSelf: 'center' }}
                    onPress={() => navigate('Home')}
                    text={"Done"}
                />


            </SafeAreaView>

        </View >
    )
}

const styles = StyleSheet.create({
    radioBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',

    }
})

export default AppointBooked
