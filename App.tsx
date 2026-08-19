import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import RepoScreen from './RepoScreen';
import LoginScreen from './LoginScreen';
import MyReposScreen from './MyReposScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GitHubAuthProvider } from './AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          position: 'absolute',
          height: 60,
          bottom: insets.bottom,
        },
        tabBarActiveTintColor: 'rgb(0, 106, 255)',
        tabBarInactiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
  
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="compass" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Repos"
        component={MyReposScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="book" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="github" size={30} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <SafeAreaProvider>
      <GitHubAuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RepoDetails"
              component={RepoScreen}
              options={{ title: 'Repository Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GitHubAuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    marginRight: 10,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',

  },
  loginIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});