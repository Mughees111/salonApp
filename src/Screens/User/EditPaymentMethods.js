import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowDown, ArrowLeft, ArrowRight, CloseDropDown, FbIcon, GoogleIcon, UnMarkedIcon, MarkedIcon, PencilIcon, TrashIcon } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';

const EditPaymentMethod = () => {

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
                hidden={false}
                style="light"
                backgroundColor="#111111"
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header title="Payment Method" />
                <ScrollView>
                    <Text style={{ marginTop: 30, fontFamily: 'PRe', fontSize: 16, color: acolors.white }}>Here are your payment methods</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                visa: !paymentMethod.visa
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/visa.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>VISA</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>**********</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', }}>
                                <PencilIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <TrashIcon />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                paypal: !paymentMethod.paypal
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/paypal.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>PayPal</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>**********</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 15, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', }}>
                                <PencilIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                <TrashIcon />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod({
                                ...paymentMethod,
                                cashPayment: !paymentMethod.cashPayment
                            })
                        }}
                        style={{ width: "100%", height: 76, flexDirection: 'row', paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1B1B1B', marginTop: 15 }}>
                        <Image
                            source={require('../../assets/cashPayment.png')}
                        />
                        <View>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 14, marginLeft: 10 }}>Cash Payment</Text>
                            <Text style={{ color: '#FCFCFC', fontFamily: 'PRe', fontSize: 12, marginLeft: 10, marginTop: 5 }}>cash on services</Text>
                        </View>

                    </TouchableOpacity>
                    <MainButton
                        text="+ Add Card"
                        btnStyle={{ marginTop: 50 }}
                        onPress={() => { navigate('EditPayPalDetails') }}
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

export default EditPaymentMethod
