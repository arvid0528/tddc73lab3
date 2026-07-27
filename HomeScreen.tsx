import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './HomeScreen.styles';

type RepoItem = {
    id: number;
    full_name: string;
    description: string | null;
    stargazers_count: number;
};

type RepoSearchResponse = {
    items: RepoItem[];
};

type PageItem = {
    name: string;
    description: string;
    stars: number;
};

export default function MainScreen() {
    const navigation = useNavigation<any>();
    const [pages, setPages] = useState<PageItem[]>([]);
    const [sortMode, setSortMode] = useState<'top' | 'new'>('top');
    const [dateRange, setDateRange] = useState<string>('Past 7 days');
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x: 10, y: 10, height: 0 });
    const menuTriggerRef = useRef<View>(null);

    const openMenu = () => {
        if (menuTriggerRef.current) {
            menuTriggerRef.current.measureInWindow((x, y, _width, height) => {
                setMenuAnchor({ x, y, height });
                setMenuVisible(true);
            });
            return;
        }
        setMenuVisible(true);
    };

    const fetchPages = async () => {
        try {
                setPages([]);

                const currentDate = new Date();
                if (dateRange === 'Past 7 days') {
                    currentDate.setDate(currentDate.getDate() - 7);
                }
                if (dateRange === 'Past 30 days') {
                    currentDate.setDate(currentDate.getDate() - 30);
                }
                if (dateRange === 'This year') {
                    currentDate.setMonth(0);
                    currentDate.setDate(1);
                }

                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;
                const currentDay = currentDate.getDate();
                
                const formattedDate = currentYear + '-' + (currentMonth < 10 ? '0' : '') + currentMonth + '-' + (currentDay < 10 ? '0' : '') + currentDay;

                console.log('current date: ', formattedDate);
                

                const sortField = sortMode === 'top' ? 'stars' : 'updated';
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=created:>${formattedDate}&archived:false&sort=${sortField}&order=desc&per_page=20`
                );
                const data: RepoSearchResponse = await response.json();
                console.log('Fetched data:', data);
                const mappedPages: PageItem[] = (data.items ?? []).map((repo) => ({
                    name: repo.full_name,
                    description: repo.description ?? 'No description available',
                    stars: repo.stargazers_count,
                }));

                if (mappedPages.length > 0) {
                    setPages(mappedPages);
                }
            } catch (error) {
                console.error('Failed to fetch pages:', error);
            }
    }

    useEffect(() => {
        fetchPages();
    }, [sortMode, dateRange]);

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.refreshButton} 
                onPress={() => fetchPages()}
            >
                <Text style={styles.refreshButtonText}>Refresh</Text>
            </Pressable>
            <View style={styles.sortModes}>
                <Pressable
                    style={sortMode === 'top' ? [styles.modeButtonSelected, styles.modeButton] : styles.modeButton}
                    onPress={() => setSortMode('top')}
                >
                    <Text style={styles.modeButtonText}>Top</Text>
                </Pressable>

                <Pressable style={sortMode === 'new' ? [styles.modeButtonSelected, styles.modeButton] : styles.modeButton}
                    onPress={() => setSortMode('new')}
                >
                    <Text style={styles.modeButtonText}>New</Text>
                </Pressable>

                

            </View>
            <View style={styles.menuRow}>
                <Text style={styles.menuLabel}>Created:</Text>
                <Pressable ref={menuTriggerRef} style={styles.menuTrigger} onPress={openMenu}>
                    <Text style={styles.modeButtonText}>{dateRange} ▼</Text>
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
                                top: menuAnchor.y + menuAnchor.height + 4,
                                left: menuAnchor.x,
                            },
                        ]}
                    >
                        <Pressable style={styles.menuItem} onPress={() => { setDateRange('Past 7 days'); setMenuVisible(false); }}>
                            <Text style={styles.modeButtonText}>Past 7 days</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => { setDateRange('Past 30 days'); setMenuVisible(false); }}>
                            <Text style={styles.modeButtonText}>Past 30 days</Text>
                        </Pressable>
                        <Pressable style={styles.menuItem} onPress={() => { setDateRange('This year'); setMenuVisible(false); }}>
                            <Text style={styles.modeButtonText}>This year</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.pagesList}>
                {pages.map((page, index) => (
                    <Pressable
                        key={index}
                        style={styles.pageItem}
                        onPress={() => navigation.navigate('Repo', page)}
                    >
                        <View style={styles.titleDescColumn}>
                            <Text style={styles.pageTitle}>{page.name}</Text>
                            <Text style={styles.pageDescription}>{page.description}</Text>
                        </View>
                        <Text style={styles.pageStars}>★ {page.stars} stars</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

