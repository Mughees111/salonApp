import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon, UnMarkedIcon, MarkedIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';

const PaymentMethod = () => {

    const [expandList, setExpandList] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState({
        visa: false,
        paypal: false,
        cashPayment: false
    })
    const prices = [
        "Fixed",
        "Starts at",
        "Varies",
        "Free",
        "Don’t Show"
    ];


    return (
        <View style={{ flex: 1, backgroundColor: '#111111' }}>
            <StatusBar
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header title="Add Payment Method" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'PMe', fontSize: 16, color: acolors.white }}>Please choose payment method</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('AddCardDetails')
                            setPaymentMethod({
                                ...paymentMethod,
                                visa: !paymentMethod.visa
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/visa.png')}
                        />
                        <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>VISA</Text>
                        <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>**********</Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.visa ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {

                            setPaymentMethod({
                                ...paymentMethod,
                                paypal: !paymentMethod.paypal
                            })
                            navigate('PaypalAccount')
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/paypal.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>Paypal</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>paypal</Text>
                        </View>
                        {/* <Text style={{ color: '#FCFCFC', fontFamily: 'AbRe', fontSize: 14, marginLeft: 10 }}>Debit/Credit Card</Text> */}
                        <View
                            style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.paypal ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigate('AppointBooked')
                            setPaymentMethod({
                                ...paymentMethod,
                                cashPayment: !paymentMethod.cashPayment
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/visa.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>Cash Payment</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>cash on services</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 15 }}>
                            {paymentMethod.cashPayment ? <MarkedIcon /> : <UnMarkedIcon />}
                        </View>
                    </TouchableOpacity>






                    <MainButton
                        text="+ Add Payment Method"
                        btnStyle={{ marginTop: 30 }}
                        onPress={() => { navigate('AddCardDetails') }}
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

export default PaymentMethod






