import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Navbar = () => {
  const navigation = useNavigation();

  const goToBody = () => {
    navigation.navigate('Body');
  };

  const goToServices = () => {
    navigation.navigate('Services');
  };

  const goToContact = () => {
    navigation.navigate('Contact');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToServices}>
        <Icon name="window" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToBody}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToContact}>
        <Icon name="drafts" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 51, 51, 0.8)', // Gris transparent
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Navbar;