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

import Loader from '../../utils/Loader';
import { validateEmail, doConsole ,storeItem} from '../../utils/functions';

import { changeLoggedIn } from '../../../Common';
import DropdownAlert from 'react-native-dropdownalert';
import { urls } from '../../utils/Api_urls';
import { apiRequest } from '../../utils/apiCalls';


var alertRef;
const SignIn = () => {


    // const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [email, setEmail] = useState('mugheesC.abbas@gmail.com')
    const [password, setPassword] = useState('12345678')


    const doNext = () => {

        if (!validateEmail(email)) {
            alertRef.alertWithType("error", "Error", "Please provide a valid email address");
            return;
        }

        // if (password.length < 8) {
        //     alertRef.alertWithType("error", "Error", "Please provide at least 8 characters as your password");

        //     return;
        // }
        goSignup()
    }

    const goSignup = async () => {
        setLoading(true)
        var dbData = { email, password };
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
                alertRef.alertWithType("error",urls.error_title,urls.error);
            })

        // const { isError, data } = await doPost(dbData, "login");
        // console.log(isError)
        // if (isError) {
        //     setLoading(false)
        //     // alertRef.alertWithType("error",urls.error_title,urls.error);
        // }
        // else {

        // }
    }




    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                hidden={false}
                backgroundColor={acolors.bgColor}
                style='light'
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
                            <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', }}>
                                <FbIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 92, height: 48, borderWidth: 1, borderColor: acolors.white, borderRadius: 56, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
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

