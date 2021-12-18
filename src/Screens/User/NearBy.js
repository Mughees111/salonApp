import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, MsgIcon, PhoneIcon, MarkerCancel, ArrowRight, ArrowForward } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const NearBy = () => {

    const [isMapView, setIsMapView] = useState(0)
    const keyExtractor = ((item, index) => index.toString())
    const data = [
        { img: require('../../assets/salonImg1.png'), title: "Hiana Saloon", address: "2400 US-30 Suite 106, Oswego, IL 60543, United States" },
        { img: require('../../assets/salonImg2.png'), title: "Forever Men Saloon", address: "2400 US-30 Suite 106, Oswego, IL 60543, United States" },
        { img: require('../../assets/salonImg1.png'), title: "Serena Men Saloon", address: "2400 US-30 Suite 106, Oswego, IL 60543, United States" },
        { img: require('../../assets/salonImg2.png'), title: "Forever Men Saloon", address: "817 Street maas Buleva..." },

        { img: require('../../assets/salonImg3.png'), title: "Forever Women Saloon", address: "2400 US-30 Suite 106, Oswego, IL 60543, United States" },
        { img: require('../../assets/salonImg4.png'), title: "Adward’s Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg3.png'), title: "Serena Women Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg4.png'), title: "Hiana Saloon", address: "817 Street maas Buleva..." },
    ]


    const SalonListingView = useCallback((item, index) => {
        var item = item.item
        return (
            <TouchableOpacity
                onPress={() => navigate('SalonDetails')}
                style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, paddingVertical: 15, paddingLeft: 15, paddingRight: 10, marginTop: 13 }}>
                <Image
                    style={{ height: 85, width: "28%", resizeMode: 'stretch' }}
                    source={item.img}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item.title}</Text>
                    <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item.address}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                        <RattingStarIcon />
                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                    </View>
                </View>
                <View style={{ marginTop: 40 }}>
                    <ArrowForward />
                </View>


            </TouchableOpacity>
        )
    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                hidden={false}
                style='light'
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
                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}>Depends on backend</Text>
                            :
                            <>
                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FFFFFF", marginTop: 20, }}>Here are your nearby saloons</Text>
                                <FlatList
                                    data={data}
                                    contentContainerStyle={{ paddingBottom: 300 }}
                                    style={{ marginTop: 2, }}
                                    keyExtractor={keyExtractor}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <SalonListingView item={item} index={index} />
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
