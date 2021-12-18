import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, ArrowLeft, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon, HeartIcon, MsgIcon, PhoneIcon } from '../../Components/Svgs';
import Reviews from '../../Components/Reviews';
import { MainButton } from '../../Components/Buttons';
import { SliderBox } from "react-native-image-slider-box";


const SalonDetails = () => {


    const keyExtractor = ((item, index) => index.toString())
    const images = [
        require('../../assets/SalonDetailImg.png'),
        require('../../assets/SalonDetailImg.png'),
        require('../../assets/SalonDetailImg.png'),
    ]

    const ServicesView = ({ title }) => (
        <View style={{ marginTop: 10, flexDirection: 'row', width: "100%", justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ width: "50%" }}>
                <Text style={{ color: '#FCFCFC', fontSize: 15, fontFamily: 'PMe' }}>{title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontFamily: 'PRe' }}>25 - 30 mins</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PMe', fontSize: 15, color: '#FCFCFC', }}>$50</Text>
                <TouchableOpacity style={{ height: 29, paddingHorizontal: 10, backgroundColor: acolors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderRadius: 4 }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#111111' }}>Add</Text>
                </TouchableOpacity>
            </View>


        </View>
    )


    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                translucent={true}
            />

            <Image
                source={require('../../assets/SalonDetailMask.png')}
                style={{ position: 'absolute', height: 200, resizeMode: 'stretch', top: 0, width: "100%" }}
            />

            <SliderBox
                sliderBoxHeight={270}
                activeOpacity={0.9}
                ImageComponentStyle={{ opacity: 0.5 }}
                resizeMethod={'resize'}
                paginationBoxVerticalPadding={60}
                dotColor="#E2B378"
                inactiveDotColor="#FCFCFC"
                images={images}
            />

            <SafeAreaView style={{ position: 'absolute', top: 30, }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width, }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(0.5,0.5,0.5,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <HeartIcon />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>



            <SafeAreaView style={{ marginTop: 22, backgroundColor: '#111111', marginTop: -40, borderTopLeftRadius: 30 }}>

                <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>

                    <View style={{ flexDirection: 'row', flex: 1, paddingRight: 10 }}>
                        <Image
                            style={{ marginLeft: 20, width: "25%", }}
                            source={require('../../assets/salonProfileImg1.png',)}
                        />
                        <View style={{ marginLeft: 15, marginTop: 7, flex: 1 }}>
                            <Text style={{ fontFamily: 'PMe', fontSize: 17, color: acolors.primary }}>Hiana Saloon</Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FFFFFF' }}>Robert
                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>(Owner)</Text>
                            </Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>2400 US-30 Suite 106, Oswego, IL 60543, United States</Text>
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
                        <Text style={[styles.simpleText, { lineHeight: 20 }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eleifend nunc a nisi placerat aliquam.</Text>
                        <Text style={styles.headingText}>Schedule</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={styles.simpleText}>Monday - Friday</Text>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                    <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                    <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: acolors.primary }}></View>
                                    <Text style={[styles.simpleText, { marginLeft: 20 }]}>7:30 - 11:30 AM</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={styles.headingText}>Service List</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SeeAllServices')}
                            >
                                <Text style={{ color: 'rgba(252, 252, 252, 0.9)', fontFamily: 'PMe', marginTop: 5, fontSize: 14 }}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <ServicesView title="Peaceful Massage" />
                        <ServicesView title="Men Skin Polish" />
                        <ServicesView title="Oil Treatment" />


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
                                { img: require('../../assets/salonImg1.png') },
                                { img: require('../../assets/salonImg3.png') },
                                { img: require('../../assets/salonImg2.png') },
                                { img: require('../../assets/salonImg1.png') },
                                { img: require('../../assets/salonImg2.png') },
                                { img: require('../../assets/salonImg3.png') },
                            ]}

                            renderItem={({ item }) => (
                                <Image
                                    style={{ width: 79, height: 69, borderRadius: 5, marginLeft: 10, borderRadius: 8 }}
                                    source={item.img}
                                />
                            )}
                        />
                        <Text style={{ marginTop: 20, fontSize: 17, fontFamily: 'PMe', color: 'white' }}>Reviews (113)</Text>
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

                        <MainButton
                            btnStyle={{ marginTop: 15 }}
                            onPress={() => navigate('BookAppointment')}
                            text="Book Appointment"

                        />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </View >
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
