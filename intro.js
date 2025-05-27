import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.quote}>
          "Empowering{'\n'}
          Abilities,{'\n'}
          Enhancing{'\n'}
          Lives."
        </Text>
        <Text style={styles.welcome}>Welcome to the REACH+</Text>

        <View style={styles.dotsContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity onPress={() => router.push('/intro2')}>

          <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
    fontWeight: '400',
  },
  welcome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#5D0C9A',
  },
  nextButton: {
    width: 200,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipText: {
    color: '#5D0C9A',
    marginTop: 10,
    fontSize: 16,
  },
});
