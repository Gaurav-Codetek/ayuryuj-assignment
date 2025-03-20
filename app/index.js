import '../gesture-handler';
import React from "react";
import { StyleSheet, StatusBar, Platform, TouchableOpacity, View, Text, LogBox } from 'react-native';
import Tab from "../components/BottomTab";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AuthStatus from '../pages/WelcomeScreen';
import PhoneAuth from '../pages/OtpVerify';
import SymptomsScreen from '../pages/Search';
import ChooseDoctorScreen from '../pages/DoctorsList';
import Registration from '../pages/userRegistration';
import Profile from '../pages/UserProfile';
import CustomDrawerContent from '../components/CustomDrawer';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomDrawerHeader';
import { UserProvider } from '../context/userContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Main App Navigator with custom drawer and header
function MainAppNavigator() {
  const navigation = useNavigation();
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: ({ navigation, route }) => (
            <CustomHeader title="Ayuryuj" navigation={navigation} />
          ),
          headerStatusBarHeight: 0,
          drawerStyle: {
            backgroundColor: "#fff",
            width: 280,
          },
          drawerType: "front",
          overlayColor: "rgba(0,0,0,0.7)",
          sceneContainerStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={Home}
        />
      </Drawer.Navigator>
      <Tab />
    </>
  );
}

// Auth Navigator
function AuthNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={AuthStatus} />
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="otp-verify" component={PhoneAuth} />
      <Stack.Screen name="Home" component={MainAppNavigator} />
      <Stack.Screen name="Search" component={SymptomsScreen} />
      <Stack.Screen name="doctors-list" component={ChooseDoctorScreen} />
      <Stack.Screen name="user-registration" component={Registration} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default function Index() {
  LogBox.ignoreAllLogs();
  return (
    <UserProvider>
    <NavigationIndependentTree>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </NavigationIndependentTree>
    </UserProvider>
  );
}