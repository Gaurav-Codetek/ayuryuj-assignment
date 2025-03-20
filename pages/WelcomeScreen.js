import React, { useEffect, useState } from "react";
import { 
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  Text, 
  Animated, 
  StatusBar,
  ActivityIndicator 
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

const logo = require("../assets/images/ayuryujLogo.png");
const { width, height } = Dimensions.get('window');

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  useEffect(() => {
    // Animation setup
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Fade out before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (user) {
          navigation.replace("Home");
        } else {
          navigation.replace("LoginScreen");
        }
      });
    }
  }, [user, loading, navigation]);

  if (loading) {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" />
        <LinearGradient
          colors={['#FFD8A9', '#FAF1E6', '#F8EAD8']}
          style={styles.container}
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Ayuryuj</Text>
            <Text style={styles.subtitle}>Your Health, Our Priority</Text>
            
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#F1A661" />
              <Text style={styles.loadingText}>Loading your wellness journey...</Text>
            </View>
          </Animated.View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Holistic Healthcare Solutions</Text>
          </View>
        </LinearGradient>
      </>
    );
  }

  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#E38B29',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#9E7676',
    marginBottom: 50,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9E7676',
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#9E7676',
    letterSpacing: 1,
  }
});