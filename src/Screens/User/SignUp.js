import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';

const SignUp = () => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                hidden={true}
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
                <Image
                    style={{ alignSelf: 'center' }}
                    source={require('../../assets/logo.png')}
                />
                <ScrollView>
                    <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>Create New Account</Text>
                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Enter detail to continue</Text>
                    <CustomTextInput
                        placeholder="Username"
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
                            placeholder="Phone Number"
                            style={{ marginLeft: "3%", width: "79%", marginTop: 15, }}
                        />
                    </View>
                    <CustomTextInput
                        placeholder="Password"
                        style={{ marginTop: 15, }}
                    />
                    <CustomTextInput
                        placeholder="Confirm Password"
                        style={{ marginTop: 15, }}
                        onChangeText={(v) => {
                            // console.log(v)
                        }}
                    />
                    <MainButton
                        text="Next"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { navigate('OTP') }}
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
                        onPress={() => navigate('SignIn')}
                    >
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Already have an account? Sign In</Text>
                    </TouchableOpacity>
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
