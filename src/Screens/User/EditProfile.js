import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, CameraIcon, PencilIcon, PencilIcon2 } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';

const EditProfile = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar
                hidden={false}
                style='light'
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header title="Profile" />

                <View style={{ marginTop: 20, alignSelf: 'center' }}>
                    <Image
                        style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center' }}
                        source={require('../../assets/profileImg.png')}
                    />
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: -10, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: acolors.primary }}>
                        <CameraIcon />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    {/* <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, marginTop: 30 }}>Edit Detail</Text> */}
                    <View style={{marginTop:50}}>
                        <TextInput
                            placeholder='William James'
                            placeholderTextColor={"white"}
                            style={{
                                width: "100%",
                                height: 42,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}
                        />
                        <TouchableOpacity style={{  width: 20, position: 'absolute', top: 10, height: 42, alignSelf: 'center',justifyContent:'center', right: 10, }}>
                            <PencilIcon2 style={{alignSelf:'center'}} color={acolors.primary} />
                        </TouchableOpacity>

                    </View>
                    <View >
                        <TextInput
                            placeholder='+1 998290 73829'
                            placeholderTextColor={"white"}
                            style={{
                                width: "100%",
                                height: 42,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}
                        />
                        <TouchableOpacity style={{  width: 20, position: 'absolute', top: 10, height: 42, alignSelf: 'center',justifyContent:'center', right: 10, }}>
                            <PencilIcon2 style={{alignSelf:'center'}} color={acolors.primary} />
                        </TouchableOpacity>

                    </View>
                   
                    <MainButton
                        text="Save"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { goBack(); }}
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

export default EditProfile
