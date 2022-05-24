import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { goBack, navigate } from '../../../Navigations';
import { ArrowRight, FbIcon, GoogleIcon, ArrowLeft, CameraIcon, PencilIcon, PencilIcon2 } from '../../Components/Svgs';
import { acolors } from '../../Components/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../../Components/CustomTextInput';
import PrivacyPicker from '../../Components/PrivacyPicker';
import { MainButton } from '../../Components/Buttons';

import { Ionicons } from '@expo/vector-icons';



import { apiRequest } from '../../utils/apiCalls';
import { retrieveItem, useForceUpdate, doConsole, update_dp, update_dp_2, storeItem, validateEmail } from '../../utils/functions';
import Loader from '../../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Context } from '../../Context/DataContext';
import { changeLoggedIn } from '../../../Common';

var alertRef

const DelAccount = (props) => {

    const forceUpdate = useForceUpdate();
    const { state, setUserGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const userData = state.userData;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('')



    function doDel() {
        const reqObj = {
            email,
            password,
            token: userData?.token,
            reason,
            description
        }
        if (!validateEmail(email)) {
            alertRef.alertWithType('error', "Error", "Please enter a valid email")
            return
        }
        if (!password.length) {
            alertRef.alertWithType('error', "Error", "Please enter a valid password")
            return
        }
        if (!reason.length) {
            alertRef.alertWithType('error', "Error", "Please enter a valid reason")
            return
        }
        if (!description.length) {
            alertRef.alertWithType('error', "Error", "Please enter a valid Description")
            return
        }

        setLoading(true)
        apiRequest(reqObj, 'delete_user_account')
            .then(data => {
                setLoading(false)
                if (data.action == 'success') {
                    props.navigation.popToTop();
                    // storeItem('login_data', '')
                    // changeLoggedIn.changeNow(2);
                }
                else alertRef.alertWithType('error', "Error", data.error);
            })
            .catch(err => {
                setLoading(false)
            })
    }





    const Header = ({ title }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#F9F2BC' }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'PBo', fontSize: 16, color: acolors.white }}>Delete User</Text>
                <TouchableOpacity
                    onPress={() => doDel()}
                >
                    <Text style={{ fontFamily: 'PMe', fontSize: 14, color: '#F9F2BC' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {loading && <Loader />}
            <DropdownAlert ref={(ref) => alertRef = ref} />

            <StatusBar
                style='light'
                backgroundColor={acolors.bgColor}
                translucent={false}
            />

            <SafeAreaView style={{ marginTop: 10, width: "90%", alignSelf: 'center' }}>
                <Header />

                <View style={{ marginTop: 20, alignSelf: 'center', width: "100%" }}>
                    <View style={{ width: "100%", backgroundColor: "#222222", borderRadius: 2, paddingVertical: 20, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name='ios-warning-sharp' color={"red"} size={24} />
                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: 'white', marginLeft: 10, flexWrap: 'wrap', width: "90%" }}>You are about to delete your account</Text>
                        </View>
                        <Text style={{ fontFamily: 'PMe', fontSize: 11, color: 'rgba(255,255,255,0.4)', flexWrap: 'wrap', marginTop: 10, width: "100%" }}>We are sad to see you go! Please make sure you have no outstanding appointments before deleteing your account. Any Appointments previously booked with Mobile Pay may still be processed after your account is deleted.</Text>

                    </View>
                </View>
                <ScrollView>

                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: acolors.white, marginTop: 12 }}>Verfication</Text>
                    <View style={{ marginTop: 2, width: "100%", backgroundColor: '#222222', }}>
                        <TextInput
                            placeholder='Email'
                            // value={username}
                            onChangeText={setEmail}
                            placeholderTextColor={"rgba(255,255,255,0.4)"}
                            style={{
                                width: "98%",
                                alignSelf: 'center',
                                height: 45,
                                // borderRadius: 3,
                                // borderWidth: 1,
                                borderBottomWidth: 0.5,
                                // borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,

                            }}
                        />
                        <TextInput
                            placeholder='Password'
                            // value={username}
                            onChangeText={setPassword}
                            placeholderTextColor={"rgba(255,255,255,0.4)"}
                            style={{
                                width: "100%",
                                height: 45,
                                // borderRadius: 3,
                                // borderWidth: 1,

                                // borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                                marginTop: -1
                            }}
                        />
                    </View>

                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: acolors.white, marginTop: 12 }}>Additional Information</Text>
                    <View style={{ marginTop: 2, width: "100%", backgroundColor: '#222222', }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 10, color: '#F9F2BC', textTransform: 'uppercase', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>Please select a reason for leaving</Text>

                        <View style={{ width: "100%", borderBottomWidth: 0.5 }}>
                            <PrivacyPicker
                                selected={{ title: "Select" }}
                                data={[
                                    { title: "I signed as the wrong user type" },
                                    { title: "Not Enough Features" },
                                    { title: "I am using another service" },
                                    { title: "My shop doesn't allow it" },
                                    { title: "I am no longer barbering" },
                                    { title: "The price for PRO is too high" },
                                ]}
                                onValueChange={(index, title) => {
                                    setReason(title.title)
                                }}

                            />
                        </View>
                        <TextInput
                            placeholder='Description'
                            // value={username}
                            onChangeText={setDescription}
                            placeholderTextColor={"rgba(255,255,255,0.4)"}
                            textAlignVertical='top'
                            style={{
                                width: "100%",
                                height: 70,
                                marginTop: 5,
                                // borderRadius: 3,
                                // borderWidth: 1,

                                // borderColor: acolors.white,
                                color: acolors.white,
                                fontFamily: 'PRe',
                                fontSize: 14,
                                paddingHorizontal: 10,
                            }}
                        />
                    </View>



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

export default DelAccount
