import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { TextInput } from 'react-native-gesture-handler';
import { changeLoggedIn, loggedInObservable } from '../../../Common';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ArrowLeft, NotificationIcon, PaymentMethodIcon, ProfileIcon, HeartSettingIcon, SettingsIcon, TermsIcon, LogoutIcon, ArrowForward } from '../../Components/Svgs';
import { Context } from '../../Context/DataContext';
import { apiRequest, } from '../../utils/apiCalls';
import { urls } from '../../utils/Api_urls';

import { doConsole, retrieveItem, storeItem, getParamFromURL } from "../../utils/functions";
import Loader from '../../utils/Loader';


var alertRef;

const UserScreen = () => {



    const [loading, setLoading] = useState(false)
    const { state } = useContext(Context);
    const userData = state.userData




    const SettingView = ({ text, onPress, icon, navigateTo }) => {
        var Icon = icon
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateTo && navigate(navigateTo)

                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }
                }>
                <View style={styles.iconCircle}>
                    {Icon ? <Icon /> : null}
                </View>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 5, }}>
                    <ArrowForward color="rgba(226, 179, 120, 0.05)" />
                </TouchableOpacity>
            </TouchableOpacity >
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <View style={{ width: "100%", height: 200, marginTop: 10 }}>

                <Image
                    style={{ width: "100%", resizeMode: 'contain', height: "100%", borderRadius: 15 }}
                    source={{ uri: userData.profile_pic_url }
                        // require('../../assets/profileImg.png')
                    }
                />
                <Image
                    style={{ position: 'absolute', width: "100%", bottom: 0, resizeMode: 'stretch' }}
                    source={require('../../assets/profileImgMask.png')}
                />
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ position: 'absolute', top: 30, left: 20, width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft />
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 10, left: 20 }}>
                    <Text style={{ fontFamily: 'PBl', fontSize: 22, lineHeight: 30, color: 'white', }}>{userData?.username}</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, lineHeight: 22, color: '#E9E9E9', }}>{userData?.phone}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.containers}>
                    {/* <SettingView
                        text="Payment Methods"
                        icon={PaymentMethodIcon}
                        onPress={() => console.log('presed')}
                        navigateTo="EditPaymentMethod"
                    /> */}
                    <SettingView
                        text="Profile"
                        icon={ProfileIcon}
                        navigateTo={"EditProfile"}
                    />
                </View>
                <View style={styles.containers}>
                    <SettingView
                        text="Notification Settings"
                        icon={NotificationIcon}
                        navigateTo={"NotificationSettings"}

                    />
                    <SettingView
                        text="Favorites"
                        icon={HeartSettingIcon}
                        navigateTo={'Favourites'}
                        onPress={() => console.log('presed')}
                    />
                    <SettingView
                        text="Settings"
                        icon={SettingsIcon}
                        navigateTo={"Settings"}
                    />
                    <SettingView
                        icon={TermsIcon}
                        navigateTo={"TermsOfServices"}
                        text="Terms of services"
                        onPress={() => console.log('presed')}
                    />
                </View>
                <View style={styles.containers}>
                    <TouchableOpacity
                        onPress={() => {
                            retrieveItem('login_data')
                                .then(data => {
                                    if (data.token) {
                                        setLoading(true)
                                        storeItem('login_data', '')
                                        state.userData = [];
                                        apiRequest({ token: data.token }, 'logout')
                                            .then(data => {
                                                // console.log(data)
                                                setLoading(false)
                                                if (data.action == 'success') {
                                                    changeLoggedIn.changeNow(2);
                                                }
                                            })
                                            .catch(err => {
                                                alertRef.alertWithType("error", urls.error_title, urls.error);
                                                setLoading(false)
                                            })
                                    }

                                })
                            // 

                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }
                        }>
                        <View style={styles.iconCircle}>
                            <LogoutIcon />
                        </View>
                        <Text style={styles.text}>Log Out</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 5, }}>
                            <ArrowForward color="rgba(226, 179, 120, 0.05)" />
                        </TouchableOpacity>
                    </TouchableOpacity >
                    {/* <SettingView
                        icon={LogoutIcon}
                        text="Log Out"
                        onPress={() => {
                            console.log('asd')
                           
                        }}
                    /> */}
                </View>
            </ScrollView>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    iconCircle: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34 / 2,
        backgroundColor: 'rgba(226, 179, 120, 0.05)'
    },
    text: {
        fontFamily: 'PRe',
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 10
    },
    containers: {
        marginTop: 20, width: "90%", alignSelf: 'center', backgroundColor: '#1B1B1B', paddingBottom: 15, paddingHorizontal: 10,
    }
})

export default UserScreen
