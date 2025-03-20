import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState, useContext } from "react";
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
  Image,
  ScrollView
} from "react-native";
import { IconButton, Provider as PaperProvider, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../context/userContext";

const logo = require("../assets/images/ayuryujLogo.png");
const { width, height } = Dimensions.get('window');

export default function Registration() {
  const { setUser } = useContext(UserContext);
  const nav = useNavigation();
  
  const fadeAnimImage = useRef(new Animated.Value(0)).current;
  const translateYAnimImage = useRef(new Animated.Value(50)).current;
  const fadeAnimText = useRef(new Animated.Value(0)).current;
  const translateYAnimText = useRef(new Animated.Value(20)).current;
  const fadeAnimForm = useRef(new Animated.Value(0)).current;
  const translateYAnimForm = useRef(new Animated.Value(30)).current;
  const fadeAnimSubtext = useRef(new Animated.Value(0)).current;
  const fadeAnimBackground = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    dob: new Date(),
  });

  useEffect(() => {
    Animated.timing(fadeAnimBackground, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.parallel([
      Animated.timing(fadeAnimImage, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimImage, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.stagger(250, [
        Animated.parallel([
          Animated.timing(fadeAnimText, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnimText, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        
        Animated.timing(fadeAnimSubtext, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        
        Animated.parallel([
          Animated.timing(fadeAnimForm, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnimForm, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  
  
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.age) {
      setUser(formData);
      nav.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
    
    const today = new Date();
    let calculatedAge = today.getFullYear() - currentDate.getFullYear();
    const m = today.getMonth() - currentDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < currentDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge.toString());
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const isFormValid = formData.name && formData.email && formData.age;

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
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>

            <Animated.Image
              source={logo}
              style={[
                styles.image,
                { opacity: fadeAnimImage, transform: [{ translateY: translateYAnimImage }] },
              ]}
              resizeMode="contain"
            />
            <Animated.Text
              style={[
                styles.tagline,
                { opacity: fadeAnimText, transform: [{ translateY: translateYAnimText }] },
              ]}
            >
              Create Your Profile
            </Animated.Text>
            
            <Animated.Text
              style={[
                styles.subtext,
                { opacity: fadeAnimSubtext },
              ]}
            >
              Tell us a bit about yourself to personalize your wellness journey
            </Animated.Text>
          </View>


          <Animated.View
            style={[
              styles.formWrapper,
              {
                opacity: fadeAnimForm,
                transform: [{ translateY: translateYAnimForm }],
              },
            ]}
          >

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={[styles.inputContainer, currentFocus === 'name' && styles.inputContainerFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(e)=>handleChange("name", e)}
                  onFocus={() => setCurrentFocus('name')}
                  onBlur={() => setCurrentFocus(null)}
                />
              </View>
            </View>

   
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[styles.inputContainer, currentFocus === 'email' && styles.inputContainerFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(e)=>handleChange("email", e)}
                  onFocus={() => setCurrentFocus('email')}
                  onBlur={() => setCurrentFocus(null)}
                />
              </View>
            </View>

         
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Age</Text>
              <View style={[styles.inputContainer, currentFocus === 'age' && styles.inputContainerFocused]}>
                <TextInput
                  style={styles.input}
                  placeholder="Your age"
                  keyboardType="numeric"
                  maxLength={3}
                  value={formData.age}
                  onChangeText={(e) => handleChange("age", e.replace(/[^0-9]/g, ""))}
                  onFocus={() => setCurrentFocus('age')}
                  onBlur={() => setCurrentFocus(null)}
                />
              </View>
            </View>

       
            {/* <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TouchableOpacity
                style={[styles.inputContainer, currentFocus === 'dob' && styles.inputContainerFocused]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={dob ? styles.dateText : styles.datePlaceholder}>
                  {dob ? formatDate(dob) : "Select your date of birth"}
                </Text>
                <IconButton icon="calendar" size={24} color="#D98324" />
              </TouchableOpacity>
            </View> */}

            {/* {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )} */}

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isFormValid}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Continue</Text>
              <IconButton icon="arrow-right" size={24} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={styles.termsText}>
              By continuing, you agree to our <Text style={styles.highlightText}>Terms of Service</Text> and <Text style={styles.highlightText}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF1E6",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop: 60,
    paddingBottom: 20,
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
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
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
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  formWrapper: {
    width: width - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#8B7E74",
    marginBottom: 10,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E3CAA5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
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
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: "#333",
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 16,
  },
  datePlaceholder: {
    flex: 1,
    fontSize: 16,
    color: "#999",
    paddingVertical: 16,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D98324",
    borderRadius: 12,
    height: 56,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#D9832480",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
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