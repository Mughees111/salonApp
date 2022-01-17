import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowLeft, ArrowRight, FbIcon, GoogleIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';

import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate,doConsole } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';

var alertRef;



const ChangePass = () => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);


    const [password, setPassword] = useState('');
    const [cPass, setCPass] = useState('');
    const [currentPass, setCureentPass] = useState('');

    function doChangePass() {

        if (!currentPass.length) {
            alertRef.alertWithType('error', 'Error', "Please enter current password");
            return
        }
        if (password.length<8) {
            alertRef.alertWithType('error', 'Error', "Password length must contain 8 words");
            return
        }
        if (cPass != password) {
            alertRef.alertWithType('error', 'Error', "Confirm password not matched");
            return
        }

        setLoading(true)
        const postObj = {
            token: state?.userData?.token,
            cupassword: currentPass,
            password: password
        }
        doConsole(postObj);
        setLoading(true)
        apiRequest(postObj, 'update_password')
            .then(data => {
                doConsole(data)
                setLoading(false)
                if (data.action == 'success') {
                    alertRef.alertWithType('success', 'Success', 'Your password has been changes.')
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


            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Change Password</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>
                    {/* <Text style={{ fontFamily: 'PRe', fontSize: 14, color: acolors.white, marginTop: 20 }}>Don’t worry. We have got you covered. Enter your
registered phone number and we will send OTP to reset your password</Text> */}


                    <CustomTextInput
                        placeholder="Enter you current password"
                        onChangeText={setCureentPass}
                        // keyboardType="number-pad"
                        keyboardAppearance="dark"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="New password"
                        onChangeText={setPassword}
                        // keyboardType="number-pad"
                        keyboardAppearance="dark"
                        style={{ marginTop: 20 }}
                    />
                    <CustomTextInput
                        placeholder="Confirm new password"
                        // keyboardType="number-pad"
                        onChangeText={setCPass}
                        keyboardAppearance="dark"
                        style={{ marginTop: 20 }}
                    />



                    <MainButton
                        text="Submit"
                        btnStyle={{ marginTop: 80 }}
                        onPress={() => {
                            doChangePass();
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

export default ChangePass
