import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, PaypalIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';

const AddCardDetails = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 15, width: "90%", alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => goBack()}
                        style={{ width: 34, height: 34, borderRadius: 34 / 2, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Add Card Details</Text>
                    <Text>          </Text>
                </View>
                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
                        <Text style={{ marginTop: 3, fontFamily: 'PRe', fontSize: 16, color: acolors.white, }}>Log In to </Text>
                        <PaypalIcon />
                    </View>
                    <Image
                        style={{ marginTop: 15, width: "100%", resizeMode: 'contain' }}
                        source={require('../../assets/cardDetails.png')}
                    />
                    <CustomTextInput
                        placeholder="Name on Card"
                        style={{ marginTop: -10 }}
                    />

                    <CustomTextInput
                        placeholder="Card Number"
                        style={{ marginTop: 15, }}
                    />
                    <CustomTextInput
                        placeholder="CVC"
                        style={{ marginTop: 15, }}
                    />
                    <CustomTextInput
                        placeholder="Expiry date"
                        style={{ marginTop: 15, }}
                    />

                    <MainButton
                        text="Save & Continue Payment"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { navigate('AppointBooked') }}
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

export default AddCardDetails
