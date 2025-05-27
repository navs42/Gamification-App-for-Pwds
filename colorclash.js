import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import ConfettiCannon from 'react-native-confetti-cannon';
import { LinearGradient } from 'expo-linear-gradient';

const words = ['Red', 'Green', 'Blue', 'Yellow'];
const colors = ['red', 'green', 'blue', 'yellow'];

const getRandomIndex = () => Math.floor(Math.random() * 4);

export default function ColorMatchGame() {
  const [word, setWord] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    generateNewPrompt();
  }, []);

  const generateNewPrompt = () => {
    const wordIndex = getRandomIndex();
    const colorIndex = getRandomIndex();
    setWord(words[wordIndex]);
    setTextColor(colors[colorIndex]);
    setFeedback('');
  };

  const playSound = async (correct) => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(
        correct ? require('../assets/sounds/hey.mp3') : require('../assets/sounds/oh.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.warn('Sound playback error:', error);
    }
  };

  const handleChoice = async (isMatch) => {
    const correct = (word.toLowerCase() === textColor) === isMatch;
    await playSound(correct);

    if (correct) {
      setFeedback('Correct ✅');
      setScore(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    } else {
      setFeedback('Wrong ❌');
      setScore(prev => Math.max(prev - 1, 0));
    }

    nextRound();
  };

  const nextRound = () => {
    if (round < 10) {
      setTimeout(() => {
        generateNewPrompt();
        setRound(prev => prev + 1);
      }, 800);
    } else {
      const finalScore = score;
      setHighestScore(prev => Math.max(prev, finalScore));
      Alert.alert('🎉 Game Over', `Your Score: ${finalScore}`, [
        { text: 'Play Again', onPress: resetGame },
      ]);
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    generateNewPrompt();
  };

  return (
    <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.background}>
      <View style={styles.card}>
        <Text style={styles.header}>🎮 Color Match Game</Text>

        <Text style={[styles.word, { color: textColor }]}>{word}</Text>

        <TouchableOpacity style={styles.button} onPress={() => handleChoice(true)}>
          <Text style={styles.buttonText}>MATCH</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleChoice(false)}>
          <Text style={[styles.buttonText, { color: '#5D3FD3' }]}>SKIP</Text>
        </TouchableOpacity>

        <Text style={styles.feedback}>{feedback}</Text>
        <Text style={styles.status}>Round: {round}/10</Text>
        <Text style={styles.status}>Score: {score}</Text>

        {showConfetti && (
          <ConfettiCannon
            count={60}
            origin={{ x: 200, y: 0 }}
            fadeOut
            autoStart
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5D0C9A',
  },
  word: {
    fontSize: 42,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#5D0C9A',
    alignItems: 'center',
  },
  buttonText: {
    color: '#5D0C9A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 22,
    marginVertical: 20,
    color: '#5D0C9A',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    marginTop: 8,
    color: '#5D0C9A',
  },
});
