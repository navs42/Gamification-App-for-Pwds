import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const organizations = [
  {
    name: 'Helping Hands Foundation',
    eligibility: 'Children with diagnosed cerebral palsy below 18 years',
    support: 'Provides up to ₹50,000 for therapy and assistive devices',
    contact: 'helpinghands@example.com',
    phone: '+919812345678',
    help: 'Covers physiotherapy, speech therapy, and home-based rehabilitation support.',
  },
  {
    name: 'CP Support Trust',
    eligibility: 'Any CP patient with income less than ₹2,00,000 per annum',
    support: 'Covers medical and educational costs up to ₹70,000',
    contact: 'supportcp@example.com',
    phone: '+918876543210',
    help: 'Funds mobility equipment, school fees, and hospital visits.',
  },
  {
    name: 'Smile Foundation for CP',
    eligibility: 'CP patients registered with a government ID',
    support: 'Offers scholarships and hospital fee reimbursements',
    contact: 'smilecp@example.com',
    phone: '+919999887766',
    help: 'Enables children to attend therapy sessions regularly.',
  },
  {
    name: 'Hope in Motion',
    eligibility: 'Children with CP aged 3–12 from rural backgrounds',
    support: 'Provides ₹25,000–₹40,000 per year',
    contact: 'hope@example.com',
    phone: '+917700112233',
    help: 'Funds basic medical support and caregiver training.',
  },
];

export default function TrustOrganizations() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Supportive Trust Organizations for CP Patients</Text>
      {organizations.map((org, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.orgName}>{org.name}</Text>
          <Text style={styles.label}>Eligibility:</Text>
          <Text style={styles.detail}>{org.eligibility}</Text>
          <Text style={styles.label}>Support Provided:</Text>
          <Text style={styles.detail}>{org.support}</Text>
          <Text style={styles.label}>How They Help:</Text>
          <Text style={styles.detail}>{org.help}</Text>

          <View style={styles.contactRow}>
            <TouchableOpacity 
              onPress={() => Linking.openURL(`tel:${org.phone}`)} 
              style={styles.iconButton}
            >
              <FontAwesome name="phone" size={24} color="green" />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Linking.openURL(`mailto:${org.contact}`)} 
              style={styles.iconButton}
            >
              <FontAwesome name="envelope" size={24} color="blue" />
              <Text style={styles.iconText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f5f0ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4b0082',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  orgName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  detail: {
    marginBottom: 5,
    color: '#555',
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
