import React from 'react';
import { StyleSheet, View, Image, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import Navbar from '../components/Navbar'; // Ensure the path is correct

const Card2 = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <VideoBackground />
            <View style={styles.content}>
                <Image source={require('../assets/phone.png')} style={styles.webImage} />
                <Text style={styles.text}>
                    DÉVELOPPEZ UNE APPLICATION{'\n'}
                    MOBILE PERFORMANTE !
                </Text>
                <Pressable style={styles.backButton} onPress={handleGoBack}>
                    <Image source={require('../assets/return.png')} style={styles.backButtonImage} />
                </Pressable>
            </View>
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
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 420,
        height: 420,
        bottom: 60,
        resizeMode: 'contain',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left',
        lineHeight: 24,
        bottom: 60,
        right: 30,
    },
    bottomNavbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default Card2;