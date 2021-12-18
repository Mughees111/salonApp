import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList ,ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { navigate } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { ChatIcon, FilterIcon, LocationBtmIcon, LocationIcon, NotificationIcon, RattingStarIcon, SearchIcon } from '../../Components/Svgs';

const Home = () => {

    const [tabs, setTabs] = useState({
        men: true,
        women: false
    })

    const keyExtractor = ((item, index) => index.toString())

    const mensArray = [
        { img: require('../../assets/salonImg1.png'), title: "Hiana Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Adward’s Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg1.png'), title: "Serena Men Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg2.png'), title: "Forever Men Saloon", address: "817 Street maas Buleva..." },
    ]
    const womensArray = [
        { img: require('../../assets/salonImg3.png'), title: "Hiana Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg4.png'), title: "Adward’s Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg3.png'), title: "Serena Men Saloon", address: "817 Street main Buleva..." },
        { img: require('../../assets/salonImg4.png'), title: "Forever Men Saloon", address: "817 Street maas Buleva..." },
    ]

    const SalonGridView = useCallback((item, index) => {
        var item = item.item
        return (
            <TouchableOpacity
                onPress={() => navigate('SalonDetails')}
                style={{ width: 160, marginLeft: 15, height: 188, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>

                <Image
                    style={{ position: 'absolute', width: 160, height: 188 }}
                    source={item.img}

                />
                <Image
                    style={{ position: 'absolute', bottom: 0 }}
                    source={require('../../assets/salonShopMask.png')}
                />
                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: 'white' }}>{item.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <LocationIcon color="rgba(252, 252, 252, 0.5)" />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{ fontFamily: 'PRe', fontSize: 10, color: 'rgba(252, 252, 252, 0.5)', marginLeft: 5, }}>{item.address}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5</Text>
                        <RattingStarIcon />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>4.5 Km</Text>
                    </View>

                </View>




            </TouchableOpacity>
        )
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                hidden={false}
                style='light'
                translucent={true}
            />
            <Image
                source={require('../../assets/HomeImg1.png')}
                style={{ width: "100%", resizeMode: 'stretch', }}
            />
            {/*  position: 'absolute', top: 0  */}
            <Image
                source={require('../../assets/HomeMask1.png')}
                style={{ width: "100%", resizeMode: 'stretch', position: 'absolute', top: 0 }}
            />
            <SafeAreaView style={{ position: 'absolute', top: 28 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ color: acolors.primary, fontFamily: 'PBl', fontSize: 22, }}>Hello William,</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                            <LocationIcon />
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white, marginLeft: 5 }}>Alaska, US</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: -15, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => navigate('Notifications')}
                            >
                                <NotificationIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <ChatIcon />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, }}>
                        <View style={{ width: "83%", height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <SearchIcon />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Find a salon, services...'
                                placeholderTextColor="rgba(252, 252, 252, 1)"
                                returnKeyLabel='Search'
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => {
                                    navigate('SearchScreen')
                                }}
                                style={{ marginLeft: 10, color: 'rgba(252, 252, 252, 1)', fontFamily: 'PRe',flex:1 }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => navigate('Categories')}
                            style={{ paddingHorizontal: 10, height: 42, borderWidth: 1, borderColor: 'white', borderRadius: 8, alignItems: 'center', justifyContent: 'center', }}>
                            <FilterIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: "60%", alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs({
                                men: true,
                                women: false
                            })
                        }}
                        style={[tabs.men ? styles.activeTab : styles.inActiveTab, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]} >
                        <Text style={tabs.men ? styles.activeTabText : styles.inActiveTabText}>Men</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs({
                                men: false,
                                women: true
                            })
                        }}
                        style={[tabs.women ? styles.activeTab : styles.inActiveTab, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]} >
                        <Text style={tabs.women ? styles.activeTabText : styles.inActiveTabText}>Women</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom:400}} >
                    <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Nearest To You</Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        tabs.men &&
                        <>
                            <FlatList
                                data={mensArray}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                            <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Recommended</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={mensArray}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                        </>
                    }
                    {
                        tabs.women &&
                        <>
                            <FlatList
                                data={womensArray}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                            <View style={{ marginTop: 15, width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontFamily: 'PMe', fontSize: 17 }}>Recommended</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: 'rgba(252, 252, 252, 0.7)', fontFamily: 'PRe', fontSize: 14 }}>view all</Text>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={womensArray}
                                horizontal={true}
                                style={{ marginTop: 10, }}
                                keyExtractor={keyExtractor}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <SalonGridView item={item} index={index} />
                                )}
                            />
                        </>
                    }
                </ScrollView>
            </View>


        </View >
    )
}

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: acolors.primary,
        width: "50%",
        height: 42,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActiveTab: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: "50%",
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

export default Home
