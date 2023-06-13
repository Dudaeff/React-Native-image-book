import { Image, StyleSheet, View, Text } from "react-native";

import profileImage from "../../assets/images/profile-image.jpg";

export const PostsScreen = () => {
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
});
