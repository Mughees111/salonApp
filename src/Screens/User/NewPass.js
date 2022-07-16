// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
// import { navigate } from '../../../Navigations';
// import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft } from '../../Components/Svgs';
// import { acolors } from '../../Components/AppColors';
// import { TextInput } from 'react-native-gesture-handler';
// import CustomTextInput from '../../Components/CustomTextInput';
// import PrivacyPicker from '../../Components/PrivacyPicker';
// import { MainButton } from '../../Components/Buttons';

// const NewPass = (props) => {
//     return (
//         <View style={{ flex: 1, backgroundColor: 'black' }}>
//             <StatusBar
//                 hidden={true}
//             />

//             <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
//                         <ArrowLeft />
//                     </TouchableOpacity>
//                     <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Enter New Password</Text>
//                     <Text>          </Text>
//                 </View>
//                 <ScrollView>

//                     <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white,marginTop:30 }}>Let's reset your password</Text>
//                     <CustomTextInput
//                         placeholder="Your new password"
//                         style={{ marginTop: 20 }}
//                     />

//                     <CustomTextInput
//                         placeholder="Retype your new password"
//                         style={{ marginTop: 15, }}
//                     />

//                     <MainButton
//                         text="Save Password"
//                         btnStyle={{ marginTop: 30 }}
//                         onPress={() => { props.navigation.popToTop() }}
//                     />

//                 </ScrollView>

//             </SafeAreaView>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     activeDot: {
//         width: 9,
//         height: 9,
//         borderRadius: 4.5,
//         backgroundColor: '#E2B378',
//         marginLeft: 5
//     },
//     inActiveDot: {
//         width: 9,
//         height: 9,
//         borderRadius: 4.5,
//         backgroundColor: '#FCFCFC',
//         marginLeft: 8
//     },

// })

// export default NewPass

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { goBack, navigate } from '../../../Navigations';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { apiRequest } from '../../utils/apiCalls';



var alertRef;

const NewPass = (props) => {

    const [newPass, setNewPass] = useState('');
    const [cPass, setCPass] = useState('');
    const [loading, setLoading] = useState(false);

    function doNewPass() {

        setLoading(true);
        if (newPass.length < 8) {
            alertRef.alertWithType('error', 'Error', 'Password length must be 8');
            return;
        }
        if (newPass != cPass) {
            alertRef.alertWithType('error', 'Error', 'Confirm password doesnot match');
            return;
        }

        const reqObj = {
            new_pass: newPass,
            slip: props?.route?.params?.slip
        }

        apiRequest(reqObj, 'new_password')
            .then(data => {
                setLoading(false);
                if (data.action == 'success') {
                    alertRef.alertWithType('success', 'Success', 'Your password has been changes');
                    navigate('SignIn');
                    return;
                }
                else {
                    alertRef.alertWithType("error", "Error", data.error);
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false);
                alertRef.alertWithType("error", "Error", 'Network Error');
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => goBack()} style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Enter New Password</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>

                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, marginTop: 30 }}>Let's reset your password</Text>
                    <CustomTextInput
                        placeholder="Your new password"
                        style={{ marginTop: 20 }}
                        onChangeText={setNewPass}
                    />

                    <CustomTextInput
                        placeholder="Retype your new password"
                        style={{ marginTop: 15, }}
                        onChangeText={setCPass}
                    />

                    <MainButton
                        text="Save Password"
                        btnStyle={{ marginTop: 60 }}
                        onPress={() => { doNewPass() }}
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

export default NewPass
