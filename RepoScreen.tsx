import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RepoScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { name, description, stars } = route.params;
    const [language, setLanguage] = React.useState<string | null>(null);

    const getRepoInfo = async () => {
        try {
            const response = await fetch(`https://api.github.com/repos/${name}`);
            const data = await response.json();

            console.log('repo data:', data);
            if (!response.ok) {
                throw new Error('Failed to fetch repo info');
            }
            setLanguage(data.language);
        } catch (error) {
            console.error('Failed to fetch repo info:', error);
        }
    };

    React.useEffect(() => {
        getRepoInfo();
    }, [name]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.stars}>{stars} ★ stars</Text>
            <Text style={styles.description}>Language: {language}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 12,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    description: {
        color: '#ddd',
        fontSize: 14,
        marginBottom: 8,
    },
    stars: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 16,
    },
    backButton: {
        borderWidth: 1,
        borderColor: '#fff',
        padding: 8,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#fff',
    },
});
