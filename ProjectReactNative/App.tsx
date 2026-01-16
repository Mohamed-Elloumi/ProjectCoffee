import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTemplate from './src/templates/AppTemplate';

import LoginScreen from './src/pages/Login';
import HomeScreen from './src/pages/Home';
import Tabs from './src/navigations/Tabs';
import Splashscreen from './src/pages/Splashscreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from './src/pages/ProductDetail';
import RegisterScreen from './src/pages/Register';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00512C' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        // Public Stack
        <>
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Private Stack
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppTemplate>
            <RootNavigator />
          </AppTemplate>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
