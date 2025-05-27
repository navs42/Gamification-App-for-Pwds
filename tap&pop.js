import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const FRUIT_SIZE = 100;
const BOMB_SIZE = 100;

const FruitNinja = () => {
  const [apple, setApple] = useState(null);
  const [bomb, setBomb] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const appleSoundRef = useRef();
  const bombSoundRef = useRef();

  useEffect(() => {
    const loadSounds = async () => {
      const { sound: appleSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/pop.mp3')
      );
      appleSoundRef.current = appleSound;

      const { sound: bombSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/bomb.wav')
      );
      bombSoundRef.current = bombSound;
    };

    loadSounds();
    return () => {
      if (appleSoundRef.current) {
        appleSoundRef.current.unloadAsync();
      }
      if (bombSoundRef.current) {
        bombSoundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const loadHighScore = async () => {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    };

    loadHighScore();
  }, []);

  useEffect(() => {
    
    const spawnFruitAndBomb = () => {
      const isBomb = Math.random() < 0.2; 
      const x = Math.random() * (SCREEN_WIDTH - FRUIT_SIZE);
      const y = Math.random() * (SCREEN_HEIGHT - FRUIT_SIZE - 100) + 100; 

      if (isBomb) {
        setBomb({ x, y, id: Math.random().toString() });
        setTimeout(() => setBomb(null), 1500); 
      } else {
        setApple({ x, y, id: Math.random().toString() });
        setTimeout(() => setApple(null), 1500); 
      }
    };

    const interval = setInterval(spawnFruitAndBomb, 2000); 
    return () => clearInterval(interval);
  }, [gameOver]);

  const handleApplePress = async () => {
    if (gameOver) return;

    setScore((prevScore) => prevScore + 1);

    
    if (appleSoundRef.current) {
      await appleSoundRef.current.replayAsync();
    }

    if (score + 1 > highScore) {
      setHighScore(score + 1);
      await AsyncStorage.setItem('highScore', (score + 1).toString());
    }

    setApple(null);
  };

  const handleBombPress = async () => {
    if (bombSoundRef.current) {
      await bombSoundRef.current.replayAsync();
    }
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')} 
      style={styles.container}
    >
      {apple && !gameOver && (
        <TouchableOpacity
          key={apple.id}
          activeOpacity={0.8}
          onPress={handleApplePress}
          style={[styles.apple, { left: apple.x, top: apple.y }]}
        >
          <Image
            source={require('../assets/images/apple.png')}
            style={{ width: FRUIT_SIZE, height: FRUIT_SIZE }}
          />
        </TouchableOpacity>
      )}

      {bomb && !gameOver && (
        <TouchableOpacity
          key={bomb.id}
          activeOpacity={0.8}
          onPress={handleBombPress}
          style={[styles.bomb, { left: bomb.x, top: bomb.y }]}
        >
          <Image
            source={require('../assets/images/bomb.png')}
            style={{ width: BOMB_SIZE, height: BOMB_SIZE }}
          />
        </TouchableOpacity>
      )}

      {gameOver && (
        <LinearGradient
          colors={['#A259FF', '#5D0C9A']} 
          style={styles.gameOverOverlay}
        >
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.gameOverText}>Final Score: {score}</Text>
          <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {!gameOver && (
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.scoreText}>High Score: {highScore}</Text>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apple: {
    position: 'absolute',
    width: FRUIT_SIZE,
    height: FRUIT_SIZE,
  },
  bomb: {
    position: 'absolute',
    width: BOMB_SIZE,
    height: BOMB_SIZE,
  },
  scoreCard: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2 - 150,
    left: SCREEN_WIDTH / 2 - 150,
    padding: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    color: '#ff6347',
  },
});

export default FruitNinja;
