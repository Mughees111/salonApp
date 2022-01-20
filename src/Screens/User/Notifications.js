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




const Notifications = () => {


    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', width: "100%", marginTop: 20, }}>
            <Image
                source={item.img}
                style={{ width: 55, height: 55, borderRadius: 22.5 }}
            />
            <View style={{ marginLeft: 10, }}>
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FCFCFC' }}>{item.title}</Text>
                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginTop: 3, }}>Adward’s Saloon</Text>
                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginTop: 3, }}>{item.time}</Text>
            </View>

        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Header title="Notification" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are all your notifications</Text>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
                        showsVerticalScrollIndicator={false}
                        style={{ marginLeft: -10 }}
                        data={[
                            { time: "04:30 PM", title: "Your appointment has been booked ", img: require('../../assets/not1.png') },
                            { time: "Reminder", title: "1h left in your appointment", img: require('../../assets/not2.png') },
                            { time: "11:55 PM", title: "You got a message", img: require('../../assets/not4.png') },
                            { time: "04:30 PM", title: "Your appointment has been booked ", img: require('../../assets/not1.png') },
                            { time: "Reminder", title: "1h left in your appointment", img: require('../../assets/not2.png') },
                            { time: "04:30 PM", title: "You got a message", img: require('../../assets/not4.png') },
                            { time: "04:30 PM", title: "Your appointment has been booked ", img: require('../../assets/not1.png') },
                            { time: "04:30 PM", title: "1h left in your appointment", img: require('../../assets/not2.png') },
                            { time: "04:30 PM", title: "Your appointment has been booked", img: require('../../assets/not4.png') },
                            { time: "04:30 PM", title: "1h left in your appointment", img: require('../../assets/not2.png') },
                        ]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </View>



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

export default Notifications
