
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, LOGO } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { changeLoggedIn } from '../../../Common';
import { urls } from '../../utils/Api_urls';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

import { validateEmail, doConsole, storeItem } from '../../utils/functions';
import { apiRequest, doPost } from '../../utils/apiCalls';

import * as Device from 'expo-device';

var alertRef;
const SignUp = () => {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cPass, setCPass] = useState('')
    const [loading, setLoading] = useState(false)

    function doNext() {

        if (username.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid name");
            return;
        }
        if (!validateEmail(email)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;

        }

        if (password.length < 8) {
            alertRef.alertWithType("error", "Error", "Please provide at least 8 characters as your password");

            return;
        }
        if (password != cPass) {
            alertRef.alertWithType("error", "Error", "Confirm password doesn't match");

            return;
        }

        goSignup()
    }

    const goSignup = async () => {
        setLoading(true)
        var dbData = {
            email,
            username,
            password,
            device_model: Device?.modelName ? Device?.modelName : null,
            device_manufactur: Device?.manufacturer ? Device?.manufacturer : null
        };
        doConsole(" I request @ " + urls.API + "signup");
        doConsole(dbData);

        apiRequest(dbData, 'signup')
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data).then(() => {
                        storeItem("is_guest", '0')
                        changeLoggedIn.changeNow(1);
                    })
                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                console.log(err)
            })


        // const { isError, data } = await doPost(dbData, "signup");

        // if (isError) {
        //     setLoading(false)
        //     alertRef.alertWithType("error", urls.error_title, urls.error);
        // }
        // else {
        //     if (data.action == "success") {

        //         storeItem("login_data", data.data).then(() => {
        //             storeItem("is_guest", '0')
        //             changeLoggedIn.changeNow(1);
        //         })
        //     }
        //     else {
        //         setLoading(false)
        //         alertRef.alertWithType("error", "Error", data.error);
        //     }
        // }
    }




    return (
        <View style={{ flex: 1 }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <Image
                style={{ position: 'absolute', width: "100%", height: "100%", }}
                source={require('../../assets/signUpImg.png')}
            />
            <Image
                style={{ position: 'absolute', height: "100%", width: "100%" }}
                source={require('../../assets/signUpMask.png')}
            />
            <SafeAreaView style={{ marginTop: 60, width: "90%", alignSelf: 'center' }}>
                <View style={{ alignSelf: "center", alignItems: "center" }}>

                    <LOGO />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
                    <View style={{ marginTop: -15 }}>
                        <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>Create New Account</Text>
                        <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Enter detail to continue</Text>
                        <CustomTextInput
                            onChangeText={setUsername}
                            placeholder="Username"
                            style={{ marginTop: 20 }}
                        />
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType={"email-address"}
                            style={{ marginTop: 20 }}
                        />
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: "17%", height: 42, marginTop: 15, borderWidth: 1, borderColor: '#FCFCFC', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text>92</Text> */}
                                <PrivacyPicker
                                    selected={{ title: "+1" }}
                                    data={{ title: "+1" }}
                                    onValueChange={(index, title) => {
                                        // setCondition(title.title)
                                    }}
                                />
                            </View>
                            <CustomTextInput
                                onChangeText={setPhone}
                                keyboardType={"numeric"}
                                placeholder="Phone Number"
                                style={{ marginLeft: "3%", width: "79%", marginTop: 15, }}
                            />
                        </View>
                        <CustomTextInput
                            onChangeText={setPassword}
                            placeholder="Password"
                            style={{ marginTop: 15, }}
                        />
                        <CustomTextInput
                            placeholder="Confirm Password"
                            style={{ marginTop: 15, }}
                            onChangeText={setCPass}
                        />
                        <MainButton
                            text="Next"
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => {
                                doNext()
                                // navigate('OTP') 
                            }}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 15, fontFamily: 'PMe' }}>or continue with</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                                <FbIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <GoogleIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {

                                navigate('SignIn')
                            }}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Already have an account? Sign In</Text>
                        </TouchableOpacity>
                    </View>
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

export default SignUp
