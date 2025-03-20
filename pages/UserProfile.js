import React, { useEffect, useRef, useState, useContext } from "react";
import { 
  Animated,
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  StatusBar,
  Image,
  TouchableOpacity
} from "react-native";
import { IconButton, Provider as PaperProvider, Text, Avatar, Divider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { UserContext } from "../context/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const logo = require("../assets/images/ayuryujLogo.png");
const { width, height } = Dimensions.get('window');

export default function Profile() {
  const nav = useNavigation();
  const {user} = useContext(UserContext);

  
  // Animations
  const fadeAnimBackground = useRef(new Animated.Value(0)).current;
  const fadeAnimHeader = useRef(new Animated.Value(0)).current;
  const fadeAnimContent = useRef(new Animated.Value(0)).current;
  const translateYAnimContent = useRef(new Animated.Value(30)).current;

  // Sample user data
  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    age: 28,
    phoneNumber: "9876543210",
    dob: "12/08/1996",
    weight: "65 kg",
    height: "168 cm",
    bloodGroup: "O+",
    address: "123 Wellness Street, Bangalore, 560001",
    memberSince: "January 2025"
  });

  useEffect(() => {
    // Background fade in
    Animated.timing(fadeAnimBackground, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
    // Header fade in
    Animated.timing(fadeAnimHeader, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
    // Content fade and slide in
    Animated.parallel([
      Animated.timing(fadeAnimContent, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimContent, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleEditProfile = () => {
    nav.navigate("edit-profile");
  };

  return (
    <PaperProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { opacity: fadeAnimBackground },
          ]}
        >
          <LinearGradient
            colors={["#FFF3E2", "#FAF1E6", "#FFE3CA"]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>

        <View style={styles.topCircleDecoration} />
        <View style={styles.bottomCircleDecoration} />

        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnimHeader }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => nav.goBack()}>
              <IconButton icon="arrow-left" size={28} color="#D98324" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <IconButton icon="pencil" size={24} color="#D98324" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <Animated.View
            style={[
              styles.profileHeader,
              {
                opacity: fadeAnimContent,
                transform: [{ translateY: translateYAnimContent }],
              },
            ]}
          >
            <Avatar.Image
              size={100}
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Sessions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Attendance</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </Animated.View>

          {/* Profile Content */}
          <Animated.View
            style={[
              styles.profileContent,
              {
                opacity: fadeAnimContent,
                transform: [{ translateY: translateYAnimContent }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="phone" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Phone Number</Text>
                  <Text style={styles.infoValue}>
                    +91 {userData.phoneNumber}
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="cake-variant" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>
                    {userData.dob} ({userData.age} years)
                  </Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton
                    icon="human-male-height"
                    size={20}
                    color="#D98324"
                  />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Height</Text>
                  <Text style={styles.infoValue}>{userData.height}</Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="weight" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Weight</Text>
                  <Text style={styles.infoValue}>{userData.weight}</Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="water" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Blood Group</Text>
                  <Text style={styles.infoValue}>{userData.bloodGroup}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="map-marker" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Current Address</Text>
                  <Text style={styles.infoValue}>{userData.address}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <IconButton icon="account-clock" size={20} color="#D98324" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Member Since</Text>
                  <Text style={styles.infoValue}>{userData.memberSince}</Text>
                </View>
              </View>
            </View>

            {/* <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                console.log("HH")
                await signOut(auth);
                await AsyncStorage.removeItem("userData");
                nav.navigate("WelcomeScreen");
              }}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
              <IconButton icon="logout" size={20} color="#FFF" />
            </TouchableOpacity> */}
          </Animated.View>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF1E6",
  },
  topCircleDecoration: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(217, 131, 36, 0.1)',
    zIndex: -1,
  },
  bottomCircleDecoration: {
    position: 'absolute',
    bottom: -180,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(217, 131, 36, 0.1)',
    zIndex: -1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D98324',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#E3CAA5',
    borderWidth: 3,
    borderColor: '#FFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    color: '#8B7E74',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D98324',
  },
  statLabel: {
    fontSize: 12,
    color: '#8B7E74',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E3CAA5',
  },
  profileContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B7E74',
    marginTop: 20,
    marginBottom: 12,
    paddingLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  infoIconContainer: {
    marginRight: 8,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#8B7E74',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    backgroundColor: '#E3CAA5',
    height: 1,
    marginVertical: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D98324',
    borderRadius: 12,
    height: 56,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});