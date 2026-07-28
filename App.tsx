import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';
import RepoScreen from './RepoScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
              <View style={styles.loginButton}>
                <Pressable 
                  style={styles.loginIcon}
                  onPress={() => {console.log("login button pressed")}}
                >
                  <Icon name="github" size={30} color="#fff" />
                </Pressable>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            )
          }}>

          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'GitHub Trending' }} />
          <Stack.Screen
            name="Repo"
            component={RepoScreen}
            options={({ route }: any) => ({
              title: route.params?.name ?? 'Repository',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
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