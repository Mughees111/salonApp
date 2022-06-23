import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';

import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, MsgIcon, PhoneIcon, MarkerCancel } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;

const CancellationPolicy = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');


    function get_cancellation_policy() {
        setData(props.route.params?.data);
        // const postObj = { token: state?.userData?.token }
        // doConsole(postObj);
        // setLoading(true)
        // apiRequest(postObj, 'get_cancellation_policy')
        //     .then(data => {
        //         doConsole(data)
        //         setLoading(false);
        //         if (data.action == 'success') {
        //             setData(data.data);
        //         }
        //         else {
        //             alertRef.alertWithType('error', 'Error', data.error);
        //         };
        //     })
        //     .catch(err => {
        //         setLoading(false)
        //     })

    }

    useEffect(() => {
        get_cancellation_policy();
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
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Cancellation policy" />
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                        <Text style={{ marginTop: 20, fontFamily: 'PRe', fontSize: 13, color: 'white', lineHeight: 21.5 }}>{data}</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CancellationPolicy
