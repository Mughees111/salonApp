import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, RefreshControl } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, storeItem } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';



var alertRef;

const Categories = () => {


    const [catData, setCatData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCategories()
        // wait(2000).then(() => setRefreshing(false));
    }, []);



    function getCategories() {
        setLoading(true);
        retrieveItem('login_data').then(data => {
            if (data) {
                apiRequest({ token: data.token }, 'get_categories')
                    .then(data => {
                        console.log(data.data)
                        setLoading(false);
                        setRefreshing(false);
                        if (data.action == 'success') {
                            setCatData(data.data)
                        }
                        else alertRef.alertWithType('error', 'Error', data.error);


                    })
                    .catch(err => {
                        setLoading(false);
                        setRefreshing(false);
                    })

            }
        })
    }

    function getSalonsByCat(cat_id) {
        setLoading(true);
        retrieveItem('login_data').then(data => {
            if (data) {
                const reqObj = {
                    token: data.token, cat_id
                }
                console.log(reqObj)
                apiRequest(reqObj, 'get_salons_by_category')
                    .then(data => {
                        setLoading(false);
                        setRefreshing(false);
                        if (data.action == 'success') {
                            navigate('ViewAll', {
                                data: {
                                    data: data.data,
                                    title: "Salons by category"
                                }
                            })
                        }
                        else alertRef.alertWithType('error', 'Error', data.error);
                    })
                    .catch(err => {
                        setLoading(false);
                        setRefreshing(false);
                    })

            }
        })
    }



    useEffect(() => {
        getCategories();
    }, [])


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                getSalonsByCat(item.id);
            }}
            style={{ backgroundColor: '#1A1919', marginLeft: "3%", marginTop: 15, width: "30%", height: 120, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: "70%", height: 70, alignItems: 'center', justifyContent: 'center', }}>
                <Image
                    style={{ width: "80%", height: 70, borderRadius: 10 }}
                    source={{ uri: item.image }}
                />
            </View>
            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', marginTop: 10 }}>{item.title}</Text>
            <Text style={{ fontFamily: 'PRe', fontSize: 9, color: '#FFFFFF', marginTop: 0 }}>{item.total_salons} salons</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && !refreshing && <Loader />}

            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Header title="Categories" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are all the categories</Text>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        numColumns={3}
                        contentContainerStyle={{ paddingBottom: 200 }}
                        showsVerticalScrollIndicator={false}
                        style={{ marginLeft: -10 }}
                        data={catData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </View>



            </SafeAreaView>

        </View >
    )
}

const styles = StyleSheet.create({
    radioBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',

    }
})

export default Categories
