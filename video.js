import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { startSession, endSession } from '../utils/usageTracker';

export default function TherapyScreen() {
  useEffect(() => {
    startSession('therapy');
    return () => {
      endSession('therapy');
    };
  }, []);

  const videos = [
    {
      title: 'Day 1 - Finger Mobility & Hand Coordination',
      id: '5IZkBy2rWTg',
      caption: `Focus: Finger & hand coordination.\nBenefits: Improves dexterity.\nDuration: 10–15 min.\nReps: 2–3 sets.\nRest: 1 min between sets.\nCaretaker: Yes, especially for hand support.`,
    },
    {
      title: 'Day 2 - Standing & Balancing Exercises',
      id: '6b0CTqsooBc',
      caption: `Focus: Standing balance.\nBenefits: Leg strength & posture.\nDuration: 15–20 min.\nReps: 3 sets.\nRest: 2 min.\nCaretaker: Yes, to prevent falls.`,
    },
    {
      title: 'Day 3 - Home-Based Routine',
      id: 'CeSa1CH1Wvs',
      caption: `Focus: Whole-body movement.\nBenefits: General mobility.\nDuration: 20–25 min.\nReps: 2 sets.\nRest: 1–2 min.\nCaretaker: Recommended for guidance.`,
    },
    {
      title: 'Day 4 - Stretching for Spasticity',
      id: 'ZpJPoYbUP9M',
      caption: `Focus: Stretching tight muscles.\nBenefits: Reduces stiffness.\nDuration: 15 min.\nReps: Hold 30 sec, repeat twice.\nRest: 30 sec.\nCaretaker: Yes, to help with positioning.`,
    },
    {
      title: 'Day 5 - CP Treatment Exercises',
      id: 'CGP96wgRDzk',
      caption: `Focus: Core & limb coordination.\nBenefits: Improves daily function.\nDuration: 25–30 min.\nReps: Follow video.\nRest: 1–2 min.\nCaretaker: Yes, to assist with form.`,
    },
    {
      title: 'Day 6 - Gait Patterns in Spastic Diplegia',
      id: 'SpcLjNtm7FI',
      caption: `Focus: Gait analysis and training.\nBenefits: Enhances walking patterns.\nDuration: 20 min.\nReps: As demonstrated.\nRest: 2 min between sets.\nCaretaker: Yes, for safety support.`,
    },
    {
      title: 'Day 7 - Comprehensive Physiotherapy Routine',
      id: '3dRLPjY7fKI',
      caption: `Focus: Full-body physiotherapy exercises.\nBenefits: Enhances mobility and strength.\nDuration: 20–30 min.\nReps: As demonstrated.\nRest: 1–2 min between sets.\nCaretaker: Yes, to assist and ensure safety.`,
    },
  ];

  const openVideo = (id) => {
    const url = `https://www.youtube.com/watch?v=${id}`;
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Cerebral Palsy Exercise Plan</Text>

        {videos.map((video, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{video.title}</Text>
            <Text style={styles.caption}>{video.caption}</Text>
            <TouchableOpacity onPress={() => openVideo(video.id)}>
              <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.button}>
                <Text style={styles.buttonText}>▶ Watch Video</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5D0C9A',
    marginBottom: 10,
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
