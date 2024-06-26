import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

import logo from '../assets/logo.png';
import backgroundVideo from '../assets/background.mp4'; // Chemin de la vidéo statique

const Body = () => {
  const navigation = useNavigation();
  const [videoUri, setVideoUri] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleButtonPress = () => {
    navigation.navigate('Services');
  };

  useEffect(() => {
    const loadVideo = async () => {
      try {
        // Utilise Asset.fromModule pour charger la vidéo
        await Asset.fromModule(backgroundVideo).downloadAsync();

        // Récupérez l'URI local de la vidéo
        const localUri = Asset.fromModule(backgroundVideo).uri;
        setVideoUri(localUri);
        setVideoReady(true);

        console.log('LOG Chemin de la vidéo:', localUri); // Vérifiez le chemin de la vidéo

      } catch (error) {
        console.error('Erreur lors du chargement de la vidéo :', error);
        setVideoError(true);
      }
    };

    loadVideo();
  }, []);

  if (videoError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur lors du chargement de la vidéo</Text>
      </View>
    );
  }

  if (!videoReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
          onError={(error) => {
            console.error('Erreur lors de la lecture de la vidéo:', error);
            setVideoError(true);
          }}
        />
      )}
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>VOIR NOS SERVICES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.2 }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    position: 'absolute',
    bottom: 230,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default Body;
