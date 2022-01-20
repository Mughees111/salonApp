
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

import * as Location from 'expo-location';

var alertRef;
const Home = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal, setUserLocationGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [tabs, setTabs] = useState({ men: true, women: false })
    const [mensData, setMensData] = useState([]);
    const [womensData, setWomensData] = useState([]);
    const [recommended, setRecommended] = useState([]);

    const [searchWord, setSearchWord] = useState('');

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const [firstHeading, setFirstHeading] = useState('Nearest To You');


    async function get_salons() {

        setLoading(true)

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setFirstHeading('All Salons')
            // Alert.alert('Permission to access location was denied');
            alertRef.alertWithType('warn', '', 'You cannot see nearby salons without sharing your location');
            // return;
        }
        else {
            setFirstHeading('Nearest To You')
        }
        var lat;
        var lng;
        if (state?.userLocation?.coords?.latitude) {
            console.log('yes i have user location in state');
            lat = state.userLocation?.coords?.latitude
            lng = state.userLocation?.coords?.longitude;
        }
        else {
            try {
                var locationn = await Location.getCurrentPositionAsync({});
            }
            catch { }
        }

        if (locationn) {
            lat = locationn?.coords?.latitude;
            lng = locationn?.coords?.longitude;
            setUserLocationGlobal(locationn)
        }
        
        retrieveItem('login_data')
            .then(data => {
                if (data?.token) {
                    setUserGlobal(data)
                    const postObj = {
                        lat,
                        lng,
                        token: data.token
                    }
                    ApiRequestForSalon(postObj);
                };
            });

    }

    function ApiRequestForSalon(postObj) {
        // console.log('postObj in apiRe')
        // console.log(postObj)
        apiRequest(postObj, 'get_salons')
            .then(data => {
                setLoading(false)
                if (data.action == 'success') {
                    setMensData(data.data.mens);
                    setWomensData(data.data.womens);
                    setRecommended(data.data.setRecommended)
                    forceUpdate();
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const keyExtractor = ((item, index) => index.toString())

    useFocusEffect(useCallback(() => {
        retrieveItem('login_data')
            .then(data => {
                if (data) {
                    setUserGlobal(data)
                    forceUpdate();
                }
            })
        get_salons()
    }, [],
    ))
    // useEffect(() => {
    //     get_salons()
    // }, [])


    const SalonGridView = useCallback((item, index) => {
        var item = item.item
        return (
            <TouchableOpacity
                onPress={() => {
                    // console.log(item)
                    navigate('SalonDetails', item)
                }}
                style={{ width: 160, marginLeft: 15, height: 188, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                <Image
                    style={{ position: 'absolute', width: 160, height: 188, borderRadius: 10, resizeMode: 'stretch' }}
                    source={{ uri: item.sal_profile_pic }}

                />
                <Image
                    style={{ position: 'absolute', bottom: 0 }}
                    source={require('../../assets/salonShopMask.png')}
                />
                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item.sal_reviews}</Text>
                        <RattingStarIcon />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item.distance != '0.00' && item.distance + " Km"} </Text>
                    </View>

                </View>




            </TouchableOpacity >
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                backgroundColor={acolors.bgColor}
                style='light'
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <Image
                source={require('../../assets/HomeImg1.png')}
                style={{ width: "100%", resizeMode: 'stretch', }}
            />
            {/*  position: 'absolute', top: 0  */}
            <Image
                source={require('../../assets/HomeMask1.png')}
                style={{ width: "100%", resizeMode: 'stretch', position: 'absolute', top: 0 }}
            />
            <SafeAreaView style={{ position: 'absolute', top: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ color: acolors.primary, fontFamily: 'PBl', fontSize: 22, }}>Hello {state?.userData?.username},</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                            <LocationIcon />
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white, marginLeft: 5 }}>Alaska, US</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -15, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigate('Notifications')}
                            >
                                <NotificationIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <ChatIcon />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
                        <View style={{ width: "83%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <SearchIcon />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Find a salon, services...'
                                placeholderTextColor="rgba(252, 252, 252, 1)"
                                returnKeyLabel='Search'
                                enablesReturnKeyAutomatically={true}
                                onChangeText={setSearchWord}
                                onSubmitEditing={(v) => {
                                    // searchSalon()
                                    // console.log(searchWord)
                                    if (searchWord) {
                                        navigate('SearchScreen', searchWord)
                                    }

                                }}
                                style={{ marginLeft: 10, color: 'rgba(252, 252, 252, 1)', fontFamily: 'PRe', flex: 1 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigate('Categories')}
                            style={{ paddingHorizontal: 10, height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}>
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: "60%", alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs({
                                men: true,
                                women: false
                            })
                        }}
                        style={[tabs.men ? styles.activeTab : styles.inActiveTab, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} >
                        <Text style={tabs.men ? styles.activeTabText : styles.inActiveTabText}>Men</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs({
                                men: false,
                                women: true
                            })
                        }}
                        style={[tabs.women ? styles.activeTab : styles.inActiveTab, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} >
                        <Text style={tabs.women ? styles.activeTabText : styles.inActiveTabText}>Women</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 400 }} >
                    <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>{firstHeading}</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        tabs.men &&
                        <>
                            <FlatList
                                data={mensData}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                            <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Recommended</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={recommended}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                        </>
                    }
                    {
                        tabs.women &&
                        <>
                            <FlatList
                                data={womensData}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                            <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Recommended</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={recommended}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                        </>
                    }
                </ScrollView>
            </View>


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

export default Home
