import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './MyReposScreen.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGitHubAuth } from './AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const languageColors = require('./languageColors.json');


type RepoItem = {
    id: number;
    full_name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    created_at: string;
};

type PageItem = {
    name: string;
    description: string;
    language: string;
    stars: number;
    createdAt: string;
};

type MenuKind = 'language' | 'dateRange';

const languageOptions = ['All', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Java'];
const dateRangeOptions = ['Past 7 days', 'Past 30 days', 'This year'];

export default function MyReposScreen() {
    const navigation = useNavigation<any>();
    const [pages, setPages] = useState<PageItem[]>([]);
    const [languageFilter, setLanguageFilter] = useState<string>('All');
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeMenu, setActiveMenu] = useState<MenuKind>('language');
    const [menuAnchor, setMenuAnchor] = useState({ x: 10, y: 10, height: 0 });
    const languageTriggerRef = useRef<View>(null);

    const route = useRoute<any>();
    const { user, token } = useGitHubAuth();

    const openMenu = (kind: MenuKind, ref: React.RefObject<View | null>) => {
        setActiveMenu(kind);

        if (ref.current) {
            ref.current.measureInWindow((x, y, _width, height) => {
                setMenuAnchor({ x, y, height });
                setMenuVisible(true);
            });
            return;
        }

        setMenuVisible(true);
    };

    const formatNumber = (num: number) => 
        new Intl.NumberFormat('sv-SE').format(num);

    const fetchPages = async () => {
        try {
                setPages([]);
                
                if (!user) {
                    return;
                }

                const response = await fetch(
                    'https://api.github.com/user/repos?visibility=all',
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/vnd.github+json',
                        },
                    }
                );

                const responseText = await response.text();
                if (!response.ok) {
                    throw new Error(`GitHub request failed (${response.status}): ${responseText.slice(0, 120)}`);
                }

                const data: RepoItem[] = JSON.parse(responseText);
                console.log('Fetched data:', data);

                const filteredPages = data.filter((page) => {
                    if (languageFilter === 'All') {
                        return true;
                    }

                    return page.language === languageFilter;
                });

                const mappedPages: PageItem[] = filteredPages.map((repo) => ({
                    name: repo.full_name,
                    description: repo.description ?? 'No description available',
                    language: repo.language ?? 'Unknown',
                    stars: repo.stargazers_count,
                    createdAt: repo.created_at,
                }));

                setPages(mappedPages);
                
            } catch (error) {
                console.error('Failed to fetch pages:', error);
            }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (user && token) {
                fetchPages();
            }
            else {
                setPages([]);
            }
        }, [user, token, languageFilter])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {user ? `${user.login}'s Repositories` : 'Not Logged in'}
                </Text>
            </View>
            <View style={styles.menuRow}>

                <View style={styles.menuView}>
                    <Text style={styles.menuLabel}>Language:</Text>
                    <Pressable
                        ref={languageTriggerRef}
                        style={styles.menuTrigger}
                        onPress={() => openMenu('language', languageTriggerRef)}
                    >
                        <Text style={styles.modeButtonText}>{languageFilter} ▼</Text>
                    </Pressable>
                </View>
                
                <Pressable style={styles.refreshButton} 
                    onPress={() => fetchPages()}
                >
                    <Icon name='refresh' size={25} color='#fff' />
                </Pressable>
            </View>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <View style={styles.menuBackdrop}>
                    <Pressable style={styles.menuBackdropTouchable} onPress={() => setMenuVisible(false)} />
                    <View
                        style={[
                            styles.menuPanel,
                            {
                                position: 'absolute',
                                top: menuAnchor.y + menuAnchor.height + 2,
                                left: menuAnchor.x,
                            },
                        ]}
                    >
                        {(activeMenu === 'language' ? languageOptions : dateRangeOptions).map((option) => (
                            <Pressable
                                key={option}
                                style={styles.menuItem}
                                onPress={() => {
                                    if (activeMenu === 'language') {
                                        setLanguageFilter(option);
                                        
                                    }
                                    setMenuVisible(false);
                                }}
                            >
                                <Text style={styles.modeButtonText}>{option}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.pagesList}>
                {pages.map((page, index) => (

                    <Pressable
                        key={index}
                        style={styles.pageItem}
                        onPress={() => navigation.navigate('RepoDetails', page)}
                    >
                        <View style={styles.titleDescColumn}>
                            <Text style={styles.pageTitle}>{page.name}</Text>
                            <Text style={styles.pageDescription}>{page.description}</Text>
                        </View>
                        <View style={styles.pageRightColumn}>
                            <View style={styles.pageCreatedAtColumn}>
                                <Text style={styles.pageDescription}>{page.createdAt.split('T')[0]}</Text>
                            </View>
                            <View style={styles.starsLanguageColumn}>
                                <View style={styles.pageStarsRow}>
                                    <View style={styles.iconCell}>
                                        <Icon name="star-outline" size={16} color="#B8860B" />
                                    </View>
                                    <Text style={styles.pageStars}> {formatNumber(page.stars)}</Text>
                                </View>
                                <View style={styles.pageLanguageRow}>
                                    <View style={styles.iconCell}>
                                        <View
                                            style={[
                                                styles.languageDot,
                                                { backgroundColor: languageColors[page.language] || '#fff' },
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.pageLanguage}> {page.language ?? 'Unknown'}</Text>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
            
        </SafeAreaView>
    )
}

