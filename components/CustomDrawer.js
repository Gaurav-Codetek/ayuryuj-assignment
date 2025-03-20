import '../gesture-handler';
import React, {useContext} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { UserContext } from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const logo = require("../assets/images/ayuryujLogo.png");

export default function CustomDrawerContent(props) {
    const { user } = useContext(UserContext);
  const navigation = useNavigation();
  
  // Example user data - replace with your actual user data source
  const userData = {
    name: user.name,
    email: user.email,
    avatar: require('../assets/images/doctor-profile.jpg'), // Replace with your actual image path
  };

  // Navigation items with icons
  const menuItems = [
    { 
      name: 'Home',
      onPress: () => navigation.navigate('Home'),
      icon: <Ionicons name="home-outline" size={22} color="#FF9600" />
    },
    { 
      name: 'Search Symptoms',
      onPress: () => navigation.navigate('Search'),
      icon: <Ionicons name="search-outline" size={22} color="#FF9600" />
    },
    { 
      name: 'Find Doctors',
      onPress: () => navigation.navigate('doctors-list'),
      icon: <FontAwesome5 name="user-md" size={20} color="#FF9600" />
    },
    { 
      name: 'My Profile',
      onPress: () => navigation.navigate('Profile'),
      icon: <Ionicons name="person-outline" size={22} color="#FF9600" />
    },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image source={userData.avatar} style={styles.avatar} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>
      
      <View style={styles.separator} />

      {/* Menu Items */}
      <View style={styles.menuItems}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem} 
            onPress={item.onPress}
          >
            <View style={styles.iconContainer}>
              {item.icon}
            </View>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.separator} />

      {/* Logout Section */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={async() => {
            await signOut(auth);
            await AsyncStorage.removeItem('userData');
            navigation.navigate('WelcomeScreen');
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#FF9600" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  logoContainer: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 44,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9600',
    marginTop: 5,
  },
  profileSection: {
    padding: 16,
    backgroundColor: '#F8EAD8',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1A661',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F1A661'
  },
  userName: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8EAD8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F1A661',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#F8EAD8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1A661',
  },
  logoutText: {
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  }
});