import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import profileImage from "../../assets/images/profile-image.jpg";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userPost}>
        <View style={styles.postImageWrapper}>
          <Image source={profileImage} />
        </View>
        <View>
          <Text style={styles.userNameText}>Natali Romanova</Text>
          <Text style={styles.userEmailText}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.postThumb}>
              <Image source={{ uri: item.photo }} style={styles.postPhoto} />
              <Text style={styles.photoTitle}>{item.photoName}</Text>
              <View style={styles.interactiveBlock}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("CommentsScreen")}
                >
                  <Text style={styles.comentsText}>
                    <Feather name="message-circle" size={24} color="#BDBDBD" />{" "}
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                >
                  <Text style={styles.locationText}>
                    <Feather name="map-pin" size={24} color="#BDBDBD" />{" "}
                    {item.locality}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  postImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userPost: {
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  userNameText: {
    fontFamily: "Roboto-Bold",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmailText: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postThumb: { marginHorizontal: 16, marginBottom: 32 },
  postPhoto: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  interactiveBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comentsText: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    color: "#212121",
  },
});
