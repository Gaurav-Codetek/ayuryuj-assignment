import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DoctorDetailsModal = ({ isVisible, onClose, doctor }) => {
  // If no doctor is passed, return null to prevent errors
  if (!doctor) return null;
  
  // Format availability for display
  const getAvailabilityText = (availability) => {
    switch(availability) {
      case 'today':
        return 'Available today';
      case 'tomorrow':
        return 'Available tomorrow';
      default:
        return `Available ${availability}`;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Doctor Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Doctor Info */}
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.doctorProfileSection}>
              <View style={styles.doctorImageLarge}>
                <Ionicons name="person" size={80} color="#9E7676" />
              </View>
              
              <View style={styles.doctorMainInfo}>
                <Text style={styles.doctorNameLarge}>{doctor.name}</Text>
                <Text style={styles.qualificationLarge}>{doctor.qualification}</Text>
                <Text style={styles.specializationLarge}>{doctor.specialization}</Text>
                
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <Ionicons name="business-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Hospital</Text>
                  <Text style={styles.infoValue}>{doctor.hospital}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{doctor.location}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Experience</Text>
                  <Text style={styles.infoValue}>{doctor.experience} years</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Availability</Text>
                  <Text style={styles.infoValue}>{getAvailabilityText(doctor.availability)}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="cash-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Consultation Fee</Text>
                  <Text style={styles.infoValue}>₹{doctor.price}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="chatbubble-outline" size={20} color="#3498db" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Languages</Text>
                  <Text style={styles.infoValue}>{doctor.languages.join(', ')}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>About Doctor</Text>
              <Text style={styles.descriptionText}>
                Dr. {doctor.name.split(' ').slice(1).join(' ')} is an experienced {doctor.specialization.toLowerCase()} with {doctor.experience} years of practice. 
                {doctor.gender === 'male' ? 'He' : 'She'} specializes in providing comprehensive healthcare services and has helped numerous patients throughout {doctor.gender === 'male' ? 'his' : 'her'} career.
                Currently practicing at {doctor.hospital} in {doctor.location}, {doctor.gender === 'male' ? 'he' : 'she'} is fluent in {doctor.languages.join(', ')}.
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.servicesSection}>
              <Text style={styles.sectionTitle}>Services</Text>
              <View style={styles.servicesList}>
                <View style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#3498db" />
                  <Text style={styles.serviceText}>Online Consultation</Text>
                </View>
                <View style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#3498db" />
                  <Text style={styles.serviceText}>Medical Prescriptions</Text>
                </View>
                <View style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#3498db" />
                  <Text style={styles.serviceText}>Follow-up Consultations</Text>
                </View>
                <View style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#3498db" />
                  <Text style={styles.serviceText}>Medical Certificates</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          
          {/* Action Button */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.consultNowButton}>
              <Text style={styles.consultNowButtonText}>Consult Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '90%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
  },
  doctorProfileSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  doctorImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  doctorMainInfo: {
    flex: 1,
  },
  doctorNameLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  qualificationLarge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  specializationLarge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  infoSection: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  servicesSection: {
    padding: 16,
    paddingBottom: 100, // Extra padding for scrolling
  },
  servicesList: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 8,
  },
  modalFooter: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  consultNowButton: {
    backgroundColor: '#FF7F50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  consultNowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default DoctorDetailsModal;