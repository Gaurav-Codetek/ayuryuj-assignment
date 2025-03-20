import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const {user, setUser} = useContext(UserContext);
  console.log(user);
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Sarah');
  const [upcomingAppointment, setUpcomingAppointment] = useState({
    doctor: 'Dr. Melissa Chen',
    specialty: 'Cardiologist',
    time: '10:30 AM',
    date: 'Today',
    image: require('../assets/images/doctor-profile.jpg'),
  });

  const fetchData = async()=>{
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      console.log("no user data");
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      const data = await AsyncStorage.getItem("userData");
      setUser(JSON.parse(data));
    }
    else {
      setUser(JSON.parse(userData));
      console.log("data is in cache")
    }
  }

  useEffect(() => {
        fetchData();

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const mainServices = [
    {
      id: 1,
      title: 'Consult a Doctor',
      description: 'Connect with specialists instantly',
      icon: 'stethoscope',
      color: ['#FF9800', '#FF5722'],
      screen: 'DoctorsList',
      iconType: 'font-awesome-5',
    },
    {
      id: 2,
      title: 'Book Tests',
      description: 'Lab tests & health checkups',
      icon: 'flask',
      color: ['#00BCD4', '#0097A7'],
      screen: 'BookTests',
      iconType: 'font-awesome-5',
    },
  ];

  const quickServices = [
    {
      id: 1,
      title: 'Medicines',
      icon: 'pills',
      screen: 'Medicine',
      iconType: 'font-awesome-5',
      color: '#FF9800',
    },
    {
      id: 2,
      title: 'Reminders',
      icon: 'bell',
      screen: 'Reminders',
      iconType: 'font-awesome',
      color: '#00BCD4',
    },
    {
      id: 3,
      title: 'Records',
      icon: 'folder-open',
      screen: 'MedicalRecords',
      iconType: 'font-awesome',
      color: '#4CAF50',
    },
    {
      id: 4,
      title: 'Insurance',
      icon: 'shield-alt',
      screen: 'Insurance',
      iconType: 'font-awesome-5',
      color: '#9C27B0',
    },
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Mindfulness for Stress Relief',
      category: 'Mental Health',
      image: require('../assets/images/doctor-profile.jpg'),
    },
    {
      id: 2,
      title: '5 Foods to Boost Immunity',
      category: 'Nutrition',
      image: require('../assets/images/doctor-profile.jpg'),
    },
  ];

  const renderIcon = (icon, iconType, color) => {
    if (iconType === 'font-awesome') {
      return <FontAwesome name={icon} size={24} color={color || 'white'} />;
    } else {
      return <FontAwesome5 name={icon} size={24} color={color || 'white'} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View> */}

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Health Stats Summary */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124/82</Text>
            <Text style={styles.statLabel}>Blood Pressure</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>Heart Rate</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98</Text>
            <Text style={styles.statLabel}>Overall Health</Text>
          </View>
        </View>

        {/* Main Services */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How can we help you today?</Text>
          <View style={styles.mainServicesContainer}>
            {mainServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.mainServiceCard}
                onPress={() => navigation.navigate(service.screen)}
              >
                <LinearGradient
                  colors={service.color}
                  style={styles.serviceIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {renderIcon(service.icon, service.iconType)}
                </LinearGradient>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Appointment */}
        {upcomingAppointment && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
            <TouchableOpacity 
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('AppointmentDetail')}
            >
              <View style={styles.appointmentInfo}>
                <View style={styles.appointmentTimeContainer}>
                  <Text style={styles.appointmentTime}>{upcomingAppointment.time}</Text>
                  <Text style={styles.appointmentDate}>{upcomingAppointment.date}</Text>
                </View>
                <View style={styles.appointmentDivider} />
                <View style={styles.doctorInfoContainer}>
                  <View style={styles.doctorRow}>
                    <View style={styles.doctorImageContainer}>
                      <Image source={upcomingAppointment.image} style={styles.doctorImage} />
                    </View>
                    <View style={styles.doctorTextContainer}>
                      <Text style={styles.doctorName}>{upcomingAppointment.doctor}</Text>
                      <Text style={styles.doctorSpecialty}>{upcomingAppointment.specialty}</Text>
                    </View>
                  </View>
                  <View style={styles.appointmentActions}>
                    <TouchableOpacity style={[styles.appointmentActionButton, styles.joinButton]}>
                      <FontAwesome5 name="video" size={16} color="white" />
                      <Text style={styles.joinButtonText}>Join Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rescheduleButton}>
                      <FontAwesome5 name="calendar-alt" size={16} color="#FF9800" />
                      <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Action Services */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Services</Text>
          <View style={styles.quickServicesContainer}>
            {quickServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.quickServiceItem}
                onPress={() => navigation.navigate(service.screen)}
              >
                <View style={[styles.quickServiceIcon, { backgroundColor: service.color + '20' }]}>
                  {renderIcon(service.icon, service.iconType, service.color)}
                </View>
                <Text style={styles.quickServiceTitle}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Tips */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health & Wellness Tips</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HealthArticles')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tipsContainer}
          >
            {healthTips.map((tip) => (
              <TouchableOpacity
                key={tip.id}
                style={styles.tipCard}
                onPress={() => navigation.navigate('ArticleDetail', { articleId: tip.id })}
              >
                <View style={styles.tipImageContainer}>
                  <Image source={tip.image} style={styles.tipImage} />
                  <View style={[styles.tipCategoryBadge, 
                    {backgroundColor: tip.id === 1 ? 'rgba(255, 152, 0, 0.9)' : 'rgba(0, 188, 212, 0.9)'}]}>
                    <Text style={styles.tipCategoryText}>{tip.category}</Text>
                  </View>
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#424242',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  mainServicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainServiceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: (width - 50) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 18,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentInfo: {
    flexDirection: 'row',
  },
  appointmentTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  appointmentDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  doctorInfoContainer: {
    flex: 1,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  doctorTextContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#757575',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  appointmentActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  joinButton: {
    backgroundColor: '#FF9800',
    flex: 1,
    marginRight: 8,
  },
  joinButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  rescheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF9800',
    flex: 1,
  },
  rescheduleButtonText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  quickServicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickServiceItem: {
    alignItems: 'center',
    width: (width - 60) / 4,
    marginBottom: 16,
  },
  quickServiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickServiceTitle: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'center',
  },
  tipsContainer: {
    paddingRight: 20,
  },
  tipCard: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tipImageContainer: {
    position: 'relative',
    height: 110,
  },
  tipImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tipCategoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tipCategoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#424242',
    padding: 12,
  },
});

export default HomeScreen;