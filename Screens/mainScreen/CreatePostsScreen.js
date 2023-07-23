import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";

export const CreatePostsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [locality, setLocality] = useState("");
  const isCanPublish = locality && photoName && photo;

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

  const deletePublication = () => {
    setPhoto(null);
    setPhotoName("");
    setLocality("");
  };

  const sendPost = async () => {
    if (!isCanPublish) return;

    let location = await Location.getCurrentPositionAsync({});

    navigation.navigate("DefaultPostsScreen", {
      photo: photo.uri,
      photoName,
      locality,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
    deletePublication();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCameraRef}>
        <ImageBackground style={styles.photoView} source={photo}>
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

      <View style={styles.inputsWrapper}>
        <TextInput
          placeholderTextColor="#BDBDBD"
          value={photoName}
          onChangeText={setPhotoName}
          style={{ ...styles.textFields, ...styles.inputs }}
          placeholder="Назва..."
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
          />
        </View>
      </View>
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
        onPress={deletePublication}
      >
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  camera: {
    width: 343,
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  photoView: {
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
