import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  useWindowDimensions,
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import backgroundImage from "../assets/images/authPagesBgrnd.png";
import iconAdd from "../assets/images/add.png";

export const RegistrationScreen = () => {
  const [isLoginFocused, setIsLoginInputFocused] = useState(false);
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={backgroundImage} style={styles.imageBgrnd}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                ...styles.container,
                marginBottom: !isShowKeyboard ? 0 : -180,
              }}
            >
              <View style={{ ...styles.formWrapper, width }}>
                <View
                  style={{
                    ...styles.avatarWrapper,
                    marginHorizontal: width / 3,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.addImageBtn}
                  >
                    <ImageBackground
                      source={iconAdd}
                      style={{ width: 25, height: 25 }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.inputsWrapper}>
                  <TextInput
                    style={{
                      ...styles.textInput,
                      borderColor: isLoginFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isLoginFocused ? "#FFFFFF" : "#F6F6F6",
                    }}
                    placeholder="Логін"
                    onFocus={() => {
                      setIsLoginInputFocused(true);
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => {
                      setIsLoginInputFocused(false);
                      setIsShowKeyboard(false);
                    }}
                  />
                  <TextInput
                    style={{
                      ...styles.textInput,
                      borderColor: isEmailInputFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isEmailInputFocused
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    placeholder="Адрес електронної пошти"
                    keyboardType="email-address"
                    onFocus={() => {
                      setIsEmailInputFocused(true);
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => {
                      setIsEmailInputFocused(false);
                      setIsShowKeyboard(false);
                    }}
                  />
                  <TextInput
                    style={{
                      ...styles.textInput,
                      borderColor: isPasswordInputFocused
                        ? "#FF6C00"
                        : "#E8E8E8",
                      backgroundColor: isPasswordInputFocused
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    placeholder="Пароль"
                    secureTextEntry={true}
                    onFocus={() => {
                      setIsPasswordInputFocused(true);
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => {
                      setIsPasswordInputFocused(false);
                      setIsShowKeyboard(false);
                    }}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.showPasswordBtn}
                  >
                    <Text style={styles.showPasswordBtnText}>Показати</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.registerBtn}
                >
                  <Text style={styles.registerBtnText}>Зареєструватись</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.redirectBtn}
                >
                  <Text style={styles.redirectBtnText}>
                    Вже є обліковий запис? Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },
  imageBgrnd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  formWrapper: {
    height: 549,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatarWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addImageBtn: {
    position: "absolute",
    left: 107,
    top: 81,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
  },
  inputsWrapper: {
    rowGap: 16,
    marginHorizontal: 16,
    marginBottom: 43,
  },
  textInput: {
    position: "relative",
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#212121",
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },

  showPasswordBtn: {
    position: "absolute",
    bottom: 30,
    right: 16,
  },
  showPasswordBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  registerBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  redirectBtn: {
    alignItems: "center",
  },
  redirectBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
