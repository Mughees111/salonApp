import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, TextInput, Alert } from 'react-native'
import { Header } from '../../Components/Header';
import { ArrowLeft, ChatLargeIcon } from '../../Components/Svgs'



import { doConsole, retrieveItem, storeItem, validateEmail } from "../../utils/functions";
import { apiRequest, doPost, doPostDoc } from "../../utils/apiCalls";
import DropdownAlert from "react-native-dropdownalert";
import Loader from '../../utils/Loader';
import { acolors } from '../../Components/AppColors';
import { goBack } from '../../../Navigations';
import { useFocusEffect } from '@react-navigation/native';


var alertRef;

const UserChat = (props) => {

    const [chatBg, setChatBg] = useState(false)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState()
    const [chatsData, setChatData] = useState([]);

    useFocusEffect(useCallback(() => {
        retrieveItem("login_data").then((data) => {
            setUser(data)

            const reqObj = {
                token: data.token
            }
            console.log(reqObj)
            setLoading(true)
            apiRequest(reqObj, "get_chats")
                .then(data => {
                    console.log('data is')
                    console.log(data)
                    setLoading(false)
                    if (data.action == 'success') {
                        setChatData(data.chats)
                    }
                    else {
                        alertRef.alertWithType('error', 'Error', data.error)

                    }
                })
                .catch(err => {
                    console.log(err)
                    alertRef.alertWithType('error', 'Error', 'Internet Error')
                })
        })
    }, [],
    ))




    const keyExtractor = useCallback((item, index) => index.toString(), []);



    const renderChats = useCallback(({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    item.selected = true
                    setChatBg(!chatBg)
                    console.log(item)

                    // navigateFromStack('UserChatNavigator', 'ChatDetails',{
                    //     name : params?.convos?.name,
                    //     picUrl : params?.convos?.picture,
                    //     convo_id : params?.convos?.convo_id,
                    //     user_id : params?.convos?.sal_id,
                    // })

                    console.log(item)
                    props.navigation.navigate('ChatDetails', {
                        user_id: item?.user_id,
                        convo_id: item?.id,
                        name: item?.username,
                        picUrl: item?.image
                    })
                }}
                style={{ width: "100%", height: 58.67, marginTop: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)', paddingBottom: 10 }}>
               <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{ uri: item.image }}
                />
                <View
                    style={{ width: "90%" }}

                // style={[!item.selected ? styles.chatSelected : styles.chatUnselected]}>
                // style={[styles.chatUnselected]}
                >
                    <Text style={{ marginLeft: 12, fontFamily: 'PRe', fontSize: 18, color: '#FFFFFF' }}>{item?.username}</Text>
                    <Text style={{ marginLeft: 12, fontFamily: 'PRe', fontSize: 12, color: '#FFFFFF' }}>{item?.last_msg?.msg}</Text>
                    <Text style={{ marginLeft: 12, fontFamily: 'PRe', fontSize: 8, color: '#FFFFFF', position: 'absolute', right: 20, top: 15 }}>{item?.last_msg?.ago}</Text>
                </View>
               
            </TouchableOpacity>)
    }, [chatBg])


    const Header = () => (
        <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }} >
            <TouchableOpacity
                style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingRight: 2 }}
                onPress={() => goBack()}
            >
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PSBo', fontSize: 20.67, color: 'white' }}>Chat</Text>
            <Text></Text>

        </View >
    )

    return (



        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <View>
                <DropdownAlert ref={ref => alertRef = ref} />
            </View>
            {loading && <Loader />}

            <View style={{ width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, }}>
                    <StatusBar
                        style="light"
                        backgroundColor="#111111"
                        translucent={false}
                    />
                    {/* <UserDrawer /> */}
                    <Header />
                </View>
            </View>

            <View style={{ width: "90%", alignSelf: 'center', marginTop: 15 }}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ width: 145, height: 35, backgroundColor: '#000000', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#FFFFFF' }}>Buyer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 145, height: 35, backgroundColor: '#A047C8', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'LR', fontSize: 16, color: '#FFFFFF' }}>Seller</Text>
                        </TouchableOpacity>
                    </View> */}
                {/* <TouchableOpacity style={{ width: "100%", height: 45, backgroundColor: '#000000', borderRadius: 8, marginTop: 20, flexDirection: 'row', paddingLeft: 14, alignItems: 'center' }}>
                        <SearchIcon />
                        <TextInput placeholder="Spider Man 3" placeholderTextColor="#FFFFFF" style={{ width: "100%", marginLeft: 20, fontFamily: 'LR', color: '#FFFFFF', fontSize: 14 }} />
                    </TouchableOpacity> */}
                {
                    !loading && !chatsData.length ?
                        <Text style={{ fontFamily: 'PBo', fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 20 }}>You have no chats</Text>
                        : null
                }
                <FlatList
                    data={chatsData}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderChats}
                />

            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    chatSelected: {
        width: '90%',
        // marginLeft: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        height: "100%",
        borderRadius: 9,
        backgroundColor: '#000000'
    },
    chatUnselected: {
        width: '90%',
        // marginLeft: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        height: "100%",
        borderRadius: 9,
        // backgroundColor: '#A047C8'
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
})
export default UserChat





