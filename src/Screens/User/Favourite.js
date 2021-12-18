import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
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



const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return React.useCallback(() => updateState({}), []);
}


const Favourites = () => {

    const forceUpdate = useForceUpdate();
    const keyExtractor = ((item, index) => index.toString())
    const mensArray = [
        { img: require('../../assets/salonImg1.png'), title: "Hiana Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Adward’s Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Forever Men Saloon", address: "817 Street maas Buleva..." },
        { img: require('../../assets/salonImg1.png'), title: "Serena Men Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg1.png'), title: "Hiana Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Adward’s Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg1.png'), title: "Serena Men Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Forever Men Saloon", address: "817 Street maas Buleva..." },
    ]

    const SalonGridView = useCallback((item, index) => {
        var item = item.item
        return (
            <View
                style={{ width: 160, marginLeft: 15, marginTop: 10, height: 188, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                <Image
                    style={{ position: 'absolute', width: 160, height: 188 }}
                    source={item.img}

                />

                <Image
                    style={{ position: 'absolute', bottom: 0 }}
                    source={require('../../assets/salonShopMask.png')}
                />
                <TouchableOpacity style={{ width: 34, height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary, position: 'absolute', top: 0, right: 0, borderBottomLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <CrosIcon />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('SalonDetails')}
                >
                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.address}</Text>
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
        )

    }, [])



    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar
                hidden={false}
                style='light'
            />

            <SafeAreaView style={{ marginTop: 35, alignSelf: 'center' }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Favorite" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are your favorite saloons</Text>
                </View>
                <FlatList
                    data={mensArray}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    numColumns={2}
                    style={{ marginTop: 10, }}
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <SalonGridView item={item} index={index} />
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
