import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Switch } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, CameraIcon, PencilIcon, PencilIcon2 } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';
import { Header } from '../../Components/Header';



const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return React.useCallback(() => updateState({}), []);
}


const NotificationSettings = () => {

    const forceUpdate = useForceUpdate();
    const [data, setData] = useState([
        { on: true },
        { on: false },
        { on: false },
        { on: true },
        { on: false },
        { on: false },
    ])


    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar
                hidden={false}
                style='light'
            />

            <SafeAreaView style={{ marginTop: 35, width: "90%", alignSelf: 'center' }}>
                <Header title="Notification Setting" />


                <ScrollView contentContainerStyle={{paddingBottom:100}} style={{ marginTop: 50 }}>
                    {
                        data.map(((v, i) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#FCFCFC', width: "80%" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                                    <Switch
                                        trackColor={{ false: "white", true: 'grey' }}
                                        thumbColor={v.on ? acolors.primary : "grey"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => { 
                                            let arr = data
                                            arr[i].on = !v.on 
                                            setData(arr)
                                            forceUpdate();
                                        }}
                                        value={v.on}
                                    />
                                </View>
                            )
                        }))
                    }






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

export default NotificationSettings
