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
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { goBack, navigate } from '../../../Navigations';

const NewPass = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar
                hidden={false}
                backgroundColor={'#fff'}
            />
            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,marginTop:20}}>
                    <TouchableOpacity  onPress={()=>goBack()} style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Enter New Password</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>
                    
                    <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white,marginTop:30 }}>Let's reset your password</Text>
                    <CustomTextInput
                        placeholder="Your new password"
                        style={{ marginTop: 20 }}
                    />

                    <CustomTextInput
                        placeholder="Retype your new password"
                        style={{ marginTop: 15, }}
                    />

                    <MainButton
                        text="Save Password"
                        btnStyle={{ marginTop: 60 }}
                        onPress={() => { navigate('SignIn') }}
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
