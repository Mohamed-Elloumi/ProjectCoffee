import { useAuth } from '../contexts/AuthContext'
import { BackgroundSS, SplashS } from '../assets/images'
import { RootStackParamList } from '../navigations/types'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type SplashscreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splashscreen'>

const Splashscreen = () => {
    const navigation = useNavigation<SplashscreenNavigationProp>()
    const { isAuthenticated } = useAuth()

    // Since this component is now inside the Public Stack of App.tsx,
    // it will only be rendered when isAuthenticated is false.
    // If isAuthenticated becomes true, React Navigation will automatically
    // switch to the Private Stack (Tabs).

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={BackgroundSS}
                style={{ flex: 1, width: '100%', height: '100%' }}
                resizeMode="cover"
            >
                <View style={{ marginTop: 90, alignItems: 'center' }}>
                    <Image source={SplashS} />
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '500',
                            color: 'white',
                            paddingHorizontal: 100,
                            textAlign: 'center',
                        }}
                    >
                        Coffe so good, your taste buds will love it
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: 'white',
                            textAlign: 'center',
                            paddingHorizontal: 90,
                        }}
                    >
                        The best grain, the finest roas, the most powerful flavor.
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        // Navigate to Login since we are in the Public Stack
                        navigation.navigate('Login')
                    }}
                    style={{
                        backgroundColor: '#00512C',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                        paddingVertical: 15,
                        borderRadius: 30,
                        marginHorizontal: 60,
                        marginTop: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'white',
                        }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}

export default Splashscreen

const styles = StyleSheet.create({})
