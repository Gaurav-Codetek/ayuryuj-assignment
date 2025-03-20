import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { 
  Animated,
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { IconButton, Provider as PaperProvider, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const logo = require("../assets/images/ayuryujLogo.png");
const { width, height } = Dimensions.get('window');

export default function Login() {
  const nav = useNavigation();
  
  // Animations
  const fadeAnimImage = useRef(new Animated.Value(0)).current;
  const translateYAnimImage = useRef(new Animated.Value(50)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const translateYAnimText = useRef(new Animated.Value(20)).current;
  const fadeAnimInput = useRef(new Animated.Value(0)).current;
  const translateYAnimInput = useRef(new Animated.Value(30)).current;
  const fadeAnimSubtext = useRef(new Animated.Value(0)).current;
  const fadeAnimBackground = useRef(new Animated.Value(0)).current;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    // Background fade in
    Animated.timing(fadeAnimBackground, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Animate Logo
    Animated.parallel([
      Animated.timing(fadeAnimImage, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimImage, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After logo animation, animate the rest
      Animated.stagger(250, [
        Animated.parallel([
          Animated.timing(fadeAnimText, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnimText, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        
        Animated.timing(fadeAnimSubtext, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        
        Animated.parallel([
          Animated.timing(fadeAnimInput, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnimInput, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  const handleContinue = () => {
    if (phoneNumber.length === 10) {
      nav.navigate("otp-verify", {phone: phoneNumber});
    }
  };

  return (
    <PaperProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Animated.View 
          style={[
            StyleSheet.absoluteFillObject, 
            { opacity: fadeAnimBackground }
          ]}
        >
          <LinearGradient
            colors={['#FFF3E2', '#FAF1E6', '#FFE3CA']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        
        <View style={styles.topCircleDecoration} />
        <View style={styles.bottomCircleDecoration} />
        
        <View style={styles.contentContainer}>
          {/* Logo Animation */}
          <Animated.Image
            source={logo}
            style={[
              styles.image,
              { opacity: fadeAnimImage, transform: [{ translateY: translateYAnimImage }] },
            ]}
            resizeMode="contain"
          />

          {/* Welcome Text Animation */}
          <Animated.Text
            style={[
              styles.tagline,
              { opacity: fadeAnimText, transform: [{ translateY: translateYAnimText }] },
            ]}
          >
            Welcome to Ayuryuj
          </Animated.Text>
          
          {/* Subtext */}
          <Animated.Text
            style={[
              styles.subtext,
              { opacity: fadeAnimSubtext },
            ]}
          >
            Your journey to holistic wellness begins here
          </Animated.Text>
        </View>

        {/* Animated Input Field */}
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              opacity: fadeAnimInput,
              transform: [{ translateY: translateYAnimInput }],
            },
          ]}
        >
          <Text style={styles.inputLabel}>Enter your mobile number</Text>
          <View style={[styles.inputContainer, inputFocused && styles.inputContainerFocused]}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, "").slice(0, 10))}
              value={phoneNumber}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
            {phoneNumber.length === 10 && (
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <IconButton icon="arrow-right" size={24} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.highlightText}>Terms of Service</Text> and <Text style={styles.highlightText}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAF1E6",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 60,
  },
  topCircleDecoration: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(217, 131, 36, 0.1)',
  },
  bottomCircleDecoration: {
    position: 'absolute',
    bottom: -180,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(217, 131, 36, 0.1)',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  tagline: {
    fontSize: 28,
    color: "#D98324",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subtext: {
    fontSize: 16,
    color: "#9E7676",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  inputWrapper: {
    width: width - 40,
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8B7E74",
    marginBottom: 12,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E3CAA5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  inputContainerFocused: {
    borderColor: "#D98324",
    shadowOpacity: 0.2,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#E3CAA5",
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 18,
    color: "#333",
    paddingLeft: 10,
  },
  continueButton: {
    backgroundColor: "#D98324",
    borderRadius: 30,
    padding: 2,
  },
  termsText: {
    fontSize: 12,
    color: "#8B7E74",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
  highlightText: {
    color: "#D98324",
    fontWeight: "500",
  },
});