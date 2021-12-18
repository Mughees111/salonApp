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




const AppointSchedule = () => {


    const [tabs, setTabs] = useState('pendings');
    const [ispublic, setispublic] = useState(1)

    const Tabs = () => (
        <View style={{marginBottom:10, flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: "90%", alignSelf: 'center', borderRadius: 8 }}>
            <TouchableOpacity
                onPress={() => {
                    setTabs('pendings')
                }}
                style={[tabs == 'pendings' ? styles.activeTab : styles.inActiveTab, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} >
                <Text style={tabs == 'pendings' ? styles.activeTabText : styles.inActiveTabText}>Pendings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTabs('scheduled')
                }}
                style={[tabs == 'scheduled' ? styles.activeTab : styles.inActiveTab,]} >
                <Text style={tabs == 'scheduled' ? styles.activeTabText : styles.inActiveTabText}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setTabs('history')
                }}
                style={[tabs == 'history' ? styles.activeTab : styles.inActiveTab, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} >
                <Text style={tabs == 'history' ? styles.activeTabText : styles.inActiveTabText}>History</Text>
            </TouchableOpacity>
        </View>
    )

    const HistoryTab = () => (
        <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8 }}>
            {/* <View style={{ paddingHorizontal: 20 }}> */}
            <TouchableOpacity
                activeOpacity={1}
                // onPress={() => navigate('SalonDetails')}
                style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                <Image
                    style={{ height: 85, width: "28%", resizeMode: 'stretch' }}
                    source={require('../../assets/salonImg1.png')}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>Hiana Saloon</Text>
                    <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>2400 US-30 Suite 106, Oswego, IL 60543, United States</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                        <RattingStarIcon />
                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                        <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
                            <View style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                <MsgIcon />
                            </View>
                            <View style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                <PhoneIcon />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                {
                    ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding',].map((v,i) => {
                        return (
                            <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>04:30 PM</Text>
                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, }}></View>
                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>8 Oct, 2021</Text>
                <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>$410</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigateFromStack('HomeStack', 'SalonDetails')}
                style={{ alignSelf: 'flex-end', marginTop: 15, paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: 106, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#111111', fontFamily: 'PRe', fontSize: 14 }}>Book Again</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
            // translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Appointment" />
                    <Tabs />
                    {
                        tabs == 'pendings' &&
                        <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8 }}>
                            {/* <View style={{ paddingHorizontal: 20 }}> */}
                            <TouchableOpacity
                                activeOpacity={1}
                                // onPress={() => navigate('SalonDetails')}
                                style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                                <Image
                                    style={{ height: 85, width: "28%", resizeMode: 'stretch' }}
                                    source={require('../../assets/salonImg1.png')}
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>Hiana Saloon</Text>
                                    <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>2400 US-30 Suite 106, Oswego, IL 60543, United States</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                        <RattingStarIcon />
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                                        <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
                                            <View style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                <MsgIcon />
                                            </View>
                                            <View style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                <PhoneIcon />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                                {
                                    ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding', 'Facial Massage', 'Hair Rebonding',].map((v,i) => {
                                        return (
                                            <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>04:30 PM</Text>
                                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, }}></View>
                                <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>8 Oct, 2021</Text>
                                <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>$410</Text>
                            </View>
                            {/* </View> */}
                            <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Status</Text>
                                <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, }}>Pending</Text>
                            </View>
                        </View>
                    }


                    {
                        tabs == 'scheduled' &&
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 250 }} >
                            <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8 }}>
                                {/* <View style={{ paddingHorizontal: 20 }}> */}

                                <TouchableOpacity
                                    activeOpacity={1}
                                    // onPress={() => navigate('SalonDetails')}
                                    style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                                    <Image
                                        style={{ height: 85, width: "28%", resizeMode: 'stretch' }}
                                        source={require('../../assets/salonImg1.png')}
                                    />
                                    <View style={{ marginLeft: 10, flex: 1 }}>
                                        <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>Hiana Saloon</Text>
                                        <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>2400 US-30 Suite 106, Oswego, IL 60543, United States</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                            <RattingStarIcon />
                                            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                                            <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
                                                <View style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                    <MsgIcon />
                                                </View>
                                                <View style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                    <PhoneIcon />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                                    {
                                        ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding', 'Facial Massage', 'Hair Rebonding',].map((v,i) => {
                                            return (
                                                <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                                    <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>04:30 PM</Text>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, }}></View>
                                    <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>8 Oct, 2021</Text>
                                    <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>$410</Text>
                                </View>
                                {/* </View> */}
                                <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Paid</Text>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, }}>$410</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15,alignItems:'center' }}>
                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Remind me 1h in advance</Text>
                                    <Switch
                                        trackColor={{ false: "white", true: 'grey' }}
                                        thumbColor={ispublic ? acolors.primary : "grey"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => {
                                            console.log(ispublic)
                                            setispublic(ispublic == 1 ? 0 : 1)
                                        }}
                                        value={ispublic == 1 ? true : false}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                                    <TouchableOpacity style={{ width: 115, paddingVertical: 10, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#F95959', }}>
                                        <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 16 }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 15, paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: 126, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 16 }}>Reschedule</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigate('CancellationPolicy')}
                                    style={{ width: "100%", borderRadius: 8, marginTop: 10, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                                    <MarkerCancel />
                                    <Text style={{ fontFamily: 'PMe', fontSize: 10, color: 'white', marginLeft: 5 }}>Read cancellation policy</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    }


                    {
                        tabs == 'history' &&
                        <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                            <HistoryTab />
                            <HistoryTab />
                        </ScrollView>
                    }
                </View>
            </SafeAreaView >

        </View >
    )
}


const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "33%",
        height: 42,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: "33%",
        height: 42,
        // borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTabText: {
        fontFamily: 'PMe',
        fontSize: 16,
        color: '#111111'
    },
    inActiveTabText: {
        fontFamily: 'PRe',
        fontSize: 14,
        color: '#FFFFFF'
    }
})


export default AppointSchedule
