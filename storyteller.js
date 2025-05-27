import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Audio } from 'expo-av';

export default function StoryGame() {
  const [sound, setSound] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);

  const levelData = [
    {
      question: 'What do you visualize?',
      options: ['A beautiful forest', 'A busy market', 'A beach sunset', 'A snowy mountain'],
      correctAnswer: 'A beach sunset',
      audio: require('../assets/sounds/audio.mp3'), // Updated to match the new file path
    },
    {
      question: 'What do you see?',
      options: ['A bustling city', 'A calm river', 'A dense jungle', 'A desert landscape'],
      correctAnswer: 'A bustling city',
      audio: require('../assets/sounds/audio.mp3'), // Updated to match the new file path
    },
    {
      question: 'What is your scene?',
      options: ['A mountain range', 'A tropical island', 'A quiet park', 'A starry night'],
      correctAnswer: 'A mountain range',
      audio: require('../assets/sounds/audio.mp3'), // Updated to match the new file path
    },
  ];
  

  const playAudioStory = async () => {
    setFeedback('');
    const { sound: newSound } = await Audio.Sound.createAsync(levelData[level - 1].audio);
    setSound(newSound);
    await newSound.playAsync();

    setTimeout(() => setShowOptions(true), 10000);
  };

  const handleOptionPress = (option) => {
    if (option === levelData[level - 1].correctAnswer) {
      setFeedback('Correct! 🎉');
      setTimeout(() => nextLevel(), 2000);
    } else {
      setFeedback('Try Again ❌');
    }
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
      setShowOptions(false);
    } else {
      setFeedback('You have completed all levels! 🎉');
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5D3FD3" barStyle="light-content" />
      <Text style={styles.title}>🎧 Listen and Visualize - Level {level}</Text>

      <TouchableOpacity style={styles.button} onPress={playAudioStory}>
        <Text style={styles.buttonText}>Start Story</Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          {levelData[level - 1].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.option} onPress={() => handleOptionPress(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#5D3FD3',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5D3FD3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  optionsContainer: {
    marginTop: 30,
  },
  option: {
    backgroundColor: '#EEE9FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5D3FD3',
  },
});
