
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, RefreshControl, Linking } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ArrowLeft, ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, storeItem } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

import * as Location from 'expo-location';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import { urls } from '../../utils/Api_urls';
import { navigateToPost, navigateToPostNow } from '../../../Common';

import { AntDesign } from '@expo/vector-icons'


var alertRef;
const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
}

const ViewAll = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal, setUserLocationGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const data = useState(props.route.params.data.data)
    const title = props.route.params.data.title

    console.log(props.route.params.data.data)










    const keyExtractor = ((v, index) => index.toString())









    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                backgroundColor={acolors.bgColor}
                style='light'
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <View style={{ width: "90%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >
                <TouchableOpacity
                    style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingRight: 2 }}
                    onPress={() => goBack()}
                >
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'PSBo', fontSize: 20.67, color: 'white' }}>Salons</Text>
                <Text>          </Text>
            </View >



            <View style={{ paddingHorizontal: 10 }}>

                <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>{title}</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 300 }} >


                    <>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: props?.route?.params?.data?.data?.lenght % 2 == 0 ? 'space-evenly' : null }}>
                            {
                                props?.route?.params?.data?.data?.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log(v)
                                                navigate('SalonDetails', v)
                                                // makeRecentSalons(v)
                                                // navigate('SalonDetails', v)
                                            }}
                                            style={{ width: 160, marginLeft: 10, marginTop: 10, height: 188, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                                            <Image
                                                style={{ position: 'absolute', width: 160, height: 188, borderRadius: 20, resizeMode: 'stretch' }}
                                                source={{ uri: v?.sal_profile_pic }}

                                            />
                                            <Image
                                                style={{ position: 'absolute', bottom: 0 }}
                                                source={require('../../assets/salonShopMask.png')}
                                            />
                                            <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{v?.sal_name}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${v?.sal_address + ", " + v?.sal_city + ", " + v?.sal_country}`);
                                                }} style={{ flexDirection: 'row' }}>
                                                <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ fontFamily: 'PRe',textDecorationLine:'underline', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{v?.sal_address}</Text>
                                            </TouchableOpacity>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                    {v?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                        <>
                                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.sal_ratings}</Text>
                                                            <RattingStarIcon />
                                                        </>
                                                    }
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{v?.distance && v?.distance + " mi"} </Text>
                                                </View>

                                            </View>




                                        </TouchableOpacity >

                                    )
                                })

                            }
                        </View>
                    </>







                </ScrollView>
            </View >


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "50%",
        height: 42,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: "50%",
        height: 42,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTabText: {
        fontFamily: 'PMe',
        fontSize: 16,
        color: '#111111'
    },
    inActiveTabText: {
        fontFamily: 'PRe',
        fontSize: 14,
        color: '#FFFFFF'
    }
})

export default ViewAll
