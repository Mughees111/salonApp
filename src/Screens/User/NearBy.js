import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, MsgIcon, PhoneIcon, MarkerCancel, ArrowRight, ArrowForward } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

import * as Location from 'expo-location';


var alertRef;
const NearBy = () => {


    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')


    const [isMapView, setIsMapView] = useState(0)
    const keyExtractor = ((item, index) => index.toString())
    const [nearByData, setNearByData] = useState([])


    // const SalonListingView = useCallback((item, index) => {
    //     var item = item?.item
    //     return (

    //     )
    // }, [])


    async function get_salons() {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        var locationn = await Location.getCurrentPositionAsync({});

        retrieveItem('login_data')
            .then(data => {
                if (data?.token) {
                    const postObj = {
                        lat: locationn?.coords?.latitude,
                        lng: locationn?.coords?.longitude,
                        token: data.token
                    }
                    console.log(postObj)

                    setLoading(true)
                    apiRequest(postObj, 'get_nearby_salons')
                        .then(data => {
                            setLoading(false)
                            if (data.action == 'success') {
                                setNearByData(data.data)
                                forceUpdate();
                            }
                            else {
                                alertRef.alertWithType('error', 'Error', data.error);
                            };
                        })
                        .catch(err => {
                            setLoading(false)
                        })
                };
            });
    }


    useFocusEffect(useCallback(() => {
        get_salons()
    }, [],
    ))


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                hidden={false}
                style='light'
                backgroundColor={acolors.bgColor}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 35 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Near By" />
                    <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 10 }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', }}>Map View</Text>
                        <Switch
                            trackColor={{ false: "white", true: 'grey' }}
                            thumbColor={isMapView ? acolors.primary : "grey"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                console.log(isMapView)
                                setIsMapView(isMapView == 1 ? 0 : 1)
                            }}
                            value={isMapView == 1 ? true : false}
                            style={{ margin: 0 }}
                        />
                    </View>

                    {
                        isMapView == '1' ?
                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}></Text>
                            :
                            <>
                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}>Here are your nearby saloons</Text>
                                <FlatList
                                    data={nearByData}
                                    contentContainerStyle={{ paddingBottom: 300 }}
                                    style={{ marginTop: 2, }}
                                    keyExtractor={keyExtractor}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => navigate('SalonDetails', item)}
                                            style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, paddingVertical: 15, paddingLeft: 15, paddingRight: 10, marginTop: 13 }}>
                                            <Image
                                                style={{ height: 85, width: "28%", resizeMode: 'stretch' }}
                                                source={{ uri: item?.sal_profile_pic }}
                                            />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item?.sal_name}</Text>
                                                <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item?.sal_address}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                                    <RattingStarIcon />
                                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{item?.distance?.toString() + " Km"}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 40 }}>
                                                <ArrowForward />
                                            </View>


                                        </TouchableOpacity>
                                    )}
                                />
                            </>
                    }
                </View>
            </SafeAreaView >
        </View >
    )
}

export default NearBy
