import React, { useCallback, useState, useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch, Linking } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, MsgIcon, PhoneIcon, MarkerCancel } from '../../Components/Svgs';

import { MaterialIcons } from '@expo/vector-icons';

import { useFocusEffect } from '@react-navigation/native';
import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';
import ReactNativeModal from 'react-native-modal';
import { urls } from '../../utils/Api_urls';

var alertRef;





const AppointSchedule = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const filterFlatListRef = React.useRef();
    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('pendings');
    const [pendings, setPendings] = useState([]);
    const [scheduled, setScheduled] = useState([]);
    const [history, setHistory] = useState([]);
    const [ispublic, setispublic] = useState(0)

    const [reviewModal, setReviewModal] = useState(false)
    const [app_rating, setAppRating] = useState(5)
    const [app_review, setAppReview] = useState('')
    const [appDataForUpdate, setAppDataForUpdate] = useState();
    const [refresh, setRefresh] = useState(false);
    const [isDoneScrolling, setIsDoneScrolling] = useState(false);

    function getAppointments(id) {
        const reqObj = {
            token: state?.userData?.token,
            lat: state?.userLocation?.coords?.latitude,
            lng: state?.userLocation?.coords?.lng,
        }
        setLoading(true)
        apiRequest(reqObj, 'get_appoints')
            .then(data => {
                setLoading(false)
                if (data.action == 'success') {
                    if (id) {
                        let done = false;
                        for (let key of data?.pendings) {
                            if (key.app_id == id) {
                                console.log('this is the id', key)
                                setTabs('pendings');
                                key.toScroll = true;
                                done = true;
                                break;
                            }
                        }
                        if (!done) {
                            for (let key of data?.scheduled) {
                                if (key.app_id == id) {
                                    setTabs('scheduled');
                                    key.toScroll = true;
                                    done = true;
                                    break;
                                }
                            }
                        }
                        if (!done) {
                            for (let key of data?.history) {
                                if (key.app_id == id) {
                                    setTabs('history');
                                    key.toScroll = true;
                                    done = true;
                                    break;
                                }
                            }
                        }
                    }
                    setHistory(data.history);
                    setPendings(data.pendings);
                    setScheduled(data.scheduled);

                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function doCancelAppoint(app_id, status) {
        const reqObj = {
            token: state?.userData?.token,
            app_id: app_id,
            app_status: status ?? null
        }
        setLoading(true)
        apiRequest(reqObj, 'cancel_appoint')
            .then(data => {
                if (data.action == 'success') {
                    getAppointments()
                    alertRef.alertWithType("success", "Success", data.msg);
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    function doApproveRescheduleAppoint(app_id) {
        const reqObj = {
            token: state?.userData?.token,
            app_id: app_id,
        }
        setLoading(true)
        apiRequest(reqObj, 'approve_reschedule')
            .then(data => {
                if (data.action == 'success') {
                    getAppointments()
                    alertRef.alertWithType("success", "Success", data.msg);
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }


    function do_review() {
        const reqObj = {
            token: state?.userData?.token,
            app_rating: app_rating,
            app_review: app_review,
            app_id: appDataForUpdate.app_id,
            sal_id: appDataForUpdate.sal_id,
            user: true,
            app_status: "completed & reviewed"
        }
        setLoading(true)

        apiRequest(reqObj, 'complete_app')
            .then(data => {
                setLoading(false);
                if (data.action == 'success') {
                    alertRef.alertWithType("success", "Success")
                    setAppReview('')
                    setRefresh(!refresh)
                }
                else alertRef.alertWithType('error', "Error", data.error)
            })
            .catch(err => {
                alertRef.alertWithType('error', "Error", urls.error);
            })

    }

    function scrollToIndexNow(index) {
        console.log('index', index)
        setIsDoneScrolling(true)
        setTimeout(() => filterFlatListRef.current.scrollToIndex({ index: index || 0 }), 120)

    }

    const getItemLayout = (data, index) => (
        { length: 480, offset: tabs == 'history' ? 600 : 500 * index, index }
    )



    useFocusEffect(useCallback(() => {
        forceUpdate();
        var id = props.route?.params?.data?.post_id ? props.route?.params?.data?.post_id : null;
        console.log('id == ', id)
        getAppointments(id);
        return () => {
            setPendings([]);
            setHistory([]);
            setScheduled([]);
            setIsDoneScrolling(false);
            setTabs('pendings');
        }
    }, [refresh],
    ))

    const Tabs = () => (
        <View style={{ marginBottom: 10, flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: "90%", alignSelf: 'center', borderRadius: 8 }}>
            <TouchableOpacity
                onPress={() => {
                    setTabs('pendings')
                }}
                style={[tabs == 'pendings' ? styles.activeTab : styles.inActiveTab, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} >
                <Text style={tabs == 'pendings' ? styles.activeTabText : styles.inActiveTabText}>Pending</Text>
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


    const MakeReview = ({ number }) => {
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            let j = i;
            stars.push(
                <TouchableOpacity
                    onPress={() => {
                        setAppRating(i)
                        // j = i
                        forceUpdate();
                    }}
                >
                    {/* <RattingStarIcon width={38.21} height={36.21} /> */}
                    <RattingStarIcon width={38.21} height={36.21}
                        color={i > app_rating ? "grey" : null}
                    />
                </TouchableOpacity>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }






    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <DropdownAlert ref={(ref) => alertRef = ref} />
            {loading && <Loader />}
            <StatusBar
                backgroundColor={acolors.bgColor}
                style='light'
                translucent={false}
            />
            {

                <ReactNativeModal
                    style={{ margin: 0 }}
                    isVisible={reviewModal}
                    backdropOpacity={1}
                    onBackdropPress={() => {
                        setReviewModal(false)
                    }}
                >
                    <View style={{ width: 343, paddingVertical: 30, paddingHorizontal: 15, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 27, color: "#fff", alignSelf: 'center' }}>Write Review</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <MakeReview />
                        </View>
                        <Text style={{ fontFamily: 'PMe', fontSize: 20, color: '#fff', marginTop: 20 }}>Note</Text>
                        <TextInput
                            multiline={true}
                            value={app_review}
                            onChangeText={setAppReview}
                            textAlignVertical='top'
                            style={{ width: "100%", height: 156, paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 10, borderRadius: 8, color: '#fff', fontFamily: 'PRe', fontSize: 16 }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                setReviewModal(false)
                                do_review();

                            }}
                            style={{ width: "100%", height: 44, borderRadius: 8, backgroundColor: '#FE9D2C', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ fontSize: 13, fontFamily: 'PBo', color: '#fff' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>

            }


            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Appointments" />
                    <Tabs />
                    {
                        tabs == 'pendings' &&
                        <FlatList
                            data={pendings}
                            ref={filterFlatListRef}
                            getItemLayout={getItemLayout}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 200 }}
                            renderItem={({ item, index }) => {
                                item.toScroll && !isDoneScrolling && scrollToIndexNow(index);
                                // var services = item.app_services.split(",");
                                return (
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8, borderWidth: item.toScroll ? 1 : 0, borderColor: 'white' }}>
                                        
                                        {/* <View style={{ paddingHorizontal: 20 }}> */}
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            // onPress={() => console.log(item)}
                                            style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                                            <Image
                                                style={{ height: 85, width: "28%", resizeMode: 'stretch', borderRadius: 12 }}
                                                source={{ uri: item.sal_profile_pic }
                                                    // require('../../assets/salonImg1.png')
                                                }
                                            />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item.sal_name}</Text>
                                                <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item.sal_address}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                        <>
                                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                                            <RattingStarIcon />
                                                        </>
                                                    }
                                                    <RattingStarIcon />
                                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{item?.distance + " mi"}</Text>
                                                    <View style={{ position: 'absolute', bottom: -5, right: 0, flexDirection: 'row' }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                // console.log(item)
                                                                navigateFromStack('UserChatNavigator', 'ChatDetails', {
                                                                    name: item?.convos?.name,
                                                                    picUrl: item?.convos?.picture,
                                                                    convo_id: item?.convos?.convo_id,
                                                                    user_id: item?.convos?.sal_id,
                                                                })
                                                            }}
                                                            style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <MsgIcon />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Linking.openURL(`tel:+${item?.sal_phone}`, '_blank');
                                                            }}
                                                            style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <PhoneIcon />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                                            {
                                                // ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding', 'Facial Massage', 'Hair Rebonding',].
                                                item.app_services.split(",").map((v, i) => {
                                                    return (
                                                        <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_start_time}</Text>
                                            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, alignSelf: 'center' }}></View>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_date}</Text>
                                            <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>${item.app_price}</Text>
                                        </View>
                                        {/* </View> */}
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Status</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.app_status}</Text>
                                        </View>

                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Payment Method</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.payment_method == 'stripe' ? "Credit/Debit" : item.payment_method}</Text>
                                        </View>
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Paid</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, }}>{item?.is_paid == 1 ? item?.app_price : "0"}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15, flexWrap: 'wrap' }}>
                                            {/* <TouchableOpacity
                                                onPress={() => {
                                                    let cancelWord = item.app_status == 'reschedule' ? "reject" : "cancel";
                                                    Alert.alert(
                                                        `Are you sure you want to ${cancelWord} this appointment`,
                                                        '',

                                                        [
                                                            { text: 'Yes', onPress: () => doCancelAppoint(item.app_id, cancelWord == 'reject' ? "reschedule rejected" : null) },

                                                            { text: 'No', },
                                                        ],
                                                        { cancelable: true },
                                                    );

                                                }}
                                                style={{ width: "48%", paddingVertical: 10, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#F95959', }}>
                                                <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: item.app_status == 'reschedule' ? 12 : 16 }}>{item.app_status == 'reschedule' ? "Reject Reschedule " : "Cancel"} </Text>
                                            </TouchableOpacity> */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Alert.alert(
                                                        `Are you sure you want to cancel this appointment`,
                                                        '',

                                                        [
                                                            { text: 'Yes', onPress: () => doCancelAppoint(item.app_id) },

                                                            { text: 'No', },
                                                        ],
                                                        { cancelable: true },
                                                    );

                                                }}
                                                style={{ width: "48%", paddingVertical: 10, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#F95959', }}>
                                                <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 16 }}>Cancel </Text>
                                            </TouchableOpacity>
                                            {
                                                item.app_status == 'reschedule' &&
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        doApproveRescheduleAppoint(item.app_id)
                                                    }}
                                                    style={{ alignSelf: 'flex-end', paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: "48%", alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 12 }}>Approve Reschedule</Text>
                                                </TouchableOpacity>
                                            }
                                            {
                                                item.app_status == 'reschedule' &&

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        let makeBookedServices = item.app_services.split(",");
                                                        for (let i = 0; i < item.sal_services.length; i++) {
                                                            if (makeBookedServices.includes(item.sal_services[i].s_name)) {
                                                                item.sal_services[i].isAdded = true

                                                            }
                                                        }
                                                        item.status = 'reschedule_by_customer';
                                                        navigate('SeeAllServices', item)
                                                    }}
                                                    style={{ alignSelf: 'flex-end', paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: 126, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                                    <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 16 }}>Reschedule</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        {
                                            item.app_status != 'reschedule' &&
                                            <TouchableOpacity
                                                onPress={() => navigate('CancellationPolicy', { data: item.cancellation_policy })}
                                                style={{ width: "100%", borderRadius: 8, marginTop: 10, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                                                <MarkerCancel />
                                                <Text style={{ fontFamily: 'PMe', fontSize: 10, color: 'white', marginLeft: 5 }}>Read cancellation policy</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            }}
                        />

                    }


                    {
                        tabs == 'scheduled' &&
                        <FlatList
                            data={scheduled}
                            ref={filterFlatListRef}
                            getItemLayout={getItemLayout}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 200 }}
                            renderItem={({ item, index }) => {
                                item.toScroll && !isDoneScrolling && scrollToIndexNow(index);
                                return (
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8, borderWidth: item.toScroll ? 1 : 0, borderColor: 'white' }}>
                                        {/* <View style={{ paddingHorizontal: 20 }}> */}
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            // onPress={() => navigate('SalonDetails')}
                                            style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                                            <Image
                                                style={{ height: 85, width: "28%", resizeMode: 'stretch', borderRadius: 12 }}
                                                source={{ uri: item.sal_profile_pic }
                                                    // require('../../assets/salonImg1.png')
                                                }
                                            />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item.sal_name}</Text>
                                                <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item.sal_address}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                        <>
                                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                                            <RattingStarIcon />
                                                        </>
                                                    }
                                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{item?.distance + " mi"}</Text>
                                                    <View style={{ position: 'absolute', bottom: -5, right: 0, flexDirection: 'row' }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                navigateFromStack('UserChatNavigator', 'ChatDetails', {
                                                                    name: item?.convos?.name,
                                                                    picUrl: item?.convos?.picture,
                                                                    convo_id: item?.convos?.convo_id,
                                                                    user_id: item?.convos?.sal_id,
                                                                })
                                                            }}
                                                            style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <MsgIcon />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Linking.openURL(`tel:+${item?.sal_phone}`, '_blank');
                                                            }}
                                                            style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <PhoneIcon />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                                            {
                                                // ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding', 'Facial Massage', 'Hair Rebonding',].
                                                item.app_services.split(",").map((v, i) => {
                                                    return (
                                                        <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_start_time}</Text>
                                            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, alignSelf: 'center' }}></View>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_date}</Text>
                                            <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>${item.app_price}</Text>
                                        </View>
                                        {/* </View> */}
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Status</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.app_status}</Text>
                                        </View>
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Payment Method</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.payment_method == 'stripe' ? "Credit/Debit" : item.payment_method}</Text>
                                        </View>

                                        {/* <TouchableOpacity
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
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 mi</Text>
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
                                                ['Hair Rebonding', 'Hair Styling', 'Facial Massage', 'Hair Styling', 'Hair Rebonding', 'Hair Rebonding', 'Facial Massage', 'Hair Rebonding',].map((v, i) => {
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
                                        </View> */}
                                        {/* </View> */}
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Paid</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, }}>{item?.is_paid == 1 ? item?.app_price : "0"}</Text>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}> */}
                                        {/* <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Remind me 1h in advance</Text> */}
                                        {/* <Switch
                                                trackColor={{ false: "white", true: 'grey' }}
                                                thumbColor={ispublic ? acolors.primary : "grey"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() => {
                                                    console.log(ispublic)
                                                    setispublic(ispublic == 1 ? 0 : 1)
                                                }}
                                                value={ispublic == 1 ? true : false}
                                            />
                                        </View> */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    doCancelAppoint(item.app_id)
                                                }}
                                                style={{ width: 115, paddingVertical: 10, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#F95959', }}>
                                                <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 16 }}>Cancel</Text>
                                            </TouchableOpacity>
                                            {
                                                item?.is_paid != '1' &&

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        let makeBookedServices = item.app_services.split(",");
                                                        for (let i = 0; i < item.sal_services.length; i++) {
                                                            if (makeBookedServices.includes(item.sal_services[i].s_name)) {
                                                                item.sal_services[i].isAdded = true

                                                            }
                                                        }
                                                        navigate('SeeAllServices', item)
                                                    }}
                                                    style={{ alignSelf: 'flex-end', marginTop: 15, paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: 126, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 16 }}>Reschedule</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => navigate('CancellationPolicy', { data: item.cancellation_policy })}
                                            style={{ width: "100%", borderRadius: 8, marginTop: 10, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                                            <MarkerCancel />
                                            <Text style={{ fontFamily: 'PMe', fontSize: 10, color: 'white', marginLeft: 5 }}>Read cancellation policy</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />
                    }


                    {
                        tabs == 'history' &&

                        <FlatList
                            data={history}
                            ref={filterFlatListRef}
                            getItemLayout={getItemLayout}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 200 }}
                            renderItem={({ item, index }) => {
                                item.toScroll && !isDoneScrolling && scrollToIndexNow(index);
                                return (
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 20, marginTop: 20, backgroundColor: 'rgba(27, 27, 27, 1)', borderRadius: 8, borderWidth: item.toScroll ? 1 : 0, borderColor: 'white' }}>
                                        {/* <View style={{ paddingHorizontal: 20 }}> */}
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            // onPress={() => navigate('SalonDetails')}
                                            style={{ flexDirection: 'row', backgroundColor: '#1B1B1B', width: "100%", borderRadius: 8, }}>
                                            <Image
                                                style={{ height: 85, width: "28%", resizeMode: 'stretch', borderRadius: 12 }}
                                                source={{ uri: item.sal_profile_pic }}
                                            // require('../../assets/salonImg1.png')

                                            />
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <Text style={{ fontFamily: 'PMe', fontSize: 17, color: '#FCFCFC', }}>{item.sal_name}</Text>
                                                <Text numberOfLines={3} style={{ fontFamily: 'PRe', fontSize: 12, color: '#FCFCFC', marginTop: 5, }}>{item.sal_address}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {item?.sal_ratings == 0 ? <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{"No rating yet"}</Text> :
                                                        <>
                                                            <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.sal_ratings}</Text>
                                                            <RattingStarIcon />
                                                        </>
                                                    }
                                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                                    <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{item?.distance + " mi"}</Text>
                                                    <View style={{ position: 'absolute', bottom: -5, right: 0, flexDirection: 'row' }}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                navigateFromStack('UserChatNavigator', 'ChatDetails', {
                                                                    name: item?.convos?.name,
                                                                    picUrl: item?.convos?.picture,
                                                                    convo_id: item?.convos?.convo_id,
                                                                    user_id: item?.convos?.sal_id,
                                                                })
                                                            }}
                                                            style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <MsgIcon />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                Linking.openURL(`tel:+${item?.sal_phone}`, '_blank');
                                                            }}
                                                            style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                                            <PhoneIcon />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>
                                            {
                                                item.app_services.split(",").map((v, i) => {
                                                    return (
                                                        <View key={i} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, marginLeft: 5, marginTop: 10 }}>
                                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 12, }}>{v}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_start_time}</Text>
                                            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginHorizontal: 5, alignSelf: 'center' }}></View>
                                            <Text style={{ color: 'white', fontFamily: 'PRe', fontSize: 13, }}>{item.app_date}</Text>
                                            <Text style={{ fontFamily: 'PBo', fontSize: 12, color: acolors.primary, position: 'absolute', right: 0 }}>${item.app_price}</Text>
                                        </View>
                                        {/* </View> */}
                                        <View style={{ width: "110%", marginLeft: "-5%", paddingHorizontal: -20, height: 1, borderWidth: 1, borderStyle: 'dashed', borderColor: "rgba(255, 255, 255, 0.1)", marginTop: 20 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Status</Text>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.app_status}</Text>
                                        </View>
                                        {
                                            item.app_status == 'cancelled' &&
                                            <>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>Cancelled By</Text>
                                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.cancelled_by == 'user' ? "You" : item.cancelled_by}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                                                    <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', width: "40%" }}>Reason</Text>
                                                    <Text numberOfLines={4} style={{ textAlign: 'right', flexWrap: 'wrap', width: "60%", fontFamily: 'PMe', fontSize: 15, color: acolors.primary, textTransform: 'capitalize' }}>{item.cancelled_reason}</Text>

                                                </View>
                                            </>
                                        }
                                        {
                                            item.app_status == 'completed' &&
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // console.log(item)
                                                    setAppDataForUpdate(item)
                                                    // setAppId(item.app_id)
                                                    setReviewModal(true)
                                                    forceUpdate();
                                                }}
                                                style={{ flexDirection: 'row', marginTop: 10, }}>
                                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 14, marginRight: 10 }}>Enjoyed salon services? Review your appointment now!</Text>
                                                <MaterialIcons name='rate-review' size={22} color={'white'} />
                                            </TouchableOpacity>
                                        }

                                        <TouchableOpacity
                                            onPress={() => {
                                                let makeBookedServices = item.app_services.split(",");
                                                for (let i = 0; i < item.sal_services.length; i++) {
                                                    if (makeBookedServices.includes(item.sal_services[i].s_name)) {
                                                        item.sal_services[i].isAdded = true
                                                    }
                                                }
                                                item.app_id = null;
                                                item.app_date = null;
                                                item.app_status = null;
                                                navigate('SeeAllServices', item)
                                                // navigateFromStack('HomeStack', 'SalonDetails')
                                            }}
                                            style={{ alignSelf: 'flex-end', marginTop: 15, paddingVertical: 10, borderRadius: 8, backgroundColor: acolors.primary, width: 106, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: '#111111', fontFamily: 'PRe', fontSize: 14 }}>Book Again</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />


                    }
                </View>


            </SafeAreaView >


        </SafeAreaView >
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
