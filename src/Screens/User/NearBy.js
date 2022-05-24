import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, ImageBackground, Linking } from 'react-native'
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
import ReactNativeModal from 'react-native-modal';

import * as Permissions from 'expo-permissions';
import MapView, { Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "fiction-places-autocomplete";



var alertRef;
const NearBy = () => {


    const { state, setUserGlobal } = useContext(Context);
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const [loading, setLoading] = useState(false);

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')


    const [isMapView, setIsMapView] = useState(0)
    const keyExtractor = ((item, index) => index.toString())
    const [nearByData, setNearByData] = useState([])

    const production = true;
    const GOOGLE_MAPS = production ? "AIzaSyBSw0D88sjoodik8ALNNMhccUL-WQbpwJo" : "AIzaSyA1R8WBbKJnXN6Wbwc8Tq1rCIK_sT3_FO8";


    // const SalonListingView = useCallback((item, index) => {
    //     var item = item?.item
    //     return (

    //     )
    // }, [])

    var map = React.useRef(null);
    const forceUpdate = useForceUpdate();

    const [userSelectedLocation, setUserSelectedLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
        locationTitle: ''
    });

    const [salLocations, setSalLocations] = useState([]);



    async function get_salons() {

        setLoading(true)

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alertRef.alertWithType('warn', '', 'You cannot see nearby salons without sharing your location');
            return;
        }

        try {
            var locationn = await Location.getCurrentPositionAsync({});
        }
        catch {
            try {
                var locationn = await Location.getLastKnownPositionAsync({});
            }
            catch {
                alertRef.alertWithType('warn', '', 'Error while fetching your location');
                return;
            }
        }

        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;
        const latDelta = locationn?.coords?.accuracy * (1 / (Math.cos(locationn.coords?.latitude) * circumference));
        const lonDelta = (locationn?.coords?.accuracy / oneDegreeOfLongitudeInMeters);

        setUserSelectedLocation({
            ...userSelectedLocation,
            latitude: locationn.coords.latitude,
            longitude: locationn.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
            locationTitle: "address"
        })

        // let { status } = await Location.requestForegroundPermissionsAsync();
        // if (status !== 'granted') {
        //     alertRef.alertWithType('error', 'Error', 'You cannot see nearby salons without sharing your location');
        //     setLoading(false)
        //     return;
        // }
        // try {
        //     var locationn = await Location.getCurrentPositionAsync({});
        // }
        // catch {
        //     alertRef.alertWithType('error', 'Error', 'Please turn ON your location to see nearby salons')
        //     setLoading(false)
        //     return
        // }


        retrieveItem('login_data')
            .then(data => {
                if (data?.token) {
                    const postObj = {
                        lat: locationn?.coords?.latitude,
                        lng: locationn?.coords?.longitude,
                        token: data.token
                    }

                    apiRequest(postObj, 'get_nearby_salons')
                        .then(data => {
                            setLoading(false)
                            if (data.action == 'success') {
                                setNearByData(data.data)
                                let data1 = data.data;
                                let arr = [];
                                for (let key in data1) {
                                    arr.push({
                                        latitude: data1[key].sal_lat,
                                        longitude: data1[key].sal_lng,
                                        latitudeDelta: 0,
                                        longitudeDelta: 0,
                                    })
                                }
                                setSalLocations(arr);
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


    if (isMapView) return (

        <View style={[{ flex: 1, }]}>
            <View style={{
                marginTop: 30, borderTopLeftRadius: 10, borderTopRightRadius: 10,
            }}>
                <MapView
                    ref={ref => map = ref}

                    initialRegion={userSelectedLocation}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    // onRegionChangeComplete={region => setUserSelectedLocation(region)}
                    // onRegionChangeComplete={(v) => {
                    //   getLocationTitle(v)
                    // }}
                    region={userSelectedLocation}
                    provider={PROVIDER_GOOGLE}
                    style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                >
                    {
                        nearByData.map((v, i) => {

                            if (v.sal_lat && v.sal_lng) {
                                let lat = parseFloat(v.sal_lat)
                                let lng = parseFloat(v.sal_lng)
                                return (
                                    <Marker
                                        key={v.sal_id}
                                        title={v.sal_name}
                                        coordinate={{
                                            latitude: lat,
                                            //  parseInt(v.sal_lat),
                                            longitude: lng,
                                            // parseInt(v.sal_lng),
                                            latitudeDelta: 0.1,
                                            longitudeDelta: 0.1,
                                            // locationTitle: 'asd'
                                        }}
                                        pinColor={acolors.primary}
                                        description="custom"

                                    >
                                        <TouchableOpacity>
                                            <ImageBackground
                                                source={require('../../assets/map_marker.png')}
                                                resizeMode="stretch"
                                                style={{ flexDirection: 'row', height: 30, padding: 5, }}>

                                                <Image
                                                    style={{ width: 16, height: 16, borderRadius: 3 }}
                                                    source={{ uri: v?.sal_profile_pic }}
                                                />
                                                <Text style={{ color: '#121212', fontSize: 10, fontFamily: 'PRe', }}>{v.sal_name}</Text>

                                            </ImageBackground>
                                        </TouchableOpacity>
                                        <Callout
                                            onPress={() => {
                                                setIsMapView(false)
                                                navigate('SalonDetails', v)
                                            }}
                                        >
                                            <View
                                                onPress={() => {
                                                    setIsMapView(false)
                                                    forceUpdate();

                                                    navigate('SalonDetails', v)
                                                }}
                                                style={{ flexDirection: 'row', alignItems: 'center', height: 150, backgroundColor: '#1B1B1B', width: viewportWidth - 20, borderRadius: 8, paddingVertical: 15, paddingLeft: 15, paddingRight: 10, }}>
                                                <Text style={{ height: 170, marginTop: -80, }}>
                                                    <Image
                                                        style={{ flex: 1, height: 150, borderRadius: 10, width: 130, resizeMode: 'stretch', }}
                                                        source={{ uri: v?.sal_profile_pic }}
                                                    />
                                                </Text>
                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{v?.sal_name}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${v?.sal_address + ", " + v?.sal_city + ", " + v?.sal_country}`);
                                                        }} style={{ flexDirection: 'row' }}>
                                                        <Text numberOfLines={3} style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{v?.sal_address}</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {v?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                            <>
                                                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.sal_ratings}</Text>
                                                                <RattingStarIcon />
                                                            </>
                                                        }
                                                        {/* <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.sal_ratings}</Text>
                                                        <RattingStarIcon /> */}
                                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{v?.distance?.toString() + " mi"}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 40 }}>
                                                    <ArrowForward />
                                                </View>


                                            </View>

                                        </Callout>
                                        {/* <MyCustomMarkerView {...v} /> */}
                                    </Marker>
                                )
                            }
                            else return null
                        }

                        )
                    }

                </MapView>
                <View
                    style={{ height: 44, width: "32%", backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 10, right: 10, paddingHorizontal: 10, }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 12, color: 'white', }}>Map View</Text>
                    <Switch
                        trackColor={{ false: "white", true: 'black' }}
                        thumbColor={isMapView ? acolors.primary : "grey"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                            setIsMapView(isMapView == 1 ? 0 : 1)
                        }}
                        value={isMapView == 1 ? true : false}
                        style={{ margin: 0 }}
                    />
                </View>
            </View>



        </View >



    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                hidden={false}
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10,paddingHorizontal:10 }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 15,marginLeft:10, color: acolors.white }}>Near By Saloons</Text>


                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 11, color: '#FCFCFC', }}>Map View</Text>
                        <Switch
                            trackColor={{ false: "white", true: 'grey' }}
                            thumbColor={isMapView ? acolors.primary : "grey"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setIsMapView(isMapView == 1 ? 0 : 1)
                            }}
                            value={isMapView == 1 ? true : false}
                            style={{ margin: 0, }}


                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20 }}>



                    {/* // <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}></Text> */}

                    {/* <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}>Here are your nearby saloons</Text> */}
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
                                    <Text numberOfLines={1} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 0, }}>{item?.sal_city}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.sal_address + ", " + item?.sal_city + ", " + item?.sal_country}`);
                                        }} style={{ flexDirection: 'row' }}>
                                        <Text numberOfLines={3} style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item?.sal_address}</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                            <>
                                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                                <RattingStarIcon />
                                            </>
                                        }
                                        {/* <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                        <RattingStarIcon /> */}
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{item?.distance?.toString() + " mi"}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 40 }}>
                                    <ArrowForward />
                                </View>


                            </TouchableOpacity>
                        )}
                    />


                </View>
            </SafeAreaView >
        </View >
    )
}

export default NearBy
