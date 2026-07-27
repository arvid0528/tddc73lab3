import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import RepoScreen from './RepoScreen';

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
          }}>

          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GitHub Trending Repositories' }} />
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

const styles = {
  NavigationBar: {
    backgroundColor: '#000',
    color: '#fff',
  },
}