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

const SignIn = () => {
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
                    <Text style={{ marginTop: 20, fontFamily: 'PBl', fontSize: 22, color: acolors.primary }}>Welcome Back</Text>
                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Login to continue</Text>
                    <CustomTextInput
                        placeholder="Phone Number"
                        style={{ marginTop: 20 }}
                    />

                    <CustomTextInput
                        placeholder="Password"
                        style={{ marginTop: 15, }}
                    />
                    <TouchableOpacity 
                        onPress={()=>navigate('ForgetPass')}
                        style={{alignSelf:'flex-end',marginTop:10}}>
                        <Text style={{fontFamily:'PRe',fontSize:14,color:acolors.white}}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <MainButton
                        text="Log In"
                        btnStyle={{ marginTop: 30 }}
                        // onPress={() => { navigate('OTP') }}
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
                        onPress={() => navigate('SignUp')}
                    >
                        <Text style={{ alignSelf: 'center', fontSize: 16, color: acolors.white, marginTop: 20, fontFamily: 'PMe' }}>Don’t have an account? Sign Up</Text>
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

export default SignIn
