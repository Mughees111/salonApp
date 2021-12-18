import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';




const Categories = () => {


    const renderItem = ({item})=>(
        <TouchableOpacity style={{backgroundColor:'#1A1919',marginLeft:"3%",marginTop:15, width:"30%",height:120,alignItems:'center',justifyContent:'center'}}>
            <View style={{width:"70%",height:70,alignItems:'center',justifyContent:'center', backgroundColor:"rgba(255, 255, 255, 0.05)"}}>
                <Image
                    source={item.img}
                />
            </View>
            <Text style={{fontFamily:'PRe',fontSize:14,color:'#FFFFFF',marginTop:10}}>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />
            <SafeAreaView style={{ flex: 1 ,marginTop:25}}>
                <View style={{ paddingHorizontal: 20, }}>
                    <Header title="Categories" />
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>Here are all the categories</Text>
                    <FlatList
                        numColumns={3}
                        contentContainerStyle={{paddingBottom:200}}
                        showsVerticalScrollIndicator={false}
                        style={{marginLeft:-10}}
                        data ={[
                            {title : "Haircut" ,img : require('../../assets/cat1.png') },
                            {title : "Skin Care" ,img : require('../../assets/cat2.png') },
                            {title : "Shampoo" ,img : require('../../assets/cat3.png') },
                            {title : "Haircut" ,img : require('../../assets/cat1.png') },
                            {title : "Skin Care" ,img : require('../../assets/cat2.png') },
                            {title : "Shampoo" ,img : require('../../assets/cat3.png') },
                            {title : "Haircut" ,img : require('../../assets/cat1.png') },
                            {title : "Skin Care" ,img : require('../../assets/cat2.png') },
                            {title : "Shampoo" ,img : require('../../assets/cat3.png') },
                            {title : "Skin Care" ,img : require('../../assets/cat2.png') },
                            {title : "Shampoo" ,img : require('../../assets/cat3.png') },
                            {title : "Haircut" ,img : require('../../assets/cat1.png') },
                            {title : "Skin Care" ,img : require('../../assets/cat2.png') },
                            {title : "Shampoo" ,img : require('../../assets/cat3.png') },
                        ]}
                        keyExtractor={(item,index)=>index.toString()}
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
