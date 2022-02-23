import { ArrowLeft, ArrowRight, SendIcon } from '../../Components/Svgs'
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, Dimensions, Image, StatusBar,
    Platform, TouchableOpacity, ImageBackground, ActivityIndicator, Alert
} from "react-native";
import { Container, Content, Header, Left, Body, Right, Button, Title, } from "native-base";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { doConsole, retrieveItem, storeItem, validateEmail } from "../../utils/functions";
import { apiRequest, doPost } from "../../utils/apiCalls";
import { acolors, acolors as AppColors } from '../../Components/AppColors';

import DropdownAlert from "react-native-dropdownalert";
import { urls } from "../../utils/Api_urls";
// import { StoryContainer } from 'react-native-stories-view';
import { Entypo } from '@expo/vector-icons';

import { Bubble, Composer, Day, GiftedChat, InputToolbar, Send, Time } from 'react-native-gifted-chat'
// import { ArrowBack as BackButton } from '../Components/SvgIcons';


let alertRef;
//ATUO
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;
var pusher = new Pusher('033f6b20d0bff06d62de', {
    cluster: 'ap2'
});
//ATUO

var textType = "image";
var mimeType = "image/png";
var extType = ".png";

const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}
const filters = [
    "Posts",
    "Media",
    "People"
]
const ChatDetails = (props) => {

    let carousell;
    //('params are')

    //(props.route.params)
    const { user_id, convo_id, picUrl, name } = props?.route?.params ?? { user_id: 0, convo_id: 0, picUrl: "" }
    const forceUpdate = useForceUpdate()

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const [moreAvailable, setMoreAvailable] = useState(0)
    const [page, setPage] = useState(0)
    const [canSend, setCanSend] = useState(true)


    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [state_convo_id, setConvoId] = useState(convo_id)
    let isFirstTime = true;
    //ATUO
    var channel = pusher.subscribe('chat-channel');
    //ATUO
    const navigation = useNavigation()
    const [search, setSearchText] = React.useState("")


    const [mainChats, setMainChats] = React.useState([])
    const [chats, setChats] = React.useState([])


    const [user, setUser] = React.useState({})

    useFocusEffect(React.useCallback(() => {

        retrieveItem("login_data").then((data) => {
            setUser(data)
        })


    }, []))
    useEffect(() => {
        if (user) {
            loadChat()

        }
    }, [user])

    //ATUO
    const setupPusher = () => {
        //("binding");
        if (!isFirstTime) return
        isFirstTime = false
        //("binding2");

        channel.bind('chat', function (data) {
            console.log("Pusher data")
            //console.log(data?.to_alert + " with " + user?.id)
            if (data?.to_alert == user?.id) {
                var x = [data?.msg];
                console.log(x)
                setMessages(previousMessages => GiftedChat.append(previousMessages, x))
            }
        });
    }
    //ATUO
    const loadChat = async () => {

        var x = alertRef;
        const dbData = { token: user?.token ?? "", convo_id: state_convo_id, user_id };
        console.log('db_data = ')
        console.log(dbData)
        if (dbData?.token == "") return
        //(dbData)
        //("@get_msgs");
        // const { isError, data } = await doPost(dbData, "get_msgs");
        apiRequest(dbData, "get_msgs")
            .then(data => {
                // //('data is')
                // //(data)
                // //('console 3')
                // //(data);
                setLoading(false)

                if (data.action == "success") {
                    console.log('data i get ');
                    console.log(data)
                    setMessages(data.msgs)
                    setCanSend(data?.can_send == 1 ? 1 : 0)
                    setMoreAvailable(data.more_available)
                    //ATUO
                    setupPusher();
                    //ATUO
                    setTimeout(() => {
                        setLoading(false)
                    }, 500)

                }
                else {
                    setLoading(false)
                    //(data.error)
                    //("^^^^^^^^^");
                    x.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false)
                //('console 4')
                Alert.alert('Internet Error')
            })
        //   //(isError);


    }



    const onSend = async (text) => {

        var x = alertRef;

        if (text.length < 1) {
            x.alertWithType("error", "Error", "Please type your message");

            return;
        }
        setLoading(true)
        const reqObj = {
            token: user?.token ?? "", msg: text,
            convo_id: state_convo_id,
            user_id
        };
        console.log('data i am sending')
        console.log(reqObj)

        setSending(true);
        setLoading(false)

        const { isError, data } = await doPost(reqObj, "send_msg");
        setSending(false)
        if (isError) {
            x.alertWithType("error", "Error", "Internet");
        }
        else {
            if (data.action == "success") {
                console.log('data i get from ')
                console.log(data)
                var x = [data?.data.to_print];
                console.log('x = ')
                console.log(x)
                setConvoId(data?.data?.convo_id);
                console.log('convo id = ');
                console.log(data.data.convo_id);
                setMessages(previousMessages => GiftedChat.append(previousMessages, x[0]))
                setTimeout(() => {
                    setSending(false);
                }, 500)
            }
            else {
                setSending(false)
                x.alertWithType("error", "Error", data.error);
            }
        }

    }


    return (
        <View
            style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <View style={{ width: "80%", alignSelf: 'center' }}>
                {/* Header */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS == 'ios' ? 35 : 25, alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                        style={{ alignSelf: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row' }}> */}
                    <Image
                        style={{ width: 44, height: 44, borderRadius: 22, }}
                        source={{ uri: picUrl }}
                    />

                    <Text style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 'bold', textTransform: 'capitalize' }}>{name}</Text>
                </View>
            </View>







            <View>
                {loading && <View style={{ marginVertical: 20, alignSelf: "center" }}><ActivityIndicator color={"white"} size={"large"} /></View>}
                {!loading && messages?.length == 0 && <View style={{ marginVertical: 20, alignSelf: "center" }}><Text style={{ textAlign: "center", color: 'white', fontFamily: 'PMe' }}>No messages yet</Text></View>}

            </View>



            <View style={{ flex: 1, marginBottom: 10, }}>

                <GiftedChat
                    messages={messages}
                    showUserAvatar={false}
                    renderAvatar={null}

                    renderTime={() => null}
                    renderDay={props => {
                        return (
                            <Day
                                {...props}
                                textStyle={{ color: '#E2B378' }}
                            />
                        );
                    }}

                    renderInputToolbar={() => {
                        return <View style={{ width: "100%" }}>

                        </View>



                    }}
                    renderSend={(props) => {
                        return (
                            <Send
                                {...props}
                                containerStyle={{ width: 45, height: 45, borderRadius: 45 / 2, backgroundColor: '#E2B378', justifyContent: "center", alignItems: 'center', }}
                            >
                                {/* <View style={{width: 50.61, height: 50.61, borderRadius: 25.30, backgroundColor: '#A047C8', justifyContent: "center", alignItems: 'center', marginLeft: -10 }}
                                > */}
                                <SendIcon />
                                {/* </View> */}
                            </Send>
                        )
                    }}

                    renderComposer={props => {
                        return (

                            <Composer
                                textInputStyle={{ height: 15.2, margin: 0, alignSelf: 'center', color: acolors.bgColor, fontSize: 13, paddingLeft: 10, fontFamily: 'PRe' }}
                                multiline={true}
                                {...props}
                                placeholder="Type message"
                                placeholderTextColor={acolors.bgColor}
                            // composerHeight={11}

                            // style={{ }}
                            />



                        )
                    }}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}

                                textStyle={{
                                    right: {
                                        color: '#000000',
                                        fontFamily: 'PRe'
                                    },
                                    left: {
                                        color: '#FCFCFC',
                                        fontFamily: 'PRe'

                                    },
                                }}


                                wrapperStyle={{
                                    left: {

                                        // borderRadius: 0,
                                        // borderRadius: 18,
                                        // backgroundColor: "#A047C8",
                                        // paddingLeft: 20,
                                        // paddingRight: 20,
                                        // paddingTop: 5,
                                        // paddingBottom: 5

                                        marginBottom: 5,
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#262432',
                                        borderRadius: 20,
                                        borderTopStartRadius: 0,


                                    },
                                    right: {

                                        marginTop: 5,

                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 20,
                                        borderTopEndRadius: 0,
                                    },
                                }}
                            />
                        );
                    }}
                    user={{
                        _id: user?.id,
                    }}
                    onSend={(msgss) => {
                        var msg = msgss[0].text;
                        onSend(msg)
                    }}
                    renderInputToolbar={(props) => {
                        // if (!canSend) {
                        // return (<View style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>
                        //     <Text style={{ color: "red", textAlign: "center", fontSize: 11, fontStyle: "italic" }}>You cannot send message to this user, as you are not linked to this user yet</Text>
                        // </View>)
                        // } else {
                        return (
                            <InputToolbar
                                {...props}
                            />
                        );
                        // }
                    }}

                />
            </View>





        </View >
        // </Container>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.appColor, paddingVertical: 10
    },
    bookview: {
        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 56, backgroundColor: AppColors.appColor, paddingVertical: 6
    },
    loginview: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

        alignSelf: 'center', alignItems: "center", borderRadius: 3, width: 114, backgroundColor: AppColors.white, paddingVertical: 10
    },
    signtext: {
        fontSize: 20, color: AppColors.white, fontFamily: 'SR', lineHeight: 24
    },
    logintext: {
        fontSize: 20, color: AppColors.appColor, fontFamily: 'SR', lineHeight: 24
    }
});


export default ChatDetails