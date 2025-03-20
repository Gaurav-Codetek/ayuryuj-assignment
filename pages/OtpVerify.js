import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseApp } from "../firebaseConfig";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PhoneAuth() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth(firebaseApp);
  const route = useRoute();
  const { phone } = route.params;
  const recaptchaVerifier = useRef(null);
  
  // References for each OTP input
  const inputRefs = useRef([]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const otpFadeAnim = useRef(new Animated.Value(0)).current;
  const otpSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  useEffect(() => {
    if (verificationId) {
      // Start OTP field animations
      Animated.parallel([
        Animated.timing(otpFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(otpSlideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
      
      // Start resend timer
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [verificationId]);

  const sendVerification = async () => {
    try {
      setLoading(true);
      const phoneNum = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNum, recaptchaVerifier.current);
      setVerificationId(confirmation.verificationId);
      setLoading(false);
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // In case of paste, handle multi-digit input
      const digits = value.split('').slice(0, 6);
      const newVerificationCode = [...verificationCode];
      
      digits.forEach((digit, digitIndex) => {
        if (index + digitIndex < 6) {
          newVerificationCode[index + digitIndex] = digit;
        }
      });
      
      setVerificationCode(newVerificationCode);
      
      // Focus last input or next appropriate input
      const nextFocusIndex = Math.min(index + digits.length, 5);
      if (nextFocusIndex < 6) {
        inputRefs.current[nextFocusIndex].focus();
      }
    } else {
      // Handle single digit input
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, e) => {
    // If backspace is pressed and current field is empty, focus previous field
    if (e.nativeEvent.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter all 6 digits");
      return;
    }
    
    try {
      setIsVerifying(true);
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      setIsVerifying(false);
      navigation.replace("user-registration"); // Navigate to your home screen
    } catch (error) {
      setIsVerifying(false);
      Alert.alert("Verification Failed", "The code you entered is invalid. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <LinearGradient
        colors={['#FFF3E2', '#FAF1E6', '#FFE3CA']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.topCircleDecoration} />
      <View style={styles.bottomCircleDecoration} />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#D98324" />
      </TouchableOpacity>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        {/* Invisible reCAPTCHA configuration */}
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseApp.options}
          attemptInvisibleVerification={true}
          title="Verify you're human"
          cancelLabel="Cancel"
        />
        
        <Animated.View 
          style={[
            styles.headerContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to
          </Text>
          <Text style={styles.phoneText}>+91 {phone}</Text>
        </Animated.View>

        {!verificationId ? (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={sendVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <>
            <Animated.Text 
              style={[
                styles.enterCodeText,
                {
                  opacity: otpFadeAnim,
                  transform: [{ translateY: otpSlideAnim }]
                }
              ]}
            >
              Enter 6-digit verification code
            </Animated.Text>
            
            <Animated.View 
              style={[
                styles.otpContainer,
                {
                  opacity: otpFadeAnim,
                  transform: [{ translateY: otpSlideAnim }]
                }
              ]}
            >
              {verificationCode.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : {},
                    digit && index === verificationCode.findIndex(d => d === "") - 1 ? styles.otpInputActive : {}
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={(e) => handleKeyPress(index, e)}
                  keyboardType="number-pad"
                  maxLength={6} // Allow pasting of full code
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </Animated.View>

            <Animated.View
              style={{
                opacity: otpFadeAnim,
                transform: [{ translateY: otpSlideAnim }]
              }}
            >
              <TouchableOpacity 
                style={[
                  styles.verifyButton,
                  verificationCode.join("").length === 6 ? styles.verifyButtonActive : {}
                ]} 
                onPress={verifyOtp}
                disabled={isVerifying || verificationCode.join("").length !== 6}
                activeOpacity={0.8}
              >
                {isVerifying ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
              
              <View style={styles.resendContainer}>
                <TouchableOpacity 
                  style={styles.resendButton} 
                  onPress={sendVerification}
                  disabled={loading || !canResend}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#D98324" />
                  ) : (
                    <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
                      Resend OTP {!canResend && `(${timer}s)`}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </Animated.View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF1E6",
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
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
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D98324",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#8B7E74",
    textAlign: "center",
    marginHorizontal: 30,
  },
  phoneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  enterCodeText: {
    fontSize: 16,
    color: "#8B7E74",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: width / 8,
    height: 60,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: "#E3CAA5",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: "#D98324",
    backgroundColor: "#FFF8EE",
  },
  otpInputActive: {
    borderColor: "#D98324",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  sendButton: {
    backgroundColor: "#D98324",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyButton: {
    backgroundColor: "#D98324",
    opacity: 0.7,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verifyButtonActive: {
    opacity: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  resendButton: {
    alignItems: "center",
    padding: 10,
  },
  resendText: {
    color: "#D98324",
    fontSize: 14,
    fontWeight: "500",
  },
  resendTextDisabled: {
    color: "#8B7E74",
  }
});