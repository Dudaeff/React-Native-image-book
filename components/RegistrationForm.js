import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
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
import { authSignUp } from "../redux/auth/operations";
import backgroundImage from "../assets/images/authPagesBgrnd.png";
import firebase from "../firebase/config";

export const RegistrationForm = () => {
  const [isLoginFocused, setIsLoginInputFocused] = useState(false);
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onShowPassword = () => setIsHidePassword((prevState) => !prevState);

  const isEmpty =
    login.trim() === "" || email.trim() === "" || password.trim() === "";

  const uploadImageToStorage = async (source) => {
    const uniquePostId = Date.now().toString();

    const response = await fetch(source);
    const blob = await response.blob();

    let ref = firebase
      .storage()
      .ref(`userProfilePhoto/${uniquePostId}`)
      .put(blob);

    try {
      await ref;
    } catch (error) {
      console.log(error);
    }

    const processedPhoto = await firebase
      .storage()
      .ref("userProfilePhoto")
      .child(uniquePostId)
      .getDownloadURL();

    setUserPhoto(processedPhoto);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = result.assets[0].uri;

    if (source) {
      await uploadImageToStorage(source);
    }
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (isEmpty) {
      Alert.alert("Заповніть всі поля");
      return;
    }
    dispatch(authSignUp({ userName: login, email, password, userPhoto }));
    setLogin("");
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImageBackground source={backgroundImage} style={styles.imageBgrnd}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.container,
                marginBottom: !isShowKeyboard ? 0 : -180,
              }}
            >
              <View style={{ ...styles.formWrapper, width }}>
                {!userPhoto ? (
                  <View
                    style={[
                      styles.box,
                      {
                        transform: [{ translateX: -35 }],
                      },
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="ios-add-circle-outline"
                        size={36}
                        color="#FF6C00"
                        onPress={pickImage}
                      />
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.box,
                      {
                        transform: [{ translateX: -35 }],
                      },
                    ]}
                  >
                    <ImageBackground
                      style={[
                        styles.boxPhoto,
                        {
                          overflow: "hidden",
                        },
                      ]}
                      source={{
                        uri: userPhoto,
                      }}
                    />
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="ios-add-circle-outline"
                        size={36}
                        color="#000000"
                        onPress={uploadImageToStorage}
                      />
                    </View>
                  </View>
                )}

                <Text style={styles.title}>Реєстрація</Text>
                <View
                  style={{
                    ...styles.inputsWrapper,
                    marginHorizontal: width > 480 ? 32 : 16,
                  }}
                >
                  <TextInput
                    onChangeText={setLogin}
                    value={login}
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
                  <Text style={styles.registerBtnText}>Зареєструватись</Text>
                </TouchableOpacity>
                <View style={styles.redirectBtn}>
                  <Text style={styles.redirectBtnText}>
                    Вже є обліковий запис?{" "}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("LoginScreen")}
                    >
                      <Text
                        style={{ ...styles.redirectBtnText, paddingTop: 3 }}
                      >
                        Увійти
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
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
    height: 549,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  iconContainer: {
    position: "absolute",
    bottom: 13,
    right: -19,
  },
  box: {
    position: "relative",
    width: 120,
    height: 120,
    marginTop: -60,
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    left: "44%",
  },
  boxPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
