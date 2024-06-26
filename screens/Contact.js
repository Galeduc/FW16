import React, { useState } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Video } from 'expo-av';
import Navbar from '../components/Navbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';

const Contact = () => {
  const [societe, setSociete] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  const handleSendEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/; // Expression régulière pour vérifier l'email

    if (societe && email && message) {
      if (!emailRegex.test(email)) {
        Alert.alert('Erreur de validation', 'Veuillez entrer une adresse e-mail valide.');
        return;
      }

fetch('http://192.168.1.101:3000/envoyer-email', { // Assurez-vous que l'URL est correcte
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        societe,
        email,
        message,
      }),
    })
      .then(response => response.text())
      .then(result => {
        Alert.alert('Email envoyé', 'Votre message a été envoyé avec succès.');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erreur', 'Il y a eu une erreur lors de l\'envoi de votre message.');
      });
  } else {
    Alert.alert('Erreur de validation', 'Veuillez remplir tous les champs.');
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <Video
        source={require('../assets/background.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <View style={styles.headerBackground} />
          <Text style={styles.headerText}>CONTACTS</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputField}>
            <Text style={styles.labelText}>Société</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez le nom de votre société"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={societe}
              onChangeText={setSociete}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez votre email"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.labelText}>Message</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez votre message"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>ENVOYER</Text>
          </TouchableOpacity>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Icon name="mail" size={20} color="#fff" />
              <Text style={styles.contactText} onPress={() => copyToClipboard('marketing@freelanceweb16.fr')}>marketing@freelanceweb16.fr</Text>
            </View>
            <View style={styles.contactRow}>
              <Icon name="phone" size={20} color="#fff" />
              <Text style={styles.contactText} onPress={() => copyToClipboard('06 47 24 27 23')}>06 47 24 27 23</Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 60,
    alignItems: 'center',
  },
  headerBackground: {
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
    paddingVertical: 30,
    paddingHorizontal: 90,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 13,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
    padding: 30,
    marginTop: 100,
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
    borderRadius: 30,
  },
  inputField: {
    marginBottom: 15,
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4D8B31',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent', // Rendre la barre de navigation transparente
  },
});

export default Contact;