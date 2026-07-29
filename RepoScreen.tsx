import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RepoScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { name, description, stars, createdAt }
     = route.params ?? {name: 'Unknown', description: 'No description', stars: 0, createdAt: 'Unknown'};
    const [language, setLanguage] = React.useState<string>('Unknown');

    const formatNumber = (num: number) => new Intl.NumberFormat('sv-SE').format(num);

    const languageColors = require('./languageColors.json');

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
            <View style={styles.starsRow}>
                <View style={styles.iconCell}>
                    <Icon name="star-outline" size={16} color="#B8860B" />
                </View>
                <Text style={styles.stars}> {formatNumber(stars)} stars</Text>
            </View>
            <View style={styles.languageView}>
                <Text style={styles.languageText}>Language:</Text>
                <View style={[styles.iconCell, styles.languageIconCell]}>
                    <View
                        style={[
                            styles.languageDot,
                            { backgroundColor: languageColors[language] || '#fff' },
                        ]}
                    />
                </View>
                <Text style={styles.languageText}> {language}</Text>
            </View>
            <Text style={styles.createdAt}>Created: {createdAt.split('T')[0]}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    title: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    description: {
        color: '#000',
        fontSize: 14,
        marginBottom: 8,
    },
    stars: {
        color: '#000',
        fontSize: 14,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    languageView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    languageText: {
        color: '#000',
        fontSize: 14,
    },
    createdAt: {
        color: '#000',
        fontSize: 14,
        marginBottom: 8,
    },
    iconCell: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageIconCell: {
        marginLeft: 5,
        marginRight: 6,
    },
    languageDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
    },
});
