import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';

export default function HomeScreen() {
  const sound = useRef();

  const playAlarm = async () => {
    try {
      const { sound: alarmSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/alarm.mp3')
      );
      sound.current = alarmSound;
      await sound.current.playAsync();

      
      setTimeout(async () => {
        if (sound.current) {
          await sound.current.stopAsync();
          await sound.current.unloadAsync(); 
          sound.current = null;
        }
      }, 10000); 

    } catch (error) {
      console.log('Error playing sound', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={{ marginRight: 30 }}>
            <Text style={styles.hello}>Hello 👋</Text>
            <Text style={styles.name}>Welcome Back!</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/gamescreen')}>
          <Image source={require('../assets/images/game.jpg')} style={styles.cardImage} />
          <Text style={styles.cardCategory}>Cognitive Skills</Text>
          <Text style={styles.cardTitle}>Games</Text>
        </TouchableOpacity>
       

        <TouchableOpacity style={styles.card} onPress={() => router.push('/chatbot')}>
          <Image source={require('../assets/images/ai.png')} style={styles.cardImage} />
          <Text style={styles.cardCategory}>Interactive Communication</Text>
          <Text style={styles.cardTitle}>LEVEL UP with AI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/video')}>
          <Image source={require('../assets/images/recovery.png')} style={styles.cardImage} />
          <Text style={styles.cardCategory}>Recovery Focused</Text>
          <Text style={styles.cardTitle}>THERAPY CARE</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.card} onPress={() => router.push('/connectngo')}>
          <Image source={require('../assets/images/ngo.png')} style={styles.cardImage} />
          <Text style={styles.cardCategory}>Support</Text>
          <Text style={styles.cardTitle}>CONNECT with NGOs</Text>
        </TouchableOpacity>

        
      </ScrollView>

      <TouchableOpacity style={styles.emergencyButton} onPress={playAlarm}>
        <Image
          source={require('../assets/images/emergency-icon.png')}
          style={styles.emergencyIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCE6FF' },

  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  hello: { fontSize: 24, color: '#000' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#A259FF' },
  avatar: { width: 70, height: 70, borderRadius: 35 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  cardCategory: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  emergencyButton: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    padding: 70,
    borderRadius: 30,
    justifyContent: 'right',
    alignItems: 'right',
    zIndex: 10,
  },

  emergencyIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
