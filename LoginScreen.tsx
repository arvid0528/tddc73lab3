import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useGitHubAuth } from './AuthContext';

export default function LoginScreen() {
    const [inputToken, setInputToken] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    
    const { login, logout, user } = useGitHubAuth();

    const handleLogin = async () => {
        const success = await login(inputToken);
        if (!success) {
            setResponseMessage('Login failed. Make sure you are using a valid GitHub Personal access token.');
            setInputToken('');
        }
        else {
            setResponseMessage('');
        }
    };

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            setInputToken('');
        }
    }

  return (
    <View style={styles.container}>
        <Icon name="github" size={100} color="#fff" style={styles.githubIcon} />
        <Text style={styles.statusText}>
            {user ? `Logged in as ${user.login}` : 'Not logged in'}
        </Text>
        <TextInput
            style={styles.input}
            placeholder="GitHub Personal Access Token"
            value={inputToken}
            onChangeText={setInputToken}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
        />

        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <Pressable 
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
            {responseMessage ? (
                <Text style={styles.responseMessage}>{responseMessage}</Text>
            ) : null}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    githubIcon: {
        marginBottom: 20,
    },
    statusText: {
        fontSize: 16,
        margin: 10,
        color: '#fff',
    },
    input: {
        color: '#000',
        padding: 10,
        marginBottom: 10,
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '80%',
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#00f',
        backgroundColor: '#00f',
        padding: 10,
        marginBottom: 10,
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#f00',
        backgroundColor: '#f00',
        padding: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    responseMessage: {
        color: '#f00',
        marginTop: 10,
        textAlign: 'center',
    },
});