import React from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import Navbar from '../components/Navbar'; // Ensure this path is correct

const Card3 = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VideoBackground />
      <Image source={require('../assets/seo.png')} style={styles.webImage} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          BOOSTEZ VOTRE PRÉSENCE EN LIGNE{'\n'}
          AVEC NOTRE AGENCE SPÉCIALISÉE EN{'\n'}
          RÉFÉRENCEMENT NATUREL{'\n'}
          SEO SUR GOOGLE !
        </Text>
      </View>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Image source={require('../assets/return.png')} style={styles.backButtonImage} />
      </Pressable>
      <View style={styles.bottomNavbar}>
        <Navbar />
      </View>
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
    style={StyleSheet.absoluteFillObject}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  webImage: {
    width: 300,
    height: 320,
    bottom: 60,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  textContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 24,
    bottom: 60,
  },
});

export default Card3;
