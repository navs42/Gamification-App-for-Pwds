import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getUsageTime, formatTime } from '../utils/usageTracker';

export default function Progress() {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const game = await getUsageTime('game');
      const therapy = await getUsageTime('therapy');
      const chatbot = await getUsageTime('chatbot');

      setUsageData([
        { feature: 'Game', time: formatTime(game) },
        { feature: 'Therapy', time: formatTime(therapy) },
        { feature: 'Chatbot', time: formatTime(chatbot) },
      ]);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Progress</Text>

      {usageData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.feature}>{item.feature}</Text>
          <Text style={styles.time}>Usage Time: {item.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3FD',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#EBC7FF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  feature: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
});
