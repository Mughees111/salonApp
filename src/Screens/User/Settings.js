import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Dimensions, Alert, ScrollView, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { goBack, navigate, navigateFromStack } from '../../../Navigations';
import { acolors } from '../../Components/AppColors';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';
import Reviews from '../../Components/Reviews';
import { PassIcon, ArrowForward } from '../../Components/Svgs';



const Settings = () => {

    const SettingView = ({ text, onPress, icon, navigateTo }) => {
        var Icon = icon
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateTo && navigate(navigateTo)

                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }
                }>
                <View style={styles.iconCircle}>
                    {Icon ? <Icon /> : null}
                </View>
                <Text style={styles.text}>{text}</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 5, }}>
                    <ArrowForward color="rgba(226, 179, 120, 0.05)" />
                </TouchableOpacity>
            </TouchableOpacity >
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: acolors.bgColor }}>
            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Header title="Settings" />
                    <TouchableOpacity onPress={() => navigate('ChangePass')} style={styles.containers}>
                        <SettingView
                            text="Change Password"
                            icon={PassIcon}
                            navigateTo="ChangePass"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    iconCircle: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34 / 2,
        backgroundColor: 'rgba(226, 179, 120, 0.05)'
    },
    text: {
        fontFamily: 'PRe',
        fontSize: 14,
        color: '#FFFFFF',
        marginLeft: 10
    },
    containers: {
        marginTop: 50,
        width: "100%",
        alignSelf: 'center',
        backgroundColor: '#1B1B1B', paddingBottom: 15, paddingHorizontal: 10,
    }
})



export default Settings
