
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, RefreshControl, Alert, Linking } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

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

const Home = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal, setUserLocationGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [tabs, setTabs] = useState({ men: true, women: false })
    const [mensData, setMensData] = useState([]);
    const [womensData, setWomensData] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [topLiked, setTopLiked] = useState([]);
    const [recentSalons, setRecentSalons] = useState([]);

    const [notifCount, setNotifCount] = useState(0);

    const [searchWord, setSearchWord] = useState('');

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')

    const [firstHeading, setFirstHeading] = useState('Professionals near you');
    const [refreshing, setRefreshing] = React.useState(false);


    const [shortAddress, setShortAddress] = useState('Loading');
    const production = true;
    // "AIzaSyBmiOF9IRt8QsTVZCh5zQbzCDEuART1_NU"
    const MAPS_KEY = production ? "AIzaSyBSw0D88sjoodik8ALNNMhccUL-WQbpwJo" : "AIzaSyA1R8WBbKJnXN6Wbwc8Tq1rCIK_sT3_FO8";



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        get_salons()
        // wait(2000).then(() => setRefreshing(false));
    }, []);



    const handleNotificationClick = async ()=>{
        navigateToPost.subscribe((t)=>{
            console.log("honor received");
            console.log(t);
            if(t.where=="notif"){
                navigate("Notifications");
                navigateToPostNow.navigate({id:0,where:"nowhere"});
            }
            if(t.where=="chat"){
                navigateFromStack("UserChatNavigator", "ChatDetails",{user_id:0,convo_id:t?.id,picUrl:"",name:"Loading",username:"Loading..."})
                navigateToPostNow.navigate({id:0,where:"nowhere"})
            }
        })
    }



    async function get_salons() {

        setLoading(true)
        var lat;
        var lng;
        if (state?.userLocation?.coords?.latitude) {
            // console.log('yes i have user location in state');
            lat = state.userLocation?.coords?.latitude;
            lng = state.userLocation?.coords?.longitude;
        }
        else {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setFirstHeading('All Salons')
                alertRef.alertWithType('warn', '', 'You cannot see nearby salons without sharing your location');
            }
            else {
                setFirstHeading('Professionals near you')
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

        if (locationn) {
            lat = locationn?.coords?.latitude;
            lng = locationn?.coords?.longitude;
            setUserLocationGlobal(locationn)
        }


        if (shortAddress == 'Loading' || shortAddress == '') {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationn?.coords?.latitude},${locationn?.coords?.longitude}&key=${MAPS_KEY}`;
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

        apiRequest(postObj, 'get_salons')
            .then(data => {
                console.log(data)
                setLoading(false)
                setRefreshing(false);
                if (data.action == 'success') {
                    setMensData(data?.data?.mens);
                    setWomensData(data?.data?.womens);
                    setRecommended(data?.data?.recommended)
                    setTopLiked(data?.data?.top_liked)

                    forceUpdate();
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setRefreshing(false);
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
            // console.log(`short title: ${title}`)
            setShortAddress(title);
            forceUpdate();
            return title
        }
        else setShortAddress('');
        return r?.results[0]?.formatted_address ?? "Unknown"
    }


    async function askNotificationPermission() {


        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        // const { status: existingStatus } = await Permissions.getAsync(
        //     Permissions.NOTIFICATIONS
        // );
        let finalStatus = existingStatus;


        if (finalStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;

        }


        if (finalStatus == 'granted') {
            try {
                // let token = await Notifications.getExpoPushTokenAsync();
                const token = (await Notifications.getExpoPushTokenAsync({
                    experienceId: '@mughees1512/salonApp',
                })).data;

                store_location_on_server(token)

            } catch (error) {

            }
        }
    }


    async function store_location_on_server(localToken) {

        retrieveItem('login_data')
            .then(data => {
                const dbData = { token: data?.token, notif_key: localToken };
                fetch(urls.API + 'do_store_notifiation_key', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dbData),
                })
            })

    }



    // const handleNotificationClick = async () => {
    //     navigateToPost.subscribe((t) => {
    //         // console.log("honor received");
    //         // console.log(t);
    //         if (t.where == "profile") {
    //             props.navigation.navigate("SalonDetails", { sal_id: t.id })
    //             navigateToPostNow.navigate({ id: 0, where: "nowhere" })
    //         }

    //     })
    // }


    function makeRecentSalons(salon) {
        retrieveItem('recent_salons')
            .then(data => {
                if (data) {
                    let all = data;
                    for (let key in data) {
                        if (data[key].sal_id == salon.sal_id) {
                            return;
                        }
                    }
                    all.push(salon);
                    storeItem('recent_salons', all);
                }
                else {
                    let all = [];
                    all.push(salon)
                    storeItem('recent_salons', all);
                }
            })
    }

    function getRecentSalons() {
        retrieveItem('recent_salons').then(data => {
            if (data) {
                setRecentSalons(data)
            }
        })
    }

    function get_notifs_count() {
        retrieveItem('login_data').then(data => {
            if (data) {
                apiRequest({ token: data.token }, 'get_notifs_count')
                    .then(data => {
                        console.log(data)
                        if (data.action == 'success') {
                            setNotifCount(data?.notifs)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
        })
    }



    const keyExtractor = ((item, index) => index.toString())

    useFocusEffect(useCallback(() => {
        getRecentSalons();
        get_notifs_count();
    }, [state.userLocation],
    ))

    useEffect(() => {

        handleNotificationClick();
        retrieveItem('login_data')
            .then(data => {
                if (data) {
                    setUserGlobal(data)
                    forceUpdate();
                }
            })

        get_salons();


        // handleNotificationClick();
        askNotificationPermission()


    }, [])





    const MakeReview = ({ number }) => {
        // console.log(number)
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
                    makeRecentSalons(item)
                    navigate('SalonDetails', item)
                }}
                style={{ width: 180, marginLeft: 15, height: 199, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                <Image
                    style={{ position: 'absolute', width: 180, height: 200, borderRadius: 10, resizeMode: 'stretch' }}
                    source={{ uri: item.sal_profile_pic }}

                />
                <Image
                    style={{ position: 'absolute', bottom: 0, width: 180 }}
                    source={require('../../assets/salonShopMask.png')}
                />
                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.sal_address + ", " + item?.sal_city + ", " + item?.sal_country}`);
                    }} style={{ flexDirection: 'row' }}>
                    <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}
                    </Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_city}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                            <>
                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                <RattingStarIcon />
                            </>
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item.distance + " mi"} </Text>
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
            {loading && !refreshing && <Loader />}
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
                    <TouchableOpacity
                        onLongPress={() => {
                            alertRef.alertWithType("info", "Map API KEY", MAPS_KEY);
                        }}
                    >
                        <Text style={{ color: acolors.primary, fontFamily: 'PBl', fontSize: 22, }}>Hello {state?.userData?.username},</Text>
                    </TouchableOpacity>
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
                                {notifCount > 0 && <View style={{ position: 'absolute', top: -5, right: -5, width: 15, height: 15, borderRadius: 7.5, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 8, fontFamily: 'PBo', }}>{notifCount}</Text>
                                </View>
                                }


                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigate('UserChatNavigator')}
                                style={{ marginLeft: 10 }}>
                                <ChatIcon />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
                        <View style={{ width: "100%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
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
                        {/* <TouchableOpacity
                            onPress={() => navigate('Categories')}
                            style={{ paddingHorizontal: 10, height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}>
                            <FilterIcon />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </SafeAreaView>
            <View style={{ paddingHorizontal: 10 }}>
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 400 }} >



                    <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>{firstHeading}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ViewAll', {
                                    data: {
                                        data: tabs.men ? mensData : womensData,
                                        title: firstHeading
                                    }
                                })
                            }}
                        >
                            <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                        </TouchableOpacity>



                    </View>
                    <View style={styles.listingMargin}>
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
                            </>
                        }
                    </View>

                    {/* Recommended */}
                    <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Recommended</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('ViewAll', {
                                    data: {
                                        data: recommended,
                                        title: "Recommended"
                                    }
                                })
                            }}
                        >
                            <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listingMargin}>
                        <FlatList
                            data={recommended}
                            horizontal={true}
                            style={{ marginTop: 10, }}
                            keyExtractor={keyExtractor}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        makeRecentSalons(item)
                                        navigate('SalonDetails', item)
                                    }}
                                    style={{ width: 180, marginLeft: 15, height: 200, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                                    <Image
                                        style={{ position: 'absolute', width: 180, height: 200, borderRadius: 10, resizeMode: 'stretch' }}
                                        source={{ uri: item.sal_profile_pic }}

                                    />
                                    <Image
                                        style={{ position: 'absolute', bottom: 0, width: 180, height: 200 }}
                                        source={require('../../assets/salonShopMask.png')}
                                    />
                                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.sal_address + ", " + item?.sal_city + ", " + item?.sal_country}`);
                                        }}
                                        style={{ flexDirection: 'row' }
                                        }>
                                        <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_city}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                            {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                <>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', marginRight: 2 }}>{item?.sal_ratings}</Text>
                                                    <RattingStarIcon />
                                                </>
                                            }
                                        </View>
                                    </View>
                                </TouchableOpacity >
                            )}
                        />
                    </View>
                    <View style={styles.listingMargin}>
                        {
                            recentSalons?.length > 0 &&
                            <>
                                <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17,marginLeft:8 }}>Recently Viewed</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate('ViewAll', {
                                                data: {
                                                    data: recentSalons,
                                                    title: "Recent"
                                                }
                                            })
                                        }}
                                    >
                                        <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={recentSalons}
                                    horizontal={true}
                                    style={{ marginTop: 10, }}
                                    keyExtractor={keyExtractor}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                // makeRecentSalons(item)
                                                navigate('SalonDetails', item)
                                            }}
                                            style={{ width: 180, marginLeft: 15, height: 200, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10, }}>

                                            <Image
                                                style={{ position: 'absolute', width: 180, height: 200, resizeMode: 'stretch', borderRadius: 20 }}
                                                source={{ uri: item.sal_profile_pic }}

                                            />
                                            <Image
                                                style={{ position: 'absolute', bottom: 0, width: 180, height: 200, }}
                                                source={require('../../assets/salonShopMask.png')}
                                            />
                                            <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.sal_address + ", " + item?.sal_city + ", " + item?.sal_country}`);
                                                }} style={{ flexDirection: 'row' }}>
                                                <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_city}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                    {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                        <>
                                                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', marginRight: 2 }}>{item?.sal_ratings}</Text>
                                                            <RattingStarIcon />
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity >
                                    )}
                                />
                            </>
                        }
                    </View>

                    {/* Top Liked */}
                    {
                        topLiked?.length > 0 &&
                        <>
                            <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Top Liked</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate('ViewAll', {
                                            data: {
                                                data: topLiked,
                                                title: "Top Liked"
                                            }
                                        })
                                    }}
                                >
                                    <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listingMargin}>
                                <FlatList
                                    data={topLiked}
                                    horizontal={true}
                                    style={{ marginTop: 10, }}
                                    keyExtractor={keyExtractor}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                makeRecentSalons(item)
                                                navigate('SalonDetails', item)
                                            }}
                                            style={{ width: 180, marginLeft: 15, height: 200, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                                            <Image
                                                style={{ position: 'absolute', width: 180, height: 200, borderRadius: 10, resizeMode: 'stretch' }}
                                                source={{ uri: item.sal_profile_pic }}

                                            />
                                            <Image
                                                style={{ position: 'absolute', bottom: 0, width: 188, height: 200 }}
                                                source={require('../../assets/salonShopMask.png')}
                                            />
                                            <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${item?.sal_address + ", " + itam?.sal_city + ", " + itam?.sal_country}`);
                                                }} style={{ flexDirection: 'row' }}>
                                                <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={{ fontFamily: 'PRe', textDecorationLine: 'underline', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_city}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#FFFFFF', marginRight: 2 }}>{item?.fav_count}</Text>
                                                    <AntDesign size={13} name='heart' color={"red"} />
                                                </View>
                                            </View>
                                        </TouchableOpacity >
                                    )}
                                />
                            </View>
                        </>

                    }
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
    },
    listingMargin: {
        marginLeft: -15
    }
})

export default Home
