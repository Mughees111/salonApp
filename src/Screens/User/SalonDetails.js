import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
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

    const [salImgs, setSalImgs] = useState([]);
    const [sal_reviews, setSalReviews] = useState([]);
    const [sal_ratings, setSalRatings] = useState('');

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


    function get_salon_pics() {

        const postObj = {
            sal_id: params?.sal_id,
            token: state.userData.token
        }
        setLoading(true)
        doConsole(postObj)
        apiRequest(postObj, 'get_salon_pics')
            .then(data => {
                setLoading(false)
                if (data.action == 'success') {
                    setSalImgs(data.imgs);
                    params.sal_services = data?.sal_services
                    doConsole(data)
                    setSalReviews(data.sal_reviews);
                    setSalRatings(data.sal_ratings);
                    forceUpdate();
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })
    }


    const keyExtractor = ((item, index) => index.toString())


    useEffect(() => {
        get_salon_pics();
    }, [])

    const MakeReview = ({ number }) => {
        console.log(number)
        var stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                // <View>
                <RattingStarIcon width={16} height={15} color={i > number ? "grey" : null} />
                // </View>
            )
        }
        return <View style={{ flexDirection: 'row' }}>{stars}</View>

    }






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
                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{params?.sal_ratings}</Text>
                                <RattingStarIcon />
                                <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'white', marginLeft: 10 }}></View>
                                <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF', marginLeft: 5 }}>{params?.distance} mi</Text>
                                <View style={{ position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // console.log(params.convos)
                                            navigateFromStack('UserChatNavigator', 'ChatDetails', {
                                                name: params?.convos?.name,
                                                picUrl: params?.convos?.picture,
                                                convo_id: params?.convos?.convo_id,
                                                user_id: params?.convos?.sal_id,
                                            })
                                        }}
                                        style={{ width: 27, height: 27, borderRadius: 12.5, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center' }}>
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
                                                <Text style={[styles.simpleText, { marginLeft: 20 }]}>{v[0] ? v[0] : null} {v[0] != 'closed' && v[1]?.length ? "-" + v[1] : null} </Text>
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


                        {/* <Image
                            style={{ width: "100%", resizeMode: 'stretch', marginTop: 20 }}
                            source={require('../../assets/map.png')}
                        /> */}
                        <Text style={styles.headingText}>Photos</Text>
                        <FlatList
                            style={{ marginTop: 10 }}
                            keyExtractor={keyExtractor}
                            showsVerticalScrollIndicator={false}
                            horizontal={true}
                            data={salImgs}

                            renderItem={({ item }) => (
                                <Image
                                    style={{ width: 79, height: 69, borderRadius: 5, marginLeft: 10, borderRadius: 8 }}
                                    source={{ uri: item.img }}
                                />
                            )}
                        />
                        <TouchableOpacity
                            style={{marginTop:15}}
                            onPress={()=>navigate('HealthSafety',params?.sal_id)}
                        >
                            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>Salon Health and Safety Rules</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                            <Text style={{ fontSize: 17, fontFamily: 'PMe', color: 'white' }}>Reviews ({sal_reviews.length})</Text>
                            {sal_reviews.length > 0 &&
                                < View style={{ position: 'absolute', right: 0, }}>
                                    <MakeReview width={20} number={sal_ratings} />
                                </View>
                            }
                        </View>
                        {
                            sal_reviews.length > 0 &&
                            <>
                                {
                                    sal_reviews?.map((v, i) => {
                                        if (i > 3) {
                                            return null
                                        }

                                        return (
                                            <Reviews
                                                key={i}
                                                name={v.username}
                                                image={v.profile_pic}
                                                review={v.rev_text}
                                                rattings={v.rev_rating}
                                                rev_datetime={v.rev_datetime}
                                            />
                                        )
                                    })
                                }


                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('pressed')
                                        navigate('AllReviews', sal_reviews)
                                    }}
                                >
                                    <Text style={{ color: acolors.primary, fontFamily: 'PRe', fontSize: 12, marginTop: 10 }}>View all reviews</Text>
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
