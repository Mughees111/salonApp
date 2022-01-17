import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;





const SeeAllServices = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const params = props.route.params
    const [sal_services, setSalServices] = useState(props.route.params.sal_services);
    const [sal_id, setSal_id] = useState(props.route.params.sal_id);
    const [total, setTotal] = useState(0);


    // const [bookedServices, setBookedServices] =useState([]);

    const keyExtractor = ((item, index) => index.toString())

    function goToBookAppoint() {

        let arr = sal_services.filter(item => item.isAdded == true);
        navigate('BookAppointment', {
            data: params,
            bookedServices: arr,
            date: props?.route?.params?.app_date ? props?.route?.params?.app_date : null
        });
    }

    useEffect(() => {
        let arr = sal_services
        var total = 0;
        for (let key in arr) {
            if (!arr[key].isAdded) {
                arr[key].isAdded = false
            }
            else total = total + parseInt(arr[key].s_price);
        }
        setSalServices(arr);
        setTotal(total);
        forceUpdate();
    }, [props.navigation])





    const ServicesView = (item) => {

        var index = item.index
        var item = item.item;


        return (
            <View style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ width: "50%" }}>
                    <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'PMe' }}>{item.s_name}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'PRe' }}>{item.s_time_mins} mins</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>${item.s_price}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            // Alert.alert('Under development')
                            let arr = sal_services;
                            arr[index].isAdded = !arr[index].isAdded;
                            setSalServices(arr)
                            // setData(arr)

                            if (item.isAdded == true) setTotal(total + parseInt(item.s_price))
                            else setTotal(total - parseInt(item.s_price))
                            forceUpdate();
                        }}
                        style={{ height: 29, paddingHorizontal: 10, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderRadius: 4 }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#111111' }}>{item?.isAdded ? "Cancel" : "Add"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={true}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


            <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height, marginTop: 28 }}>
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
                        contentContainerStyle={{ paddingBottom: 250 }}
                        data={sal_services}
                        style={{ height: "100%" }}
                        renderItem={(item) => (
                            <ServicesView item={item.item} index={item.index} />
                        )}
                    />
                </View>
                <View style={{ alignSelf: 'center', width: "100%", marginTop: 10, paddingHorizontal: 20, position: 'absolute', bottom: 0, backgroundColor: acolors.bgColor, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: "100%" }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>Total Payable</Text>
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>{total}</Text>
                    </View>
                    <MainButton
                        text={"Continue"}
                        btnStyle={{ marginTop: 25 }}
                        onPress={() => {
                            if (total == 0) {
                                alertRef.alertWithType('error', 'Error', "Please select atleast one service")
                                return
                            }
                            goToBookAppoint()





                        }}
                    />
                </View>


            </SafeAreaView>
        </View>


    )
}

export default SeeAllServices
