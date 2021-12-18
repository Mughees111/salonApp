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




const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}



const BookAppointment = () => {

    const forceUpdate = useForceUpdate()
    const [gender, setGender] = useState('')
    const currentDateObj = new Date();
    const [currentDate, setCurrentDate] = useState()
    const [selectedDate, setSelectedDate] = useState('')


    useEffect(() => {

        var month = currentDateObj.getMonth() + 1
        var date = currentDateObj.getDate();
        // console.log(month)
        // console.log('data = ' + date)
        if (month != '11' || month != '12') {
            console.log('console1')
            if (date < 10) {
                date = "0" + date;
            }

            setCurrentDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
            setSelectedDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
        }
        else {
            console.log('console2')
            if (date < 10) {
                date = "0" + date;
            }
            month = "0" + month;
            setCurrentDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
            setSelectedDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
        }
        console.log(selectedDate)
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />
            <SafeAreaView style={{marginTop:25}}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Book Appointment" />
                    <ScrollView contentContainerStyle={{ paddingBottom: 70 }} >
                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FFFFFF', marginTop: 15 }}>Please select date</Text>
                        <View style={{ marginTop: 15 }}>
                            <Calendar
                                style={{ width: "100%", alignSelf: 'center', backgroundColor: acolors.bgColor }}
                                // onDayPress={(day) => { console.log('selected day', day) }}

                                onDayPress={(day) => {
                                    console.log(day)
                                    setSelectedDate(day.dateString)
                                    forceUpdate();
                                    console.log(selectedDate)
                                }}
                                current={currentDate}
                                minDate={currentDate}
                                enableSwipeMonths={true}
                                // markingType={'custom'}
                                disableArrowRight={true}
                                theme={{
                                    calendarBackground: acolors.bgColor,
                                    
                                    selectedDayBackgroundColor: acolors.primary,
                                    selectedDayTextColor:acolors.bgColor,
                                    selectedDotColor:acolors.bgColor,

                                    arrowColor: '#001833',
                                    todayTextColor: '#0A0A16',
                                    dayTextColor: 'white',
                                    textDayFontFamily:'PMe',
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
                            <Text style={{ fontFamily: 'PRe', fontSize: 10, color: '#FFFFFF', marginTop: 2 }}>under development</Text>
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
                                        {gender == 'others' && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: acolors.primary }}></View>}
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#E9E9E9", marginLeft: 7 }}>Other</Text>
                                </View>
                            </View>
                            <MainButton
                                onPress={() => navigate('PaymentMethod')}
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
