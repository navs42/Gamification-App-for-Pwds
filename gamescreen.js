import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';

const games = [
  {
    id: 1,
    title: 'DrawMe',
    description: 'Draw based on given picture!',
    image: require('../assets/images/drawme.png'),
    route: '/drawme',
  },
  {
    id: 2,
    title: 'StoryTeller',
    description: 'Answer with your voice for learning.',
    image: require('../assets/images/story.png'),
    route: '/storyteller',
  },
  {
    id: 3,
    title: 'Color Clash',
    description: 'Test your color recognition skills',
    image: require('../assets/images/colorclash.png'),
    route: '/colorclash',
  },
  {
    id: 4,
    title: 'Command Quest',
    description: 'Test your attention and reflexes',
    image: require('../assets/images/simonsays.jpg'),
    route: '/commandquest',
  },
  {
    id: 5,
    title: 'Tap & Pop',
    description: 'Tap juicy fruits to score points while dodging sneaky bombs',
    image: require('../assets/images/tap&pop.jpg'),
    route: '/tap&pop',
  },
];

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.card}
            onPress={() => router.push(game.route)}
          >
            <Image source={game.image} style={styles.cardImage} />
            <Text style={styles.cardCategory}>{game.title}</Text>
            <Text style={styles.cardTitle}>{game.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE6FF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A259FF',
    marginBottom: 20,
  },
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
    fontSize: 20,
    fontWeight: '600',
    color: '#5D0C9A',
  },
  cardTitle: {
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    marginTop: 6,
  },
});
