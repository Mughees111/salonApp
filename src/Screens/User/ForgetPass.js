import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../../utils/apiCalls';


var alertRef;

const ForgetPass = () => {

    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false)

    async function forgetPass() {

        if (phone == '') {
            alertRef.alertWithType('error', "Error", "Please enter phone number");
            return;
        }

        const reqObj = {
            phone: phone
        }

        apiRequest(reqObj, 'forgot_pw')
            .then(data => {
                if (data.action == 'success') {
                    const sendOtpObj = {
                        c_code: data?.data?.country_code,
                        phone: phone,
                        code_text: "321"
                    }
                    apiRequest(sendOtpObj, 'send_otp')
                        .then(data => {
                            console.log(data)
                            if (data.action == 'success') {
                                navigate('ForgetPassOpt', {
                                    slip: data.slip,
                                    // signupObj: dbData
                                })
                            }
                            else alertRef.alertWithType("error", "Error", data.error);
                            setLoading(false)
                        })
                        .catch(err => {
                            alertRef.alertWithType("error", "Error", "Network Error");
                        })
                }
                else {
                    alertRef.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })

    }

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />
            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Forgot Password</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white, marginTop: 20 }}>Don’t worry. We have got you covered. Enter your
                        registered phone number and we will send OTP to reset your password</Text>


                    <CustomTextInput
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        keyboardAppearance="dark"
                        onChangeText={setPhone}
                        style={{ marginTop: 20 }}
                    />



                    <MainButton
                        text="Submit"
                        btnStyle={{ marginTop: 80 }}
                        onPress={() => { 
                            forgetPass();
                            // navigate('ForgetPassOpt') 
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

export default ForgetPass
