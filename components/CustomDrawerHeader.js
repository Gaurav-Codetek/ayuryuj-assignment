import '../gesture-handler';
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ title, navigation }){
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons name="menu" size={30} color="#FF9600" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.titleButton}>
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={24} color="#FF9600" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical:15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight-15 : 0,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleButton: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#F8EAD8',
    borderWidth: 1,
    borderColor: '#F1A661',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF9600',
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // backgroundColor: '#F8EAD8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#F1A661',
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 0,
  },
  profileSection: {
    padding: 16,
    backgroundColor: '#4A6FFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 44,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff'
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
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
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#333',
    fontWeight: '500',
  },
});