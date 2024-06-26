import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation depuis @react-navigation/native
import Navbar from '../components/Navbar';

const Services = () => {
  const navigation = useNavigation(); // Récupérez l'objet navigation avec useNavigation

  const handleCardPress = (screenName) => {
    navigation.navigate(screenName); // Navigue vers l'écran spécifié par screenName
  };

  return (
    <View style={styles.container}>
      <VideoBackground />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nos Services</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cards}>
          <ServiceCard imageSource={require('../assets/card1.png')} onPress={() => handleCardPress('Card1')} />
          <ServiceCard imageSource={require('../assets/card2.png')} onPress={() => handleCardPress('Card2')} />
          <ServiceCard imageSource={require('../assets/card3.png')} onPress={() => handleCardPress('Card3')} />
          <ServiceCard imageSource={require('../assets/card4.png')} onPress={() => handleCardPress('Card4')} />
          <ServiceCard imageSource={require('../assets/card5.png')} onPress={() => handleCardPress('Card5')} />
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

const VideoBackground = () => (
  <Video
    source={require('../assets/background.mp4')}
    rate={1.0}
    volume={1.0}
    isMuted={false}
    resizeMode="cover"
    shouldPlay
    isLooping
    style={styles.video}
  />
);

const ServiceCard = ({ imageSource, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <ImageBackground source={imageSource} style={styles.cardImage} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.6)', // Gris avec une opacité de 0.6
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'center',
    zIndex: 1, // Assurez-vous que le conteneur est au-dessus du fond vidéo
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Assurez-vous que le contenu scrollable est au-dessus du fond vidéo
  },
  cards: {
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 90,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 60,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Services;
