import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, CameraIcon, PencilIcon, PencilIcon2, CrosIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import { ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;




const Favourites = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    function getFavs() {
        const postObj = {
            token: state?.userData?.token
        }
        setLoading(true)
        apiRequest(postObj, 'get_favs')
            .then(data => {
                doConsole(data.data)
                doConsole(data)
                setLoading(false)
                if (data.action == 'success') {
                    setData(data.data)
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })

    }

    function doFav(id) {
        const postObj = {
            token: state?.userData?.token,
            sal_id: id
        }
        doConsole(postObj);
        // setLoading(true)
        apiRequest(postObj, 'do_fav_salon')
            .then(data => {
                doConsole(data)
                setLoading(false)
                getFavs();
                if (data.action == 'success') {
                    alertRef.alertWithType('success', 'Success', 'Removed')
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getFavs();
    }, [])

    const keyExtractor = ((item, index) => index.toString())




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                hidden={false}
                style='light'
                backgroundColor={acolors.bgColor}
            />

            <SafeAreaView style={{ marginTop: 35, width:"95%",alignSelf:'center'}}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Favorites" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are your favorite saloons</Text>
                </View>
                <FlatList
                    data={data}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    numColumns={2}
                    style={{ marginTop: 10, }}
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View
                            style={{ width: 160, marginLeft: 15, marginTop: 10, height: 188, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                            <Image
                                style={{ position: 'absolute', width: 160, height: 188,borderRadius:10 }}
                                source={{ uri: item.sal_pic }}

                            />

                            <Image
                                style={{ position: 'absolute', bottom: 0 }}
                                source={require('../../assets/salonShopMask.png')}
                            />
                            <TouchableOpacity
                                onPress={() => doFav(item.sal_id)}
                                style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary, position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: 8, borderTopRightRadius: 8 }}>
                                <CrosIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigate('SalonDetails',item)}
                            >
                                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.sal_name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.sal_address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                        <RattingStarIcon />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5 Km</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    },

})

export default Favourites
