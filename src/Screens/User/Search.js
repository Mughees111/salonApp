import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;
const SearchScreen = (props) => {


    const keyExtractor = ((item, index) => index.toString());

    const [loading, setLoading] = useState(false);


    const [searchWord, setSearchWord] = useState(props.route.params);
    const [data, setData] = useState([])
    const { state, setUserGlobal } = useContext(Context);

    function searchSalon() {
        if (searchWord == '') {
            alertRef.alertWithType('error', 'Error', 'Please enter search word');
            return
        }
        const reqObj = {
            token: state.userData.token,
            search_keyword: searchWord
        }
        setLoading(true)
        console.log(reqObj)
        apiRequest(reqObj, 'get_salons')
            .then(data => {
                setLoading(false)
                if (data.action == 'success') {
                    setData(data.data)
                }
                else {
                    alert.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        // console.log(searchWord)
        searchSalon();
    }, [])

    const SalonListingView = useCallback((item, index) => {
        var item = item.item
        return (
            <TouchableOpacity
                onPress={() => navigate('SalonDetails', item)}
                style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, paddingVertical: 15, paddingLeft: 15, paddingRight: 10, marginTop: 13 }}>
                <Image
                    style={{ height: 85, width: "28%", resizeMode: 'stretch', borderRadius: 10 }}
                    source={{ uri: item?.sal_profile_pic }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item?.sal_name}</Text>
                    <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item?.sal_address}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                        <RattingStarIcon />
                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={true}
            />
            <SafeAreaView style={{ marginTop: 28 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <View style={{ width: "85%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingLeft: 10, alignItems: 'center', flexDirection: 'row' }}>

                            <TextInput
                                placeholder={searchWord}
                                value={searchWord}
                                placeholderTextColor="rgba(252, 252, 252, 1)"
                                returnKeyLabel='Search'
                                enablesReturnKeyAutomatically={true}
                                onChangeText={setSearchWord}
                                onSubmitEditing={() => {
                                    searchSalon();
                                    // navigate('SalonDetails')
                                    // navigate('SearchScreen')
                                }}
                                style={{ width: "82%", color: 'rgba(252, 252, 252, 1)', fontFamily: 'PRe' }}
                            />
                            <TouchableOpacity
                                onPress={() => searchSalon()}
                                style={{ width: "18%", height: "100%", marginLeft: 1, borderRadius: 8, backgroundColor: '#E2B378', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#FCFCFC", marginTop: 15, }}>“{searchWord}”</Text>
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
                </View>
            </SafeAreaView>
        </View>


    )
}

export default SearchScreen
