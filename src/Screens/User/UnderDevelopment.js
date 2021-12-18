import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, MsgIcon, PhoneIcon, MarkerCancel } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const UnderDevelopment = () => {
    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Under Development" />
                </View>
            </SafeAreaView>
        </View>
    )
}

export default UnderDevelopment
