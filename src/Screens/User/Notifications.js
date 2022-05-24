import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;



const Notifications = () => {



    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);



    function get_notifs() {
        setLoading(true)
        retrieveItem('login_data')
            .then(data => {
                const reqObj = { token: data.token }
                console.log(reqObj)
                apiRequest(reqObj, 'get_notifs')
                    .then(data1 => {
                        console.log('data = ')
                        console.log(data)
                        setLoading(false)
                        if (data1?.action == 'success') {
                            setData(data1.data)
                            forceUpdate();
                        }
                        else {
                            alertRef.alertWithType("error", "Error", data.error);
                        }

                    })
                    .catch(err => {
                        setLoading(false)
                    })
            })
    }

    useEffect(() => {
        get_notifs();
    }, [])








    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Header title="Notification" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Notifications</Text>
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 200 }}
                        showsVerticalScrollIndicator={false}
                        style={{ marginLeft: -10 }}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                activeOpacity={item.screen ? 0 : 1}
                                style={{ width: "100%", paddingVertical: 12, paddingHorizontal: 15, marginTop: 12, backgroundColor: 'black', borderRadius: 10 }}
                                onPress={() => {
                                    const date = item.date_time.split(' ');
                                    item.screen && navigateFromStack('AppintmentsStack')
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 14.62, color: acolors.primary }}>{item?.title}</Text>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 7, color: 'white', marginLeft: 10 }}>{item?.ago}</Text>
                                </View>
                                <Text style={{ fontFamily: 'PRe', fontSize: 10.96, color: 'white', lineHeight: 14, marginTop: 3 }}>{item?.description}</Text>
                            </TouchableOpacity>
                        )}
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
