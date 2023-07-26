import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import firebase from "../../firebase/config";

export const CreatePostsScreen = ({ navigation }) => {
  const { userId, userName, userPhoto } = useSelector((state) => state.auth);
  const { width } = useWindowDimensions();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [locality, setLocality] = useState("");
  const isCanPublish =
    locality.trim() !== "" && photoName.trim() !== "" && photo;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const cancelPublication = () => {
    setPhoto(null);
    setPhotoName("");
    setLocality("");
  };

  const uploadImageToStorage = async () => {
    try {
      const response = await fetch(photo.uri);
      const file = await response.blob();
      await firebase.storage().ref(`postImage/${photo.id}`).put(file);
    } catch (error) {
      console.log(error);
    }

    const processedPhoto = await firebase
      .storage()
      .ref("postImage")
      .child(photo.id)
      .getDownloadURL();

    return processedPhoto;
  };

  const sendPost = async () => {
    if (!isCanPublish) return Alert.alert("Заповніть всі поля");

    let location = await Location.getCurrentPositionAsync({});
    const date = Date.now().toString();
    const photo = await uploadImageToStorage();

    await firebase.firestore().collection("Posts").add({
      photo,
      photoName,
      locality,
      userId,
      userName,
      userPhoto,
      location,
      date,
    });

    navigation.navigate("PostsScreen");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.goBackArrow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("PostsScreen")}
          >
            <Feather
              style={{ marginLeft: 16 }}
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Створити публікацію</Text>
        </View>

        <Camera style={styles.camera} ref={setCameraRef}>
          {photo ? (
            <ImageBackground
              style={{ ...styles.photoView, width: "100%", height: "100%" }}
              source={photo}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cameraTakePhotoBtn}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    setPhoto(asset);
                  }
                }}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <View style={styles.photoView}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cameraTakePhotoBtn}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    setPhoto(asset);
                  }
                }}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          )}
        </Camera>

        <Text
          style={{
            ...styles.textFields,
            marginLeft: 16,
            marginBottom: 32,
            color: "#BDBDBD",
          }}
        >
          {photo ? "Редагувати фото" : "Завантажити фото"}
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.inputsWrapper}>
            <TextInput
              placeholderTextColor="#BDBDBD"
              value={photoName}
              onChangeText={setPhotoName}
              style={{ ...styles.textFields, ...styles.inputs }}
              placeholder="Назва..."
              onFocus={() => setIsShowKeyboard(true)}
              onBlur={() => setIsShowKeyboard(false)}
            />
            <View
              style={{
                ...styles.inputs,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 4,
              }}
            >
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <TextInput
                placeholderTextColor="#BDBDBD"
                style={styles.textFields}
                placeholder="Місцевість..."
                value={locality}
                onChangeText={setLocality}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.publishBtn,
            backgroundColor: isCanPublish ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={sendPost}
        >
          <Text
            style={{
              ...styles.textFields,
              color: isCanPublish ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ ...styles.deleteBtn, marginHorizontal: width / 2 - 35 }}
          onPress={cancelPublication}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    position: "relative",
    paddingTop: 44,
    paddingBottom: 11,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  goBackArrow: {
    position: "absolute",
    bottom: 8,
    left: -5,
    paddingTop: 5,
    paddingHorizontal: 5,
    zIndex: 999,
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
  camera: {
    width: 343,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },
  photoView: {
    flex: 1,
    width: 343,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraTakePhotoBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "FFFFFF",
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textFields: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputsWrapper: {
    marginHorizontal: 16,
    marginBottom: 32,
    rowGap: 16,
  },
  inputs: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  publishBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 100,

    marginHorizontal: 16,
    marginBottom: 120,
  },
  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 70,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});
