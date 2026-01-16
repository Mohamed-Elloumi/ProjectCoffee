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
  Keyboard,
  ScrollView
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RegisterBG } from "../assets/images";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { RootStackParamList } from "../navigations/types";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert("Succès", "Compte créé avec succès");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <ImageBackground
          source={RegisterBG}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardView}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.headerContainer}>
                  <Text style={styles.joinText}>Join Us</Text>
                  <Text style={styles.subText}>Start your journey with the perfect cup.</Text>
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
                      placeholder="Create a password"
                      value={password}
                      onChangeText={setPassword}
                      style={styles.inputStyle}
                      secureTextEntry={true}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      style={styles.inputStyle}
                      secureTextEntry={true}
                    />
                  </View>

                  <Button
                    title="Create Account"
                    style={styles.registerButton}
                    onPress={handleRegister}
                  />

                  <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
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
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  headerContainer: {
    paddingHorizontal: 30,
    marginBottom: 35,
    marginTop: 60,
  },
  joinText: {
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
    paddingBottom: 40,
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
  registerButton: {
    backgroundColor: "#00512C",
    borderRadius: 15,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  signInLink: {
    color: "#C67C4E",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default RegisterScreen;
