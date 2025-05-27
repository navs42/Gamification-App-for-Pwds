import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import registerUser from '../hooks/registerUser';
import { auth, db } from '../app/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';

export default function UserDetailsScreen() {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        district: '',
        city: '',
        pincode: '',
      });
      

  const handleChange = (key, value) => {
    setDetails({ ...details, [key]: value });
  };

  const handleSave = async () => {
    const { name, email, password, mobile, district, city, pincode } = details;
  
    if (!name || !email || !password || !mobile || !district || !city || !pincode) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      // 1. Register the user
      await registerUser(email, password, name);
  
      // 2. Save more user info
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'userDetails', user.uid), {
          mobile,
          district,
          city,
          pincode,
          createdAt: new Date(),
        });
        alert('Registration successful!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };
  return (
    <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.container}>
      <View style={styles.card}>
      <TextInput
  placeholder="Enter Name here"
  style={styles.input}
  onChangeText={(text) => handleChange('name', text)}
/>
<TextInput
  placeholder="Enter Email here"
  style={styles.input}
  keyboardType="email-address"
  onChangeText={(text) => handleChange('email', text)}
/>
<TextInput
  placeholder="Enter Password here"
  style={styles.input}
  secureTextEntry
  onChangeText={(text) => handleChange('password', text)}
/>


        <TextInput
          placeholder="Enter Mobile number here"
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange('mobile', text)}
        />
        <TextInput
          placeholder="Enter District here"
          style={styles.input}
          onChangeText={(text) => handleChange('district', text)}
        />
        <TextInput
          placeholder="Enter City here"
          style={styles.input}
          onChangeText={(text) => handleChange('city', text)}
        />
        <TextInput
          placeholder="Enter Pincode here"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => handleChange('pincode', text)}
        />

        <TouchableOpacity onPress={handleSave}>
          <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  logo: { width: 80, height: 80, marginBottom: 20 },
  input: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 160,
    marginTop: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
