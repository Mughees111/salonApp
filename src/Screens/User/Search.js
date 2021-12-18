import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';


const SearchScreen = () => {

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
                onPress={()=>navigate('SalonDetails')}
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

            </TouchableOpacity>
        )
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />
            <SafeAreaView style={{marginTop:28}}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <View style={{ width: "85%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingLeft: 10, alignItems: 'center', flexDirection: 'row' }}>

                            <TextInput
                                placeholder='Hair Cut'
                                placeholderTextColor="rgba(252, 252, 252, 1)"
                                returnKeyLabel='Search'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => {
                                    // navigate('SalonDetails')
                                    // navigate('SearchScreen')
                                }}
                                style={{ width: "82%", color: 'rgba(252, 252, 252, 1)', fontFamily: 'PRe' }}
                            />
                            <TouchableOpacity style={{ width: "18%", height: "100%", marginLeft: 1, borderRadius: 8, backgroundColor: '#E2B378', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#FCFCFC", marginTop: 15, }}>“Search results”</Text>
                    <FlatList
                        data={data}
                        contentContainerStyle={{paddingBottom:300}}
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
