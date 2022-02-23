
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

import * as Location from 'expo-location';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import { urls } from '../../utils/Api_urls';


var alertRef;
const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
}

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

    const [shortAddress, setShortAddress] = useState('Loading');
    const production = false;
    const MAPS_KEY = production ? "AIzaSyBmiOF9IRt8QsTVZCh5zQbzCDEuART1_NU" : "AIzaSyA1R8WBbKJnXN6Wbwc8Tq1rCIK_sT3_FO8";

    async function get_salons() {

        if (mensData.length < 1 || womensData.length < 1) {
            console.log(mensData.length)
            setLoading(true)
        }

        var lat;
        var lng;
        if (state?.userLocation?.coords?.latitude) {
            console.log('yes i have user location in state');
            lat = state.userLocation?.coords?.latitude;
            lng = state.userLocation?.coords?.longitude;
        }
        else {
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

            try {
                var locationn = await Location.getCurrentPositionAsync({});
            }
            catch {
                try {
                    var locationn = await Location.getLastKnownPositionAsync({});
                }
                catch {
                    setFirstHeading('All Salons')
                    alertRef.alertWithType('warn', '', 'Error while fetching your location');
                }
            }
        }

        if (shortAddress == 'Loading' || shortAddress == '' && !state.userLocation?.coords?.latitude) {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    if (data.results) {
                        makeShortTitle(data.results[0].address_components);
                    }
                    else {
                        setShortAddress('');
                    }
                })
                .catch(err => {
                    setShortAddress('');
                })
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
                    // console.log('post Obj')
                    // console.log(postObj)
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

    function makeShortTitle(address_components) {
        var title = ""
        var found = false
        address_components?.forEach((e) => {
            if (e["types"]?.includes("locality")) {
                found = true
                title = e["long_name"]
            }

            if (e["types"]?.includes("country")) {
                title = title + ', ' + e["long_name"]
            }
        })

        if (found) {
            console.log(`short title: ${title}`)
            setShortAddress(title);
            forceUpdate();
            return title
        }
        else setShortAddress('');
        console.log(`couldn't make short title`)
        return r?.results[0]?.formatted_address ?? "Unknown"
    }


    async function askNotificationPermission() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;


        if (finalStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus == 'granted') {
            try {
                let token = await Notifications.getExpoPushTokenAsync();
                // setNotif_token(token.data)
                store_location_on_server(token.data)
            } catch (error) {
                // alert(error);
            }
        }
    }


    async function store_location_on_server(localToken) {
        const dbData = { token: state.userData?.token ?? "", notif_key: localToken };
        console.log(dbData);
        console.log("push token")
        fetch(urls.API + 'do_store_notifiation_key', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dbData),
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
    }, [state.userLocation],
    ))
    useEffect(() => {
        askNotificationPermission()
    }, [])

    const MakeReview = ({ number }) => {
        console.log(number)
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                // <View>
                <RattingStarIcon width={9} height={8} color={i > number ? "grey" : null} />
                // </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }


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
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>

                        <RattingStarIcon />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item.distance != '0.00' && item.distance + " mi"} </Text>
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

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                            {shortAddress ?
                                <LocationIcon />
                                : null
                            }
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white, marginLeft: 5 }}>{shortAddress}</Text>
                        </View>
                        <View style={{ marginTop: -15, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigate('Notifications')}
                            >
                                <NotificationIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigate('UserChatNavigator')}
                                style={{ marginLeft: 10 }}>
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
