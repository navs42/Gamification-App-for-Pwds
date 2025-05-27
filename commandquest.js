import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fullActions = [
  { id: 1, text: "Clap your hands", voice: "Clap your hands", image: require('../assets/images/clap.png') },
  { id: 2, text: "Raise your left hand", voice: "Raise your left hand", image: require('../assets/images/raise your left hand.png') },
  { id: 3, text: "Touch your nose", voice: "Touch your nose", image: require('../assets/images/touch your nose.png') },
  { id: 4, text: "Smile wide", voice: "Smile wide", image: require('../assets/images/smile wide.png') },
  { id: 5, text: "Lift your left knee", voice: "Lift your left knee", image: require('../assets/images/lift your left knee.png') },
  { id: 6, text: "Stomp your right foot", voice: "Stomp your right foot", image: require('../assets/images/stomp your right foot.png') },
  { id: 7, text: "Wave your right hand", voice: "Wave your right hand", image: require('../assets/images/wave your right hand.png') },
  { id: 8, text: "Touch your ears", voice: "Touch your ears", image: require('../assets/images/touch your ears.png') },
  { id: 9, text: "Stretch your arms", voice: "Stretch your arms", image: require('../assets/images/stretch your arms.png') },
  { id: 10, text: "Touch your shoulders", voice: "Touch your shoulders", image: require('../assets/images/touch your shoulders.png') },
  { id: 11, text: "Raise both arms", voice: "Raise both arms", image: require('../assets/images/raise both arms.png') },
  { id: 12, text: "Tilt your head left", voice: "Tilt your head left", image: require('../assets/images/tilt your head.png') },
  { id: 13, text: "Raise your right eyebrow", voice: "Raise your right eyebrow", image: require('../assets/images/raise your right eyebrows.png') },
  { id: 14, text: "Make a silly face", voice: "Make a silly face", image: require('../assets/images/make a silly face.png') },
];

const celebrationMessages = [
  "🎉 Great job!",
  "🚀 You nailed it!",
  "🥳 Fantastic!",
  "👏 Well done!",
  "🔥 Keep it up!",
];

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function App() {
  const [shuffledActions, setShuffledActions] = useState(shuffleArray(fullActions));
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentAction, setCurrentAction] = useState(null);
  const [showYourTurn, setShowYourTurn] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const bounceAnim = useRef(new Animated.Value(1)).current;

  // Load saved high score
  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const savedScore = await AsyncStorage.getItem('HIGH_SCORE');
        if (savedScore !== null) {
          setHighScore(parseInt(savedScore));
        }
      } catch (e) {
        console.log("Failed to load high score", e);
      }
    };
    loadHighScore();
  }, []);

  // Countdown Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, countdown]);

  const playInstruction = (action) => {
    setShowYourTurn(false);
    setCountdown(5);
    setIsTimerRunning(false);
    setSuccessMessage('');

    Speech.speak(action.voice, {
      onDone: () => {
        setTimeout(() => {
          setShowYourTurn(true);
          Speech.speak("Your turn!");
          setIsTimerRunning(true);
        }, 1000);
      },
    });
  };

  const nextAction = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= shuffledActions.length) {
      const reshuffled = shuffleArray(fullActions);
      setShuffledActions(reshuffled);
      setCurrentIndex(0);
      setCurrentAction(reshuffled[0]);
      playInstruction(reshuffled[0]);
    } else {
      setCurrentIndex(nextIndex);
      setCurrentAction(shuffledActions[nextIndex]);
      playInstruction(shuffledActions[nextIndex]);
    }
  };

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/success.mp3'));
      await sound.playAsync();
    } catch (error) {
      console.log("Sound error", error);
    }
  };

  const animateSuccess = () => {
    bounceAnim.setValue(1);
    Animated.sequence([
      Animated.timing(bounceAnim, { toValue: 1.4, duration: 200, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const handleSuccess = async () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
      try {
        await AsyncStorage.setItem('HIGH_SCORE', newScore.toString());
      } catch (e) {
        console.log("Failed to save high score", e);
      }
    }
    playSuccessSound();
    setSuccessMessage(celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]);
    animateSuccess();
    Speech.speak("Great job!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Action Game</Text>
      <Text style={styles.score}>Score: {score}   |   High Score: {highScore}</Text>

      {currentAction ? (
        <View style={styles.actionContainer}>
          <Image source={currentAction.image} style={styles.image} />
          <Text style={styles.actionText}>{currentAction.text}</Text>
        </View>
      ) : (
        <Text style={styles.instructions}>Tap ▶ to begin!</Text>
      )}

      {showYourTurn && (
        <View style={styles.yourTurnContainer}>
          {isTimerRunning && <Text style={styles.timerText}>{countdown}</Text>}
          <TouchableOpacity style={styles.successButton} onPress={handleSuccess}>
            <Text style={styles.successText}> I did it!</Text>
          </TouchableOpacity>
        </View>
      )}

      <Animated.Text style={[styles.successMessage, { transform: [{ scale: bounceAnim }] }]}>
        {successMessage}
      </Animated.Text>

      <TouchableOpacity style={styles.button} onPress={nextAction}>
        <Text style={styles.buttonText}>▶ Next Action</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e6ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 10,
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    color: '#444',
    marginBottom: 20,
  },
  actionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    color: '#777',
    marginBottom: 40,
    textAlign: 'center',
  },
  yourTurnContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9c27b0',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6a0dad',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 4,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  successButton: {
    marginTop: 15,
    backgroundColor: '#9c27b0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  successText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7b1fa2',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
