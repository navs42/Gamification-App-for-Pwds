import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseconfig';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login'); 
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Try again.');
    }
  };

  return (
    <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>PROFILE</Text>

        <Image source={require('../assets/images/profile.png')} style={styles.avatar} />

        <TouchableOpacity>
          <Text style={styles.updateText}>update ➤</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/appearance.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>APPEARANCE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => router.replace('/progress')}>
            <Image source={require('../assets/images/progress.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>PROGRESS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/badges.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>BADGES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image source={require('../assets/images/userguide.png')} style={styles.cardImage} />
            <Text style={styles.cardText}>USER GUIDE</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  updateText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 10,
    width: '47%',
    height: 150,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D0C9A',
    textAlign: 'center',
  },
  cardImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: {
    color: '#5D0C9A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
