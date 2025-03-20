import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DoctorDetailsModal from '../modal/DoctorsDetail';

const ChooseDoctorScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeSortOption, setActiveSortOption] = useState('earliest');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showDoctorDetailsModal, setShowDoctorDetailsModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigation = useNavigation();

  // Original doctor data
  const doctorsData = [
    {
      id: 1,
      name: 'Dr. Avinash Vinnakota',
      qualification: 'MBBS',
      specialization: 'Physician',
      languages: ['English', 'Telugu'],
      experience: 12,
      price: 349,
      hospital: 'mfine Healthcare',
      location: 'HSR Layout, Bengaluru',
      additionalLanguages: 1,
      gender: 'male',
      availability: 'today',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Dr. Dheepak Chandra Kumar',
      qualification: 'MBBS, DEM',
      specialization: 'Physician',
      languages: ['Telugu', 'English'],
      experience: 13,
      price: 475,
      hospital: 'mfine Healthcare',
      location: 'HSR Layout, Bengaluru',
      additionalLanguages: 2,
      gender: 'male',
      availability: 'tomorrow',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      qualification: 'MBBS, MD',
      specialization: 'Dermatologist',
      languages: ['Hindi', 'English'],
      experience: 8,
      price: 599,
      hospital: 'Manipal Hospitals',
      location: 'Indiranagar, Bengaluru',
      additionalLanguages: 0,
      gender: 'female',
      availability: 'today',
      rating: 4.2
    },
    {
      id: 4,
      name: 'Dr. Rajesh Patel',
      qualification: 'MBBS, DNB',
      specialization: 'Cardiologist',
      languages: ['Gujarati', 'Hindi', 'English'],
      experience: 15,
      price: 850,
      hospital: 'Apollo Hospitals',
      location: 'Koramangala, Bengaluru',
      additionalLanguages: 1,
      gender: 'male',
      availability: 'in 2 days',
      rating: 4.9
    },
  ];

  // Filter options
  const filterOptions = [
    { id: 'availability', name: 'Availability', options: ['Today', 'Tomorrow', 'This Week'] },
    { id: 'gender', name: 'Gender', options: ['Male', 'Female'] },
    { id: 'experience', name: 'Experience', options: ['0-5 years', '5-10 years', '10+ years'] },
    { id: 'price', name: 'Consultation Fee', options: ['Below ₹300', '₹300-₹500', '₹500-₹1000', 'Above ₹1000'] },
    { id: 'rating', name: 'Rating', options: ['4.5 & above', '4.0 & above', '3.5 & above'] },
    { id: 'language', name: 'Languages', options: ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Gujarati'] },
  ];

  // Sort options
  const sortOptions = [
    { id: 'earliest', name: 'Earliest Available' },
    { id: 'experience', name: 'Experience (High to Low)' },
    { id: 'rating', name: 'Rating (High to Low)' },
    { id: 'price_low', name: 'Price (Low to High)' },
    { id: 'price_high', name: 'Price (High to Low)' },
  ];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...doctorsData];
    
    // Apply filters
    if (activeFilters.length > 0) {
      activeFilters.forEach(filter => {
        const [category, value] = filter.split(':');
        
        switch(category) {
          case 'availability':
            if (value === 'Today') {
              result = result.filter(doc => doc.availability === 'today');
            } else if (value === 'Tomorrow') {
              result = result.filter(doc => doc.availability === 'tomorrow');
            }
            break;
          case 'gender':
            result = result.filter(doc => doc.gender.toLowerCase() === value.toLowerCase());
            break;
          case 'experience':
            if (value === '0-5 years') {
              result = result.filter(doc => doc.experience < 5);
            } else if (value === '5-10 years') {
              result = result.filter(doc => doc.experience >= 5 && doc.experience <= 10);
            } else if (value === '10+ years') {
              result = result.filter(doc => doc.experience > 10);
            }
            break;
          case 'price':
            if (value === 'Below ₹300') {
              result = result.filter(doc => doc.price < 300);
            } else if (value === '₹300-₹500') {
              result = result.filter(doc => doc.price >= 300 && doc.price <= 500);
            } else if (value === '₹500-₹1000') {
              result = result.filter(doc => doc.price > 500 && doc.price <= 1000);
            } else if (value === 'Above ₹1000') {
              result = result.filter(doc => doc.price > 1000);
            }
            break;
          case 'rating':
            if (value === '4.5 & above') {
              result = result.filter(doc => doc.rating >= 4.5);
            } else if (value === '4.0 & above') {
              result = result.filter(doc => doc.rating >= 4.0);
            } else if (value === '3.5 & above') {
              result = result.filter(doc => doc.rating >= 3.5);
            }
            break;
          case 'language':
            result = result.filter(doc => 
              doc.languages.some(lang => lang.toLowerCase() === value.toLowerCase())
            );
            break;
        }
      });
    }
    
    // Apply search
    if (searchText) {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply sorting
    switch(activeSortOption) {
      case 'earliest':
        // Sort by availability (today first, then tomorrow, etc.)
        result.sort((a, b) => {
          const availabilityOrder = { 'today': 0, 'tomorrow': 1, 'in 2 days': 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        });
        break;
      case 'experience':
        result.sort((a, b) => b.experience - a.experience);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredDoctors(result);
  }, [searchText, activeFilters, activeSortOption]);

  const toggleFilter = (category, value) => {
    const filterKey = `${category}:${value}`;
    if (activeFilters.includes(filterKey)) {
      setActiveFilters(activeFilters.filter(f => f !== filterKey));
    } else {
      setActiveFilters([...activeFilters, filterKey]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const renderDoctorCard = (doctor) => (
    <View key={doctor.id} style={styles.doctorCard}>
      <View style={styles.doctorInfo}>
        <View style={styles.doctorImageContainer}>
          <View style={styles.doctorImage}>
            {/* Placeholder for doctor image */}
            <Ionicons name="person" size={60} color="#9E7676" />
          </View>
        </View>

        <View style={styles.doctorDetails}>
          <View style={styles.hospitalBadge}>
            <Ionicons name="medical" size={14} color="#3498db" />
            <Text style={styles.hospitalName}>{doctor.hospital}</Text>
          </View>
          <Text style={styles.hospitalLocation} numberOfLines={1}>
            {doctor.location}
          </Text>

          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.qualification}>{doctor.qualification}</Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>

          <View style={styles.languageContainer}>
            <Ionicons name="chatbubble-outline" size={14} color="#3498db" />
            <Text style={styles.language}>{doctor.languages.join(", ")}</Text>
            {doctor.additionalLanguages > 0 && (
              <View style={styles.additionalLangBadge}>
                <Text style={styles.additionalLangText}>
                  +{doctor.additionalLanguages}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.price}>₹{doctor.price}</Text>
        </View>
      </View>

      <View style={styles.experienceContainer}>
        <View style={styles.experienceBadge}>
          <Text style={styles.experienceText}>
            {doctor.experience} years exp
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => {
            setSelectedDoctor(doctor);
            setShowDoctorDetailsModal(true);
          }}
          style={styles.knowMoreButton}
        >
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#3498db"
          />
          <Text style={styles.knowMoreText}>Know more</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.consultButton}>
          <Text style={styles.consultButtonText}>Consult now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Filter Modal
  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilterModal}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {filterOptions.map((filterCategory) => (
              <View key={filterCategory.id} style={styles.filterCategory}>
                <Text style={styles.filterCategoryTitle}>{filterCategory.name}</Text>
                <View style={styles.filterOptions}>
                  {filterCategory.options.map((option) => {
                    const isActive = activeFilters.includes(`${filterCategory.id}:${option}`);
                    return (
                      <TouchableOpacity 
                        key={option} 
                        style={[styles.filterOption, isActive && styles.activeFilterOption]}
                        onPress={() => toggleFilter(filterCategory.id, option)}
                      >
                        <Text style={[styles.filterOptionText, isActive && styles.activeFilterOptionText]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Sort Modal
  const renderSortModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSortModal}
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.sortModalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sortOptions}>
            {sortOptions.map((option) => (
              <TouchableOpacity 
                key={option.id}
                style={styles.sortOption}
                onPress={() => {
                  setActiveSortOption(option.id);
                  setShowSortModal(false);
                }}
              >
                <Text style={[
                  styles.sortOptionText,
                  activeSortOption === option.id && styles.activeSortOptionText
                ]}>
                  {option.name}
                </Text>
                {activeSortOption === option.id && (
                  <Ionicons name="checkmark" size={20} color="#3498db" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF1E6" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#9E7676" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose your Doctor</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9E7676"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for: hospitals"
          placeholderTextColor="#9E7676"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.filterIconContainer}>
          <Ionicons name="add-circle-outline" size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => setSearchText("")}
        >
          <Ionicons name="close" size={20} color="#9E7676" />
        </TouchableOpacity>
      </View>

      <View style={styles.offersContainer}>
        <View style={styles.offerCard}>
          <View style={styles.offerIconContainer}>
            <Ionicons name="cash-outline" size={20} color="#3498db" />
          </View>
          <View style={styles.offerTextContainer}>
            <Text style={styles.offerTitle}>Upto Rs 250</Text>
            <Text style={styles.offerSubtitle}>
              cashback on Mobikwik wallet
            </Text>
          </View>
        </View>

        <View style={styles.offerCard}>
          <View style={styles.offerIconContainer}>
            <Ionicons name="cash-outline" size={20} color="#3498db" />
          </View>
          <View style={styles.offerTextContainer}>
            <Text style={styles.offerTitle}>Upto Rs 100</Text>
            <Text style={styles.offerSubtitle}>
              cashback on Mobikwik wallet
            </Text>
          </View>
        </View>
      </View>

      {/* Active filters display */}
      {/* {activeFilters.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.activeFiltersContainer}
          contentContainerStyle={styles.activeFiltersContent}
        >
          {activeFilters.map((filter) => {
            const [category, value] = filter.split(":");
            return (
              <TouchableOpacity
                key={filter}
                style={styles.activeFilterChip}
                onPress={() => toggleFilter(category, value)}
              >
                <Text style={styles.activeFilterText}>{value}</Text>
                <Ionicons name="close-circle" size={18} color="#666" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )} */}

      <View style={styles.sortHeaderContainer}>
        <Text style={styles.sectionTitle}>
          Showing {filteredDoctors.length}{" "}
          {filteredDoctors.length === 1 ? "doctor" : "doctors"}
        </Text>
        <Text style={styles.sortIndicator}>
          {sortOptions.find((opt) => opt.id === activeSortOption).name}
        </Text>
      </View>

      <ScrollView
        style={styles.doctorsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => renderDoctorCard(doctor))
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={60} color="#ccc" />
            <Text style={styles.noResultsText}>No doctors found</Text>
            <Text style={styles.noResultsSubtext}>
              Try changing your filters
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="options-outline" size={20} color="#3498db" />
          <Text style={styles.footerButtonText}>Filters</Text>
          {activeFilters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilters.length}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="filter-outline" size={20} color="#3498db" />
          <Text style={styles.footerButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <DoctorDetailsModal 
        isVisible={showDoctorDetailsModal}
        onClose={() => setShowDoctorDetailsModal(false)}
        doctor={selectedDoctor}
      />

      {renderFilterModal()}
      {renderSortModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterIconContainer: {
    marginRight: 8,
  },
  crossButton: {
    padding: 4,
  },
  offersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  offerCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '48%',
  },
  offerIconContainer: {
    marginRight: 8,
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  offerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  activeFiltersContainer: {
    marginBottom: 12,
    paddingHorizontal: 12,
    height:10
  },
  activeFiltersContent: {
    paddingVertical: 4,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FC',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    height:100
  },
  activeFilterText: {
    fontSize: 14,
    color: '#3498db',
    marginRight: 4,
  },
  sortHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sortIndicator: {
    fontSize: 14,
    color: '#3498db',
  },
  doctorsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  doctorInfo: {
    flexDirection: 'row',
  },
  doctorImageContainer: {
    marginRight: 16,
  },
  doctorImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  doctorDetails: {
    flex: 1,
  },
  hospitalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  hospitalName: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
    marginLeft: 4,
  },
  hospitalLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  qualification: {
    fontSize: 14,
    color: '#666',
  },
  specialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  language: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  additionalLangBadge: {
    backgroundColor: '#E8F4FC',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  additionalLangText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  experienceContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  experienceBadge: {
    backgroundColor: '#3498db',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  experienceText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  knowMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  knowMoreText: {
    color: '#3498db',
    fontSize: 14,
    marginLeft: 4,
  },
  consultButton: {
    backgroundColor: '#FF7F50',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  consultButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    color: '#3498db',
    marginLeft: 8,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  filterBadge: {
    backgroundColor: '#FF4D4D',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  filterBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '80%',
  },
  sortModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalBody: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  filterCategory: {
    marginBottom: 20,
  },
  filterCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterOption: {
    backgroundColor: '#E8F4FC',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterOptionText: {
    color: '#3498db',
    fontWeight: '500',
  },
  clearButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  sortOptions: {
    paddingVertical: 8,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  activeSortOptionText: {
    color: '#3498db',
    fontWeight: '500',
  }
});

export default ChooseDoctorScreen;