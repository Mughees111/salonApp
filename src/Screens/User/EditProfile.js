import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, CameraIcon, PencilIcon, PencilIcon2 } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef

const EditProfile = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const userData = state.userData;
    const [username, setUserName] = useState(userData?.username);
    const [phone, setPhone] = useState(userData?.phone);
    const [imgsUrlForUpload, setImgsUrlForUpload] = useState();
    const [imgsUrlToShow, setImgsUrlToShow] = useState();





    
    function cameraUplaod() {
        var x = alertRef;
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
            })
    }

    function gallaryUpload() {

        var x = alertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    console.log('asd')
                    setLoading(false)
                    setImgsUrlForUpload(data.filename);
                    setImgsUrlToShow(data.url)
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                setLoading(false)
                // x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function doUpdateProfile() {

        if (username.length < 3) {
            alertRef.alertWithType('error', 'Error', "Please enter valid username");
            return
        }
        if (phone.length < 11) {
            alertRef.alertWithType('error', 'Error', "Please provide a valid 10 digit phone number");
            return
        }

        setLoading(true)
        const postObj = {
            token: userData?.token,
            username: username,
            phone: phone,
            profile_pic : imgsUrlForUpload
        }
        doConsole(postObj);
        setLoading(true)
        apiRequest(postObj, 'edit_profile')
            .then(data => {
                doConsole(data)
                setLoading(false)
                if (data.action == 'success') {
                    alertRef.alertWithType('success', 'Success', 'Your profile has been updated.')
                    storeItem('login_data', data.data)
                    setUserGlobal(data.data)
                    setTimeout(() => {
                        goBack();
                    }, 1000);
                }
                else {
                    alertRef.alertWithType('error', 'Error', data.error);
                };
            })
            .catch(err => {
                setLoading(false)
            })

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                hidden={false}
                style='light'
                backgroundColor='black'
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header title="Edit Profile" />

                <View style={{ marginTop: 20, alignSelf: 'center' }}>
                    <Image
                        style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', }}
                        source={{ uri: imgsUrlToShow ? imgsUrlToShow : userData.profile_pic_url }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Upload Picture",
                                'How do you want to upload picture?',

                                [
                                    { text: 'Camera', onPress: () => cameraUplaod() },

                                    { text: 'Gallery', onPress: () => gallaryUpload() },
                                ],
                                { cancelable: true },
                            );
                        }}
                        style={{ position: 'absolute', bottom: 0, right: -10, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                        <CameraIcon />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    {/* <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, marginTop: 30 }}>Edit Detail</Text> */}
                    <View style={{ marginTop: 50 }}>
                        <TextInput
                            placeholder='Username'
                            value={username}
                            onChangeText={setUserName}
                            placeholderTextColor={"white"}
                            style={{
                                width: "100%",
                                height: 42,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}
                        />
                        {/* <TouchableOpacity style={{ width: 20, position: 'absolute', top: 10, height: 42, alignSelf: 'center', justifyContent: 'center', right: 10, }}>
                            <PencilIcon2 style={{ alignSelf: 'center' }} color={acolors.primary} />
                        </TouchableOpacity> */}

                    </View>
                    <View >
                        <TextInput
                            placeholder='Phone'
                            onChangeText={setPhone}
                            value={phone}
                            placeholderTextColor={"white"}
                            style={{
                                width: "100%",
                                height: 42,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}
                        />
                        {/* <TouchableOpacity style={{ width: 20, position: 'absolute', top: 10, height: 42, alignSelf: 'center', justifyContent: 'center', right: 10, }}>
                            <PencilIcon2 style={{ alignSelf: 'center' }} color={acolors.primary} />
                        </TouchableOpacity> */}

                    </View>

                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { 
                            doUpdateProfile()
                            // goBack();
                         }}
                    />

                </ScrollView>

            </SafeAreaView>

        </View>
    )
}

const styles = StyleSheet.create({
    activeDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#E2B378',
        marginLeft: 5
    },
    inActiveDot: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#FCFCFC',
        marginLeft: 8
    },

})

export default EditProfile
