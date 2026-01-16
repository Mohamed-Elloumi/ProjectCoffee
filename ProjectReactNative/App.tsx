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
import { AuthProvider } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppTemplate>
            <Stack.Navigator
              initialRouteName="Splashscreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Splashscreen" component={Splashscreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            </Stack.Navigator>
          </AppTemplate>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
