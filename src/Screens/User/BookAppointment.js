import React, { useCallback, useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, formatDate } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';
import CustomTextInput from '../../Components/CustomTextInput';





var alertRef;



const BookAppointment = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const [gender, setGender] = useState(props?.route?.params?.data?.user_gender ? props?.route?.params?.data?.user_gender : '')
    const params = props.route.params.data;
    const currentDateObj = new Date();
    const [currentDate, setCurrentDate] = useState()
    const [selectedDate, setSelectedDate] = useState('')
    const bookedServices = props.route.params.bookedServices;
    const [salSlots, setSalSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [comeToLocation, setComeToLocation] = useState('1');
    const [locationAddress, setLocationAddress] = useState('');


    const [arr, setArr] = useState([]);

    const onClick = (t) => {

        const servicesTime = getServicesTime();
        const noOfSlots = Math.ceil(servicesTime / 30);
        var arr = [];

        var foundIndex = salSlots.indexOf(t);
        // arr
        // for (let i = 0; i < noOfSlots; i++) {
        //     arr[i] = salSlots[foundIndex + i]
        // }
        arr[0] = salSlots[foundIndex]
        setArr(arr);
        forceUpdate();
        // if (arr.includes(t)) {
        //     var foundIndex = arr.indexOf(t);
        //     var all = arr;
        //     all.splice(foundIndex, 1);
        //     setArr(all)
        // }
        // else {
        //     var all = arr;
        //     all.push(t);
        //     setArr(all)
        // }

    }


    function getServicesTime() {
        var service_time = 0;
        for (let key in bookedServices) {
            service_time += parseInt(bookedServices[key].s_time_mins);
        }
        return service_time
    }

    function getServicesTotal() {
        var servicesName = '';
        var servicesPrice = 0;
        var servicesTime = 0;
        for (let key in bookedServices) {
            servicesName += bookedServices[key].s_name + ",";
            servicesPrice += parseInt(bookedServices[key].s_price)
            servicesTime += parseInt(bookedServices[key].s_time_mins);
        }

        return {
            servicesName: servicesName.substring(0, servicesName.length - 1),
            servicesPrice: servicesPrice,
            servicesTime: servicesTime
        }
    }


    function get_salon_slots(date) {

        // var device_datetime_sql = currentDateObj.getTime();
        var device_datetime_sql = formatDate(new Date()) + " " +  currentDateObj.getHours() + ":" + currentDateObj.getMinutes() + ":" + currentDateObj.getSeconds();
        var service_time = 0;


        // console.log(device_datetime_sql)


        const reqObj = {
            token: state.userData.token,
            sal_id: props?.route?.params?.data?.sal_id,
            date: date ? date : formatDate(currentDateObj),
            service_time: getServicesTime(),
            appoint_id: props?.route?.params?.data?.app_id ? props?.route?.params?.data?.app_id : null,
            device_datetime_sql
        }
        console.log(reqObj)

        doConsole(reqObj);
        setLoading(true);
        apiRequest(reqObj, 'get_salon_slots')
            .then(data => {
                doConsole(data);
                setLoading(false);
                if (data.action == 'success') {
                    if (reqObj.appoint_id) {
                        let data1 = data.data
                        let arr1 = [];
                        for (let key in data1) {
                            if (data1[key].ss_is_booked == '1') {
                                arr1.push(data1[key])
                                break;
                            }
                        }
                        setArr(arr1)
                    }

                    setSalSlots(data.data);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function book_appoint() {
        if (!arr.length) {
            alertRef.alertWithType('error', 'Error', "Please select time");
            return
        }
        if (gender == '') {
            alertRef.alertWithType('error', 'Error', "Please select your gender");
            return
        }

        if(comeToLocation == '1' && locationAddress == '' ){
            alertRef.alertWithType('error', 'Error', "Please enter location address");
            return
        }

        const servicesTotal = getServicesTotal()
        const reqObj = {
            token: state?.userData?.token,
            user_gender: gender,
            app_services: servicesTotal.servicesName,
            app_price: servicesTotal.servicesPrice,
            app_date: selectedDate,
            app_est_duration: servicesTotal.servicesTime,
            app_start_time: arr[0].ss_start_time,
            app_status: props.route.params?.data?.status ?? "payment_pending",
            sal_id: props?.route?.params?.data?.sal_id,
            app_id: props?.route?.params?.data?.app_id ? props?.route?.params?.data?.app_id : null,
            come_to_location: comeToLocation,
            location_address: locationAddress
        }
        doConsole(reqObj);
        setLoading(true)
        // doConsole(props?.route?.params?.data?.mobile_pay);
        apiRequest(reqObj, 'book_appoint')
            .then(data => {
                setLoading(false)
                doConsole(data)
                if (data.action == 'success') {
                    if (reqObj.app_id) {
                        navigate('AppointBooked', selectedDate + ", " + arr[0].ss_start_time);
                        return;
                    }


                    // alertRef.alertWithType('success', 'Success', data.msg ? data.msg : "Your appointment has been booked successfully");
                    // appointmnet object
                    // if (props?.route?.params?.data?.mobile_pay == '1') {
                    navigate('PaymentMethod', {
                        app_id: data.app_id,
                        date: selectedDate + ", " + arr[0].ss_start_time
                    })
                    // }
                    // else props.navigation.popToTop();


                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        doConsole(props.route.params)
        let date = props?.route?.params?.date ? props?.route?.params?.date : null
        setSelectedDate(date ? date : formatDate(currentDateObj))
        get_salon_slots(date ? date : null);
    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <SafeAreaView style={{ marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Book Appointment" />
                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }} >
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FFFFFF', marginTop: 15 }}>Please select date</Text>
                        <View style={{ marginTop: 15 }}>
                            <Calendar
                                style={{ width: "100%", alignSelf: 'center', backgroundColor: acolors.bgColor }}
                                // onDayPress={(day) => { console.log('selected day', day) }}
                                onDayPress={(day) => {
                                    // console.log(day)
                                    setSelectedDate(day.dateString);
                                    get_salon_slots(day.dateString);
                                    setArr([]);
                                    forceUpdate();

                                }}
                                current={currentDate}
                                minDate={formatDate(new Date)}
                                enableSwipeMonths={true}
                                // markingType={'custom'}
                                disableArrowRight={true}
                                theme={{
                                    calendarBackground: acolors.bgColor,

                                    selectedDayBackgroundColor: acolors.primary,
                                    selectedDayTextColor: acolors.bgColor,
                                    selectedDotColor: acolors.bgColor,

                                    arrowColor: '#001833',
                                    todayTextColor: '#0A0A16',
                                    dayTextColor: 'white',
                                    textDayFontFamily: 'PMe',
                                    textDisabledColor: 'rgba(255,255,255,0.4)',


                                    monthTextColor: acolors.primary,
                                    textDayFontSize: 10, // dates 1 ,2,3,4
                                    textMonthFontSize: 14, // month name dec 2021
                                    textMonthFontFamily: 'PRe',


                                    //  these are the monday, tuesday, wed headings
                                    textSectionTitleColor: 'rgba(255, 255, 255, 0.5)',
                                    textDayHeaderFontSize: 14,
                                    textDayHeaderFontFamily: "PRe"

                                }}
                                markedDates={{
                                    [selectedDate]: {
                                        selected: true, marked: true,
                                        customStyles: {
                                            container: {
                                                backgroundColor: acolors.primary,
                                                height: 30,
                                                width: 30,
                                                justifyContent: 'center',
                                                alignSelf: 'center',
                                                borderRadius: 15,
                                            },
                                            text: {
                                                color: '#111111',
                                                fontFamily: 'PRe',
                                                fontSize: 14
                                            }
                                        }
                                    },

                                }}
                            />

                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FFFFFF', marginTop: 15 }}>Please select time</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: -5 }}>
                                {salSlots.length ?
                                    salSlots.map((v, i) => {
                                        return (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() => {
                                                    onClick(v)
                                                    doConsole(v)
                                                }}
                                                style={{ alignItems: 'center', height: 30, width: 70, marginBottom: 0, paddingBottom: 0, justifyContent: 'center', borderRadius: 10, marginTop: 10, marginLeft: 10, backgroundColor: arr.includes(v) ? acolors.primary : 'rgba(252, 252, 252, 0.2)' }}>
                                                <Text style={{ color: 'white', fontFamily: 'PMe', margin: 0, lineHeight: 20 }}>{v.ss_start_time}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF', marginTop: 2, marginLeft: 10 }}>Closed</Text>
                                }
                            </View>

                            {
                                params?.is_mobile &&
                                <>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FFFFFF', marginTop: 15 }}>Will the Braider come to your location?</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: "60%" }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                onPress={() => { setComeToLocation('1') }}
                                                style={[styles.radioBtn, comeToLocation == '1' && { borderColor: acolors.primary }]}>
                                                {comeToLocation == '1' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                                            </TouchableOpacity>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Yes</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', }}>
                                            <TouchableOpacity
                                                onPress={() => { setComeToLocation('0') }}
                                                style={[styles.radioBtn, comeToLocation == '0' && { borderColor: acolors.primary }]}>
                                                {comeToLocation == '0' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                                            </TouchableOpacity>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>No</Text>
                                        </View>
                                    </View>
                                    {
                                        comeToLocation == 1 &&
                                        <CustomTextInput
                                            onChangeText={setLocationAddress}
                                            placeholder="Please enter your location's address"
                                            style={{ marginTop: 20 }}
                                        />
                                    }
                                </>
                            }


                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FFFFFF', marginTop: 15 }}>Select Gender</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { setGender('male') }}
                                        style={[styles.radioBtn, gender == 'male' && { borderColor: acolors.primary }]}>
                                        {gender == 'male' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Male</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity
                                        onPress={() => { setGender('female') }}
                                        style={[styles.radioBtn, gender == 'female' && { borderColor: acolors.primary }]}>
                                        {gender == 'female' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Female</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { setGender('others') }}
                                        style={[styles.radioBtn, gender == 'others' && { borderColor: acolors.primary }]}>
                                        {gender == 'others' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary, alignSelf: 'center' }}></View>}
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Other</Text>
                                </View>
                            </View>

                            <MainButton
                                onPress={() => {
                                    book_appoint();

                                }}
                                text={"Book"}
                                btnStyle={{ marginTop: 30 }}
                            />
                        </View>
                    </ScrollView>
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

export default BookAppointment
