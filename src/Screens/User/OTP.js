
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

import CodeInput from 'react-native-confirmation-code-input';
import { changeLoggedIn } from '../../../Common';

import { validateEmail, doConsole, storeItem } from '../../utils/functions';
import { apiRequest, doPost } from '../../utils/apiCalls';
import DropdownAlert from 'react-native-dropdownalert';
import Loader from '../../utils/Loader';


var alertRef;
const OTP = (props) => {


    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false)

    function verifyOTP() {

        setLoading(true)
        const reqObj = {
            code: otp,
            slip: props?.route?.params?.slip
        }

        apiRequest(reqObj, 'verify_otp')
            .then(data => {
                console.log('otp data ');
                console.log(data)
                if (data.action == 'success') {
                    console.log('sign up params ');
                    console.log(props?.route?.params?.signupObj)
                    apiRequest(props?.route?.params?.signupObj, 'signup')
                        .then(data => {
                            console.log('sign up data ');
                            console.log(data)
                            setLoading(false)
                            if (data.action == 'success') {
                                storeItem("login_data", data.data).then(() => {
                                    storeItem("is_guest", '0')
                                    changeLoggedIn.changeNow(1);
                                })
                            }
                            else {
                                alertRef.alertWithType("error", "Error", data.error);
                                setLoading(false)
                            }
                        })
                        .catch(err => {
                            setLoading(false)
                            alertRef.alertWithType("error", "Error", 'Network Error');
                            console.log(err)
                        })

                }
                else {
                    setLoading(false)
                    alertRef.alertWithType("error", "Error", data.error);
                }
            })
            .catch(err => {
                setLoading(false)
                alertRef.alertWithType("error", "Error", 'Network Error');
                console.log(err)
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
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
                    <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>OTP</Text>
                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Enter OTP to continue</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

                        {/* <View style={rootStyle}> */}
                        <CodeInput
                            // ref="codeInputRef2"
                            secureTextEntry
                            // compareWithCode='AsDW2'
                            activeColor={acolors.white}
                            inactiveColor={acolors.white}
                            keyboardType='numeric'
                            autoFocus={false}
                            ignoreCase={true}
                            inputPosition='center'
                            size={50}
                            codeLength={4}
                            onFulfill={(isValid) => { setOTP(isValid) }}
                            containerStyle={{ marginTop: 30 }}
                            codeInputStyle={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3 }}
                        />


                        {/* <CustomTextInput
                            autoFocus={true}
                            keyboardType="number-pad"
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3 }}
                        />
                     
                        <CustomTextInput
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3, marginLeft: 12 }}
                        />
                        <CustomTextInput
                            style={{ width: 42, height: 42, borderRadius: 8, borderWidth: 1.3, marginLeft: 12 }}
                        /> */}

                    </View>



                    {/* <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 15, fontFamily: 'PMe' }}>or continue with</Text>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 15 }}>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                            <FbIcon />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <GoogleIcon />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Already have an account? Sign In</Text>
                    </TouchableOpacity> */}
                </ScrollView>

            </SafeAreaView>
            <TouchableOpacity
                onPress={() => verifyOTP()}
                disabled={otp.length == 4 ? false : true}
                style={{
                    width: "100%",
                    height: 45,
                    backgroundColor: acolors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 23,
                    position: 'absolute',
                    bottom: 50,
                    width: "89%",
                    alignSelf: 'center',
                    opacity: otp.length == 4 ? 1 : 0.6
                }}>
                <Text style={{ color: '#111111', fontFamily: 'PMe', fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>

        </View >
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

export default OTP

