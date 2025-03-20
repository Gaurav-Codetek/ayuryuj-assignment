import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SymptomsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const symptomsData = [
    { id: 1, name: 'Fever', icon: 'thermometer-outline' },
    { id: 2, name: 'Acne', icon: 'flame-outline' },
    { id: 3, name: 'Blocked Nose', icon: 'person-outline' },
    { id: 4, name: 'Runny nose', icon: 'water-outline' },
    { id: 5, name: 'Itching', icon: 'hand-left-outline' },
    { id: 6, name: 'Headache', icon: 'head-outline' },
    { id: 7, name: 'Vomiting', icon: 'medkit-outline' },
    { id: 8, name: 'Constipation', icon: 'medical-outline' },
    { id: 9, name: 'Dark circles', icon: 'eye-outline' },
    { id: 10, name: 'Loose motion/Diarrhea', icon: 'water-outline' },
    { id: 11, name: 'Heartburn', icon: 'heart-outline' },
    { id: 12, name: 'Cough', icon: 'mic-outline' },
    { id: 13, name: 'Hairfall', icon: 'cut-outline' },
    { id: 14, name: 'Abdominal pain', icon: 'body-outline' },
    { id: 15, name: 'Spots on skin', icon: 'scan-outline' },
    { id: 16, name: 'Obesity', icon: 'fitness-outline' },
  ];

  const SymptomItem = ({ name, icon }) => (
    <TouchableOpacity style={styles.symptomItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#9E7676" />
      </View>
      <Text style={styles.symptomText}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF1E6" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#9E7676" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptoms</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={22} color="#F1A661" />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.questionText}>What is your concern?</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9E7676" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for symptoms. e.g. fever"
            placeholderTextColor="#9E7676"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        
        <View style={styles.tabContainer}>
          <Text style={styles.activeTabText}>Most Selected Issues</Text>
          <View style={styles.activeLine} />
        </View>
        
        <ScrollView style={styles.symptomsList} showsVerticalScrollIndicator={false}>
          <View style={styles.symptomsGrid}>
            {symptomsData.map((symptom) => (
              <SymptomItem key={symptom.id} name={symptom.name} icon={symptom.icon} />
            ))}
          </View>
        </ScrollView>
        
        <TouchableOpacity onPress={()=>navigation.replace('doctors-list')} style={styles.doctorButton}>
          <Text style={styles.doctorButtonText}>Choose Doctor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8EAD8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1A661',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
    marginRight: 16,
  },
  activeLine: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 150,
    height: 2,
    backgroundColor: '#3498db',
  },
  symptomsList: {
    flex: 1,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  symptomItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8EAD8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  symptomText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  doctorButton: {
    backgroundColor: '#E38B29',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  doctorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SymptomsScreen;