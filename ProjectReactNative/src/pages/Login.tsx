import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { LoginBG } from "../assets/images";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { RootStackParamList } from "../navigations/types";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs !");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Erreur", "Adresse email invalide");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        Alert.alert("Erreur", "Utilisateur non trouvé");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Erreur", "Mot de passe incorrect");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erreur", "Email invalide");
      } else {
        Alert.alert("Erreur", error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={LoginBG}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardView}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subText}>The best beans, roasted just for you.</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputStyle}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <Input
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputStyle}
                    secureTextEntry={true}
                  />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                  title="Sign In"
                  style={styles.loginButton}
                  onPress={handleLogin}
                />

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  subText: {
    fontSize: 16,
    color: "#E0E0E0",
    marginTop: 8,
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputStyle: {
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 15,
    height: 55,
    fontSize: 16,
    color: "#333",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: "#C67C4E",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#00512C",
    borderRadius: 15,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#00512C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    paddingBottom: 20,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  signUpLink: {
    color: "#C67C4E",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default LoginScreen;
