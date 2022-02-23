import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import OnBoarding1 from './src/Screens/User/OnBoarding1';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import OnBoarding2 from './src/Screens/User/OnBoarding2';
import { navigationRef } from './Navigations';
import OnBoarding3 from './src/Screens/User/onBoarding3';
import SignUp from './src/Screens/User/SignUp';
import OTP from './src/Screens/User/OTP';
import SignIn from './src/Screens/User/SignIn';
import ForgetPass from './src/Screens/User/ForgetPass';
import ForgetPassOpt from './src/Screens/User/ForgetPassOpt';
import NewPass from './src/Screens/User/NewPass';
import { HomeBtmIcon, ProfileBtmIcon, LocationBtmIcon, ScheduleAppBtmIcon, SettingsIcon } from './src/Components/Svgs';
import Home from './src/Screens/User/Home';
import SearchScreen from './src/Screens/User/Search';
import SalonDetails from './src/Screens/User/SalonDetails';
import SeeAllServices from './src/Screens/User/SeeAllServices';
import AllReviews from './src/Screens/User/AllReviews';
import BookAppointment from './src/Screens/User/BookAppointment';
import AppointBooked from './src/Screens/User/AppointBooked';
import Categories from './src/Screens/User/Categories';
import Notifications from './src/Screens/User/Notifications';
import PaymentMethod from './src/Screens/User/PaymentMethod';
import EditPayPalDetails from './src/Screens/User/EditPaypalDetails';
import PaypalAccount from './src/Screens/User/PaypalAccount';
import AddCardDetails from './src/Screens/User/AddCardDetails';
import AppointSchedule from './src/Screens/User/AppointSchedule';
import CancellationPolicy from './src/Screens/User/CancellationPolicy';
import UnderDevelopment from './src/Screens/User/UnderDevelopment';
import NearBy from './src/Screens/User/NearBy';

import EditPaymentMethod from './src/Screens/User/EditPaymentMethods';
import UserScreen from './src/Screens/User/UserScreen';
import EditProfile from './src/Screens/User/EditProfile';
import TermsOfServices from './src/Screens/User/TermsOfServices';
import Settings from './src/Screens/User/Settings';
import ChangePass from './src/Screens/User/ChangePass';
import NotificationSettings from './src/Screens/User/NotificationSettings';
import Favourites from './src/Screens/User/Favourite';

import { doConsole, retrieveItem, storeItem, getParamFromURL } from "./src/utils/functions";
import DropdownAlert from "react-native-dropdownalert";
import { alertmsg, changeLoggedIn, loggedInObservable, navigateToPostNow, showmsg } from './Common';
import { urls } from './src/utils/Api_urls';
import { Provider } from './src/Context/DataContext';

import * as Device from 'expo-device';
import UserChat from './src/Screens/User/UserChat';
import ChatDetails from './src/Screens/User/ChatDetails';
import DelAccount from './src/Screens/User/DelAccount';
import HealthSafety from './src/Screens/User/HealthSafety';

const OnBoarding = createMaterialTopTabNavigator()
const Stack = createStackNavigator()
const BottomTabs = createMaterialBottomTabNavigator();


function OnBoardingTabs() {
  return (
    <OnBoarding.Navigator
      tabBar={() => null}
      tabBarOptions={{
        headerShown: true

      }}
    >
      <OnBoarding.Screen name="OnBoarding1" component={OnBoarding1} />
      <OnBoarding.Screen name="OnBoarding2" component={OnBoarding2} />
      <OnBoarding.Screen name="OnBoarding3" component={OnBoarding3} />
    </OnBoarding.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="ForgetPassOpt" component={ForgetPassOpt} />
      <Stack.Screen name="NewPass" component={NewPass} />
    </Stack.Navigator>
  )

}


function UserChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserChat" component={UserChat} />
      <Stack.Screen name="ChatDetails" component={ChatDetails} />
    </Stack.Navigator>
  )
}


function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SalonDetails" component={SalonDetails} />
      <Stack.Screen name="SeeAllServices" component={SeeAllServices} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="AppointBooked" component={AppointBooked} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaypalAccount" component={PaypalAccount} />
      <Stack.Screen name="EditPayPalDetails" component={EditPayPalDetails} />
      <Stack.Screen name="AddCardDetails" component={AddCardDetails} />

      <Stack.Screen name="UserChatNavigator" component={UserChatNavigator} />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="EditPaymentMethod" component={EditPaymentMethod} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="ForgetPassOpt" component={ForgetPassOpt} />
      <Stack.Screen name="NewPass" component={NewPass} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
    </Stack.Navigator>
  )
}

function AppintmentsStack() {
  return <Stack.Navigator screenOptions={{ headerShown: false }} >
    <Stack.Screen name='AppointSchedule' component={AppointSchedule} />
    <Stack.Screen name="SeeAllServices" component={SeeAllServices} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} />
    <Stack.Screen name="AppointBooked" component={AppointBooked} />
    <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
  </Stack.Navigator >
}

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator
      inactiveColor="rgba(255, 255, 255, 0.5)"
      activeColor="#E2B378"
      barStyle={{
        backgroundColor: '#1D1D1D'
      }}
      shifting={false}
    // labeled={false}
    >
      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <HomeBtmIcon color={color} />
          )
        }}
        name="HomeStack" component={HomeStack} />


      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <LocationBtmIcon color={color} />
          )
        }}
        name="NearBy" component={NearBy} />

      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <ScheduleAppBtmIcon color={color} />
          )
        }}
        name="Resturent" component={AppintmentsStack} />

      <BottomTabs.Screen
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <ProfileBtmIcon color={color} />
          )
        }}
        name="ProfileStack" component={SettingsStack} />

    </BottomTabs.Navigator>
  )
}


const useForceUpdate = () => {
  const [, updateState] = React.useState();
  return React.useCallback(() => updateState({}), []);
}


export default function App() {


  const forceUpdate = useForceUpdate();

  const [loggedIn, setLoggedIn] = useState(0)
  const [loaded] = useFonts({
    PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PLi: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    PBl: require('./assets/fonts/Poppins/Poppins-Black.ttf'),

  })


  const checkWithServer = (data) => {
    if (data) var token = data.token;
    else var token = "khali";
    var body_data = {
      token: token,
      // device_model: Device?.modelName ? Device?.modelName : null,
      // device_manufactur: Device?.manufacturer ? Device?.manufacturer : null,
    };
    doConsole(" I request @ " + urls.API + "check_login");
    doConsole(body_data);
    fetch(urls.API + 'check_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        doConsole(" I receive ");
        doConsole(responseJson);
        if (responseJson.action == "success") {
          storeItem("login_data", responseJson.data).then(() => {
            setLoggedIn(1)
            forceUpdate()
          });
        }
        else {
          setLoggedIn(2)
          forceUpdate()
        }

      }).catch((error) => {
        setLoggedIn(2)
        forceUpdate()
      });

  }

  function checkLoggedIn() {
    retrieveItem("login_data").then((data) => {
      if (data) {
        console.log(data)
        checkWithServer(data)
      }
      else {
        setLoggedIn(2)
      }
      forceUpdate();
    })
  }


  useEffect(() => {
    checkLogin()
  }, [])


  function checkLogin() {
    console.log("ever came here")
    checkLoggedIn()
    loggedInObservable.subscribe((v) => {
      console.log("Yessss won the warrrrr");
      console.log(v)
      console.log(v)
      setLoggedIn(v)
    })
  }




  if (!loaded) return null

  return (
    <Provider>
      <NavigationContainer
        ref={navigationRef}
      >
        {/* <Stack.Navigator screenOptions={{ headerShown: false }} > */}
        {
          loggedIn == 2 &&
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="OnBoardingStack" component={OnBoardingTabs} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </Stack.Navigator>
        }
        {
          loggedIn == 1 &&
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
            <Stack.Screen name="CancellationPolicy" component={CancellationPolicy} />
            <Stack.Screen name="TermsOfServices" component={TermsOfServices} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="DelAccount" component={DelAccount} />
            <Stack.Screen name="HealthSafety" component={HealthSafety} />
          </Stack.Navigator>
        }
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
