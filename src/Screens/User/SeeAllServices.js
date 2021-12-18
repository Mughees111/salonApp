import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';



const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}


const SeeAllServices = () => {

    const forceUpdate = useForceUpdate()
    const keyExtractor = ((item, index) => index.toString())
    const [data, setData] = useState([
        { price: 50, add: true, title: "Peaceful Massage" },
        { price: 40, add: true, title: "Men Skin Polish" },
        { price: 30, add: true, title: "Oil Treatment" },
        { price: 60, add: true, title: "Peaceful Massage" },
        { price: 100, add: true, title: "Men Skin Polish" },
        { price: 150, add: true, title: "Oil Treatment" },
        { price: 50, add: true, title: "Peaceful Massage" },
        { price: 90, add: true, title: "Men Skin Polish" },
        { price: 80, add: true, title: "Oil Treatment" },
        { price: 70, add: true, title: "Peaceful Massage" },
        { price: 200, add: true, title: "Men Skin Polish" },
        { price: 250, add: true, title: "Oil Treatment" },
    ])

    const [total, setTotal] = useState(0);

    const ServicesView = (item) => {

        var index = item.index
        var item = item.item;


        return (
            <View style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ width: "50%" }}>
                    <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'PMe' }}>{item.title}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'PRe' }}>25 - 30 mins</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>${item.price}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            let arr = data;
                            arr[index].add = !arr[index].add;
                            setData(arr)
                            if (item.add == true) setTotal(total - item.price)
                            else setTotal(total + item.price)
                            forceUpdate();
                        }}
                        style={{ height: 29, paddingHorizontal: 10, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderRadius: 4 }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#111111' }}>{item.add ? "Add" : "Cancel"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />
            <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height,marginTop:28 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => goBack()}
                            style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowLeft />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Service List</Text>
                        <Text>          </Text>
                    </View>
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: "#FCFCFC", marginTop: 20, }}>All the services</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        contentContainerStyle={{paddingBottom:250}}
                        data={data}
                        style={{ height: "100%" }}
                        renderItem={(item) => (
                            <ServicesView item={item.item} index={item.index} />
                        )}
                    />
                </View>
                <View style={{ alignSelf: 'center', width: "100%",marginTop:10,paddingHorizontal:20,position:'absolute',bottom:0,backgroundColor:acolors.bgColor,paddingBottom:20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: "100%" }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>Total Payable</Text>
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>{total}</Text>
                    </View>
                    <MainButton
                        text={"Continue"}
                        btnStyle={{marginTop:25}}
                        onPress={()=>navigate('BookAppointment')}
                    />
                </View>
                

            </SafeAreaView>
        </View>


    )
}

export default SeeAllServices
