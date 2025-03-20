import React, { useState } from "react";
import { View, TouchableOpacity, Dimensions, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, withSpring, withTiming, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const tabIcons = [
  { iconName: "home", label: "Home", nav: "Home" },
  { iconName: "search", label: "Search", nav: "Search" },
  { iconName: "stethoscope", label: "Consult now", nav: "doctors-list", isSpecial: true },
  { iconName: "shopping-bag", label: "Orders", nav: "MyOrders" },
  { iconName: "user", label: "Profile", nav: "Profile" }
];

export default function Tab() {
  const [activeTab, setActiveTab] = useState("Home");
  const insets = useSafeAreaInsets();
  const animatedTabValues = tabIcons.map(() => useSharedValue(0));
  const navigation = useNavigation();

  const handlePress = (navScreen, index) => {
    // Reset all animations
    // animatedTabValues.forEach((value, i) => {
    //   if (i !== index) value.value = withTiming(0);
    // });
    // console.log(navScreen);
    
    // Animate the pressed tab
    // animatedTabValues[index].value = withSpring(1, {
    //   damping: 10,
    //   stiffness: 100
    // });
    
    // setActiveTab(navScreen);
    navigation.navigate(navScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.tabContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <View style={styles.tabBackgroundGradient}>
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
            style={styles.gradient}
          />
        </View>
        
        <View style={styles.tabContentContainer}>
          {tabIcons.map((item, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              return {
                transform: [
                  { scale: withSpring(item.isSpecial ? 1 : 0.95 + animatedTabValues[index].value * 0.15) },
                  { translateY: withSpring(item.isSpecial ? 0 : animatedTabValues[index].value * -10) }
                ]
              };
            });

            const isActive = activeTab === item.nav;
            
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(item.nav, index)}
                activeOpacity={0.7}
                style={[
                  styles.iconContainer,
                  item.isSpecial && styles.specialIconContainer
                ]}
              >
                {item.isSpecial ? (
                  <>
                  <Animated.View style={[styles.stethoscopeShadow, animatedStyle]}>
                    <LinearGradient
                      colors={['#FF9800', '#FF5722']}
                      style={styles.stethoscopeIcon}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <FontAwesome name={item.iconName} size={24} color="white" />
                    </LinearGradient>
                  </Animated.View>
                  <Text
                  style={[
                    styles.label,
                    isActive && styles.activeLabel
                  ]}
                >
                  {item.label}
                </Text>
                </>
                ) : (
                  <Animated.View style={[styles.regularIconContainer, animatedStyle]}>
                    <View style={isActive ? styles.activeIconBackground : null}>
                      <FontAwesome
                        name={item.iconName}
                        size={22}
                        color={isActive ? "#FF9800" : "#666"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.label,
                        isActive && styles.activeLabel
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Animated.View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContainer: {
    width: Dimensions.get("window").width,
    height: 80,
    position: "relative",
  },
  tabContentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
  },
  tabBackgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  regularIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
  },
  specialIconContainer: {
    justifyContent: "flex-start",
    paddingTop: 0,
    marginTop: -25,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
    textAlign: "center",
  },
  activeLabel: {
    color: "#FF9800",
    fontWeight: "700",
  },
  activeIconBackground: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  stethoscopeShadow: {
    backgroundColor: "white",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    padding: 4,
  },
  stethoscopeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});