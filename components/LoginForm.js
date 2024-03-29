import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
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
  Alert,
} from "react-native";
import { authSignIn } from "../redux/auth/operations";
import backgroundImage from "../assets/images/authPagesBgrnd.png";

export const LoginForm = () => {
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Заповніть всі поля");
      return;
    }
    dispatch(authSignIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  const onShowPassword = () => setIsHidePassword((prevState) => !prevState);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.imageBgrnd}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: !isShowKeyboard ? 0 : -270,
              }}
            >
              <View style={{ ...styles.formWrapper, width }}>
                <Text style={styles.title}>Увійти</Text>
                <View
                  style={{
                    ...styles.inputsWrapper,
                    marginHorizontal: width > 480 ? 32 : 16,
                  }}
                >
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
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
                    value={password}
                    onChangeText={setPassword}
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
                    secureTextEntry={isHidePassword}
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
                    onPress={onShowPassword}
                    activeOpacity={0.7}
                    style={styles.showPasswordBtn}
                  >
                    <Text style={styles.showPasswordBtnText}>
                      {isHidePassword ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={onSubmit}
                  activeOpacity={0.7}
                  style={{
                    ...styles.registerBtn,
                    marginHorizontal: width > 480 ? 32 : 16,
                  }}
                >
                  <Text style={styles.registerBtnText}>Увійти</Text>
                </TouchableOpacity>
                <Text style={styles.redirectBtnText}>
                  Немає акаунта?{" "}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("RegistrationScreen")}
                  >
                    <Text
                      style={{
                        ...styles.redirectBtnText,
                        paddingTop: 3,
                      }}
                    >
                      Зареєструватись
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    height: 489,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
    marginTop: 32,
  },
  inputsWrapper: {
    rowGap: 16,
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
    marginBottom: 16,
  },
  registerBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  redirectBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
