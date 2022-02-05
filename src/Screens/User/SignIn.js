import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, LOGO } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';

import Loader from '../../utils/Loader';
import { validateEmail, doConsole, storeItem } from '../../utils/functions';

import { changeLoggedIn } from '../../../Common';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';

import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';


import * as Device from 'expo-device';


var alertRef;
const SignIn = () => {


    // const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [email, setEmail] = useState('mugheesC.abbas@gmail.com')
    const [password, setPassword] = useState('12345678')


    const doNext = () => {

        var e = email;
        e = e.trim();
        if (!validateEmail(e)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }

        setLoading(true)
        var dbData = {
            email: e,
            password,
            device_model: Device?.modelName ? Device?.modelName : null,
            device_manufactur: Device?.manufacturer ? Device?.manufacturer : null
        };
        doConsole(" I request @ " + urls.API + "login");
        apiRequest(dbData, "login")
            .then(data => {
                if (data.action == "success") {

                    storeItem("login_data", data.data).then(() => {
                        storeItem("is_guest", '0')
                        changeLoggedIn.changeNow(1);
                        setLoading(false)
                    })
                }
                else {
                    setLoading(false)
                    console.log(data.user)
                    alertRef.alertWithType("error", "Error", data.error);
                }

            })
            .catch(err => {
                doConsole(err)
                setLoading(false)
                alertRef.alertWithType("error", urls.error_title, urls.error);
            })

    }

    async function do_fb() {
        // alert("touched");
        try {
            await Facebook.initializeAsync({
                appId: '1126621257878659'
            });
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', "email"],
            });

            if (type === 'success') {
                // console.log("calling token: " + token);
                getUserFBInfo(token)
                // callGraph(token);
                // console.log("calling token: " + token);

                // callWpFb(token, 1);

                // this.firebaseLogin(token);
            }
            else {
                console.log('type')
                console.log(type);
            }
        }
        catch (err) {
            console.log("Facebook error: " + err);
        }

    };

    function callWpFb(token, type) {

        setLoading(true);
        var url = 'https://graph.facebook.com/me?access_token=EAAQApZCPfTIMBAAu5lnxyN0ea5wR9g71tjuhZA3IqkO6dmjdAIbXbWwbNv26YvlvnZC9NV1Td9RYa8wwSznXToPWlsNb61eYfyoySMRzXonncCPwjs09rlEVgqRZBZCHI7bREXict82aFqZAqbxxgctcH2Nmc2Gt0oHiGmeGJVkha4rW0DjqbrOZA3NY0A1w5UzbrNI2XnU41w7eUC01HH6ZBCcQ8QYsVOYff9MIlqdrUmzYX8TAUdZBv&fields=id,name,email,picture'
        var url_plus = type == 1 ? 'fb_connect' : "gl_connect";
        var body_data = { access_token: token };
        fetch(urls.API + url_plus, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type   ': 'application/json',
            },
            body: JSON.stringify(body_data),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("I get:");
                console.log(responseJson);

                if (responseJson.action == "success") {

                    this.storeItem("login_data", responseJson.data).then(() => {
                        this.storeItem("shipping_address", "").then(() => {

                            this.retrieveItem("back_to_checkout").then((backto) => {

                                if (backto == 55) {
                                    this.setState({ loading: false }, () => {

                                        this.props.navigation.navigate("Checkout_Screen");

                                    });
                                }
                                else {
                                    this.setState({ loading: false }, () => {

                                        this.props.navigation.navigate("Home");

                                    });
                                }
                            });
                        });
                    });
                }
                else {

                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            this.dropDownAlertRef.alertWithType('error', 'Error', responseJson.error);
                            // alert(responseJson.error);
                        }, 500);
                    });
                }
            })
            .catch((error) => {
                this.setState({ loading: false }, () => {
                    setTimeout(() => {
                        this.dropDownAlertRef.alertWithType('error', 'Error', "Network request failed");

                        //   alert(error);
                    }, 500);
                });
            });
    }

    function signup_me_up(id, email, name, type) {
        setLoading(true)

        var url_plus = "social_connect";
        var body_data = {
            email: email,
            name: name,
            id: id,
            type: type
        };
        fetch(urls.API + url_plus, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_data),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("I get:");
                console.log(responseJson);
                if (responseJson.action == "success") {
                    storeItem("login_data", responseJson.data).then(() => {
                        setLoading(false);
                        changeLoggedIn.changeNow(1);
                    });
                }
                else {

                    setLoading(false)
                    alertRef.alertWithType('error', 'Error', responseJson.error);
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                alertRef.alertWithType('error', 'Error', "Network request failed");
            });
    }

    async function do_gl() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "527892875003-hedb1nb124fddj9ovoq1r4j5vuj9co2d.apps.googleusercontent.com",
                iosClientId: "527892875003-sjango5l1jsd0tm4sbnl4dpuol1bo9mv.apps.googleusercontent.com",
                androidStandaloneAppClientId: "527892875003-2jchbb27rqtsutlmtitgtn0k5p9hgqfs.apps.googleusercontent.com",
                // iosStandaloneAppClientId: "350112122949-67ini3k965oakm3cjvmmncje4fa6s106.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.accessToken);
                getUserInfo(result.accessToken);

            } else {
                alertRef.alertWithType('error',"Error","Something went wrong please try again later.")
                console.log("cancleed");
            }
        } catch (e) {
            alertRef.alertWithType('error',"Error","Something went wrong please try again later.")

            console.log(e);
            // return { error: true };
        }
    }

    async function getUserInfo(accessToken) {
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // console.log(userInfoResponse);
        userInfoResponse.json().then((data) => {
            console.log(data);
            signup_me_up(data.id, data.email, data.name, "GOOGLE");
        })
    }

    async function getUserFBInfo(accessToken) {
        setLoading(true)
        var url = `https://graph.facebook.com/me?access_token=${accessToken}`;
        let userInfoResponse = await fetch(url, {
            // headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log(userInfoResponse);
        userInfoResponse.json().then((data) => {
            console.log(data);
            signup_me_up(data.id, data.email, data.name, "FACEBOOK");
        })
    }




    useEffect(() => {
        console.log(Device)
    }, [])




    return (
        <View style={{ flex: 1 }}>
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
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ alignSelf: "center", alignItems: "center" }}>

                    <LOGO />
                </View>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>Welcome Back</Text>
                        <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Login to continue</Text>
                        <CustomTextInput
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType={"email-address"}
                            style={{ marginTop: 20 }}
                        />

                        <CustomTextInput
                            onChangeText={setPassword}
                            placeholder="Password"
                            style={{ marginTop: 15, }}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={() => navigate('ForgetPass')}
                            style={{ alignSelf: 'flex-end', marginTop: 10 }}>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white }}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <MainButton
                            text="Log In"
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => {
                                doNext();
                                //  navigate('BottomTabs') 
                            }}
                        />
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 15, fontFamily: 'PMe' }}>or continue with</Text>
                        <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    do_fb()
                                }}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                                <FbIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => do_gl()}
                                style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <GoogleIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: 30 }}
                            onPress={() => navigate('SignUp')}
                        >
                            <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Don’t have an account? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </SafeAreaView>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

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

export default SignIn

