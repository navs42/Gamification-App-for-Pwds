import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import { startSession, endSession } from '../utils/usageTracker';

const referenceImages = [
  { uri: 'https://img.icons8.com/ios-filled/100/apple.png' },
  { uri: 'https://img.icons8.com/ios-filled/100/star.png' },
  { uri: 'https://img.icons8.com/ios-filled/100/heart.png' },
  { uri: 'https://img.icons8.com/ios-filled/100/cloud.png' },
  { uri: 'https://img.icons8.com/ios-filled/100/sun.png' },
  { uri: 'https://img.icons8.com/ios-filled/100/moon-symbol.png' }
];

export default function DrawingGame() {
  const ref = useRef();
  const webRef = useRef();
  const [color, setColor] = useState('#000000');
  const [stars, setStars] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    startSession('game');
    return () => endSession('game');
  }, []);

  useEffect(() => {
    generateRandomImage();
  }, []);

  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * referenceImages.length);
    setCurrentImage(referenceImages[randomIndex]);
    setStars(null);
  };

  const handleOK = (signature) => {
    console.log('Signature received!');
    const score = Math.floor(Math.random() * 3) + 1;
    setStars(score);
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleSubmit = () => {
    ref.current.readSignature();
    setTimeout(() => {
      ref.current.clearSignature(); // Clear canvas after reading signature
    }, 500);
  };

  const changeColor = (newColor) => {
    setColor(newColor);
    // Inject JS to change the pen color dynamically
    if (webRef.current) {
      webRef.current.injectJavaScript(`
        if (signaturePad) {
          signaturePad.penColor = '${newColor}';
        }
      `);
    }
  };

  const colorOptions = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffa500', '#800080'];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🖌️ Draw the Shape!</Text>

      {currentImage && (
        <Image source={currentImage} style={styles.referenceImage} />
      )}

      <SignatureScreen
        ref={ref}
        webRef={webRef}
        onOK={handleOK}
        penColor={color}
        autoClear={false}
        webStyle={`
          .m-signature-pad--body {
            border: 2px solid #888;
            background-color: white;
          }
          .m-signature-pad--footer {
            display: none;
          }
        `}
      />

      <View style={styles.palette}>
        {colorOptions.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => changeColor(c)}
            style={[
              styles.color,
              { backgroundColor: c, borderWidth: color === c ? 3 : 1 },
            ]}
          />
        ))}
      </View>

      <View style={styles.controls}>
        <Button title="Clear" onPress={handleClear} color="#6a1b9a" />
        <Button title="Submit" onPress={handleSubmit} color="green" />
      </View>

      {stars !== null && (
        <>
          <Text style={styles.stars}>⭐ You earned {stars} star{stars > 1 ? 's' : ''}!</Text>
          <TouchableOpacity onPress={generateRandomImage} style={styles.newImageButton}>
            <Text style={styles.newImageText}>🎲 Try Another Drawing</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fce6ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  referenceImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#888',
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 6,
    borderColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  stars: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  newImageButton: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#7C3AED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  newImageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
