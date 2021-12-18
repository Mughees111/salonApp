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


const TermsOfServices = () => {
    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Terms of Services" />
                    <Text style={{marginTop:20,fontFamily:'PRe',fontSize:13,color:'white',lineHeight:21.5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ultricies montes, laoreet mauris nunc, est nibh. Dui ultricies fermentum, iaculis netus sed. Tincidunt morbi nisl morbi amet faucibus ultricies volutpat nisl. Neque consequat posuere ipsum condimentum egestas in adipiscing hendrerit. Felis, lobortis in vitae purus sit duis volutpat quam. Congue maecenas parturient nec magna blandit consequat. Dui sollicitudin sem cras vulputate volutpat arcu ornare. Dui amet velit laoreet donec vel elementum augue.{"\n"}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa ultricies montes, laoreet mauris nunc, est nibh. Dui ultricies fermentum, iaculis netus sed. Tincidunt morbi nisl morbi amet faucibus ultricies volutpat nisl. Neque consequat posuere ipsum condimentum egestas in adipiscing hendrerit. Felis, lobortis in vitae purus sit duis volutpat quam. Congue maecenas parturient nec magna blandit consequat. Dui sollicitudin sem cras vulputate volutpat arcu ornare. Dui amet velit laoreet donec vel elementum augue.</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default TermsOfServices
