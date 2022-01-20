import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, HeartIcon, MsgIcon, PhoneIcon } from '../../Components/Svgs';
import Reviews from '../../Components/Reviews';
import { MainButton } from '../../Components/Buttons';
// import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from '@expo/vector-icons';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;

const SalonDetails = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);


    const params = props.route.params;
    const [fav, setFav] = useState(params?.is_fav)
    const daysArr = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    useEffect(() => {
        // console.log(props.route.params)
    }, [])

    function doFav() {
        const postObj = {
            token: state?.userData?.token,
            sal_id: params?.sal_id
        }
        doConsole(postObj);
        // setLoading(true)
        apiRequest(postObj, 'do_fav_salon')
            .then(data => {
                doConsole(data)
                // setLoading(false)
                // if (data.action == 'success') {
                //     alertRef.alertWithType('success', 'Success', 'Done')
                // }
                // else {
                //     alertRef.alertWithType('error', 'Error', data.error);
                // };
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const keyExtractor = ((item, index) => index.toString())

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />


            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            <Image
                source={require('../../assets/SalonDetailMask.png')}
                style={{ position: 'absolute', height: 200, resizeMode: 'stretch', top: 0, width: "100%" }}
            />

            <Image
                source={{ uri: params?.sal_pic }}
                style={{ height: 270, resizeMode: 'stretch', top: 0, width: "100%" }}
            />

            {/* <SliderBox
                sliderBoxHeight={270}
                activeOpacity={0.9}
                ImageComponentStyle={{ opacity: 0.5 }}
                resizeMethod={'resize'}
                paginationBoxVerticalPadding={60}
                dotColor="#E2B378"
                inactiveDotColor="#FCFCFC"
                images={images}
            /> */}

            <SafeAreaView style={{ position: 'absolute', top: 10, }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(0.5,0.5,0.5,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            doFav()
                            setFav(fav == 1 ? 0 : 1)
                            forceUpdate()
                        }}
                        activeOpacity={0.8}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            fav == 1 ? <AntDesign size={20} name='heart' color={"red"} /> : <HeartIcon />
                        }

                    </TouchableOpacity>

                </View>
            </SafeAreaView>



            <SafeAreaView style={{ marginTop: 22, backgroundColor: '#111111', marginTop: -40, borderTopLeftRadius: 30 }}>

                <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>

                    <View style={{ flexDirection: 'row', flex: 1, paddingRight: 10 }}>
                        <Image
                            style={{ marginLeft: 20, marginTop: 10, width: "25%", borderRadius: 10 }}
                            source={{ uri: params?.sal_profile_pic }}
                        />
                        <View style={{ marginLeft: 15, marginTop: 7, flex: 1 }}>
                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>{params?.sal_name}</Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF' }}>{params?.sal_contact_person}
                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>(Owner)</Text>
                            </Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>{params?.sal_address}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                                <RattingStarIcon />
                                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>5.5 Km</Text>
                                <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                        <MsgIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 27, marginLeft: 10, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
                                        <PhoneIcon />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 20, marginTop: 15, }}>
                        <Text style={styles.headingText}>Description</Text>
                        <Text style={[styles.simpleText, { lineHeight: 20 }]}>{params?.sal_description}</Text>
                        <Text style={styles.headingText}>Schedule</Text>
                        {
                            params?.sal_hours?.map((v, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingBottom: 5, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                                        <Text style={styles.simpleText}>{daysArr[i]}</Text>
                                        <View style={{}}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                                <Text style={[styles.simpleText, { marginLeft: 20 }]}>{v[0] ? v[0] : null} {v[1]?.length ? "-" + v[1] : null} </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={styles.headingText}>Service List</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SeeAllServices', params)}
                            >
                                <Text style={{ color: 'rgba(252, 252, 252, 0.9)', fontFamily: 'PMe', marginTop: 5, fontSize: 14 }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            params?.sal_services?.map((item, i) => {
                                if (i > 3) return null;
                                return (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            // doConsole(params)
                                            navigate('SeeAllServices', params)
                                        }}
                                        key={i} style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', paddingBottom: 5, paddingHorizontal: 2, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                                        <View style={{ width: "50%" }}>
                                            <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'PMe' }}>{item.s_name}</Text>
                                            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'PRe' }}>{item.s_time_mins} mins</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>${item.s_price}</Text>
                                            <View style={{ height: 29, paddingHorizontal: 10, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderRadius: 4 }}>
                                                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#111111' }}>Add</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }


                        {/* <ServicesView title="Peaceful Massage" />
                        <ServicesView title="Men Skin Polish" />
                        <ServicesView title="Oil Treatment" /> */}


                        <Image
                            style={{ width: "100%", resizeMode: 'stretch', marginTop: 20 }}
                            source={require('../../assets/map.png')}
                        />
                        <Text style={styles.headingText}>Photos</Text>
                        <FlatList
                            style={{ marginTop: 10 }}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            data={[
                                // { img: require('../../assets/salonImg1.png') },
                                // { img: require('../../assets/salonImg3.png') },
                                // { img: require('../../assets/salonImg2.png') },
                                // { img: require('../../assets/salonImg1.png') },
                                // { img: require('../../assets/salonImg2.png') },
                                // { img: require('../../assets/salonImg3.png') },
                            ]}

                            renderItem={({ item }) => (
                                <Image
                                    style={{ width: 79, height: 69, borderRadius: 5, marginLeft: 10, borderRadius: 8 }}
                                    source={item.img}
                                />
                            )}
                        />
                        <Text style={{ marginTop: 20, fontSize: 17, fontFamily: 'PMe', color: 'white' }}>Reviews ({params?.sal_reviews})</Text>
                        {
                            params?.sal_reviews > 0 &&
                            <>
                                <Reviews
                                    name="William David:"
                                    image={require("../../assets/reviewImg1.png")}
                                    review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                    rattings="5.0"
                                />
                                <Reviews
                                    name="Richard Thomas"
                                    image={require("../../assets/reviewImg1.png")}
                                    review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                    rattings="4.5"
                                />
                                <Reviews
                                    name="Xquenda Cuauhtémoc"
                                    image={require("../../assets/reviewImg1.png")}
                                    review="Lorem ipsum dolor sit , consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"
                                    rattings="4.8"
                                    last={true}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('pressed')
                                        navigate('AllReviews')
                                    }}
                                >
                                    <Text style={{ color: acolors.primary, fontFamily: 'PRe', fontSize: 12, }}>View all reviews</Text>
                                </TouchableOpacity>
                            </>
                        }
                        <MainButton
                            btnStyle={{ marginTop: 15 }}
                            onPress={() => {
                                navigate('SeeAllServices', params)
                            }
                                // navigate('BookAppointment')}
                            }
                            text="Book Appointment"

                        />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    headingText: {
        marginTop: 5,
        fontSize: 17,
        fontFamily: 'PMe',
        color: 'white'
    },

    simpleText: {
        fontSize: 14,
        fontFamily: 'PRe',
        color: 'rgba(255,255,255,0.8)',

    }
})

export default SalonDetails
