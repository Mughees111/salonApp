import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import OnBoarding1 from './src/Screens/User/OnBoarding1';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnBoarding2 from './src/Screens/User/OnBoarding2';
import { navigationRef } from './Navigations';
import OnBoarding3 from './src/Screens/User/onBoarding3';
import SignUp from './src/Screens/User/SignUp';
import OTP from './src/Screens/User/OTP';
import SignIn from './src/Screens/User/SignIn';
import ForgetPass from './src/Screens/User/ForgetPass';
import ForgetPassOpt from './src/Screens/User/ForgetPassOpt';
import NewPass from './src/Screens/User/NewPass';

const OnBoarding = createMaterialTopTabNavigator()
const Stack = createStackNavigator()


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

export default function App() {


  const [loaded] = useFonts({
    PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PLi: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    PBl: require('./assets/fonts/Poppins/Poppins-Black.ttf'),

  })

  if(!loaded) return null

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="OnBoardingStack" component={OnBoardingTabs} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
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
