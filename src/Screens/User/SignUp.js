
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
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
import { Entypo } from '@expo/vector-icons';

import { validateEmail, doConsole, storeItem } from '../../utils/functions';
import { apiRequest, doPost } from '../../utils/apiCalls';

import * as Google from 'expo-google-sign-in';
// import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import * as Device from 'expo-device';

var alertRef;
const SignUp = () => {


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cPass, setCPass] = useState('')
    const [loading, setLoading] = useState(false)

    const [showPass, setShowPass] = useState(true);

    function doNext() {

        var e = email;
        e = e.trim();


        if (username.length < 3) {
            alertRef.alertWithType("error", "Error", "Please provide a valid username");
            return;
        }

        if (!validateEmail(e)) {
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

        setLoading(true)
        var dbData = {
            email: e,
            username,
            password,
            phone,

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

    }


    function do_signup() {


        var e = email;
        e = e.trim();

        if (e == "") {
            // alert("Please enter your email");
            this.alertRef.alertWithType(
                "error",
                "error",
                "Please enter your email."
            );
            return;
        }

        if (!validateEmail(e)) {
            // alert("Please enter your email");
            alertRef.alertWithType(
                "error",
                "error",
                "Please enter a valid email."
            );
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

        setLoading(false)



        var body_data = {
            email: email,
            username: username,
            password: password,
        };

        // console.log("I send:");
        // console.log(urls.API + 'login');
        // console.log(body_data);

        fetch(urls.API + 'login', {
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

                    this.storeItem("login_data", responseJson.data).then(() => {
                        this.setState({ loading: false }, () => {
                            this.props.navigation.navigate("App");
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


    async function retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem('login_data');
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return
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
                // this.callGraph(token);
                console.log("calling token: " + token);

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

        var url_plus = type == 1 ? 'fb_connect' : "gl_connect";
        var body_data = { access_token: token };
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
                setLoading(false)
                alertRef.alertWithType('error', 'Error', "Network request failed");
            });
    }

    async function do_gl() {
        try {
            const result = await Google.initAsync({
                androidClientId: "980626479473-920i66v82umflpgtam5cln5dbjcruiea.apps.googleusercontent.com",
                iosClientId: "980626479473-0ebl3ruro1hkbuc2com4pmff0bmlttl3.apps.googleusercontent.com",
                // androidStandaloneAppClientId: "350112122949-iq0246j8k34a59p30ouflje9lho2orp8.apps.googleusercontent.com",
                // iosStandaloneAppClientId: "350112122949-67ini3k965oakm3cjvmmncje4fa6s106.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.accessToken);
                getUserInfo(result.accessToken);
                Alert.alert(result.accessToken)
            } else {
                Alert.alert('cancelled')
                console.log("cancleed");
            }
        } catch (e) {
            console.log("error");
            Alert.alert('error')
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
                                    data={[{ title: "+1" }]}
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
                        <View>
                            <CustomTextInput
                                onChangeText={setPassword}
                                placeholder="Password"
                                style={{ marginTop: 15, }}
                                secureTextEntry={showPass}

                            />
                            {/* <TouchableOpacity
                                onPress={() => setShowPass(!showPass)}
                                style={{ position: 'absolute', right: 0, top: 15, height: "100%", paddingHorizontal: 20, paddingTop: 10 }}>
                                {showPass ? <Entypo name='eye' color={"white"} size={20} /> : <Entypo name='eye-with-line' color={"white"} size={18} />}
                            </TouchableOpacity> */}
                        </View>
                        <CustomTextInput
                            placeholder="Confirm Password"
                            style={{ marginTop: 15, }}
                            onChangeText={setCPass}
                            secureTextEntry={showPass}
                        />
                        <MainButton
                            text="Next"
                            btnStyle={{ marginTop: 60 }}
                            onPress={() => {
                                doNext()
                                // navigate('OTP') 
                            }}
                        />
                        {/* <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 15, fontFamily: 'PMe' }}>or continue with</Text> */}
                        {/* <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
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
                        </View> */}
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
