import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Platform,
} from "react-native";
import firebase from "../../firebase/config";
import { selectUserPhoto } from "../../redux/auth/selectors";

export const CommentsScreen = ({ route }) => {
  const { postId, image } = route.params;
  const userPhoto = useSelector(selectUserPhoto);
  const flatListRef = useRef(null);

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const date = new Date().toLocaleString();

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    firebase
      .firestore()
      .collection("Posts")
      .doc(postId)
      .collection("Comments")
      .orderBy("date")
      .onSnapshot((data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  const createComment = async () => {
    await firebase
      .firestore()
      .collection("Posts")
      .doc(postId)
      .collection("Comments")
      .add({
        date,
        comment,
        userPhoto,
      });
  };

  const handleCommentChange = (value) => setComment(value);

  const handleSubmit = () => {
    createComment();
    if (allComments.length > 0) {
      flatListRef.current.scrollToEnd();
    }
    setComment("");
    Keyboard.dismiss();
  };

  return (
    <View
      style={{ ...styles.container, marginBottom: !isShowKeyboard ? 0 : 200 }}
    >
      <View style={styles.galleryItem}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.galleryItemImage}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={allComments}
        style={styles.commentContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image source={{ uri: item.userPhoto }} style={styles.userPhoto} />

            <View style={styles.commentTextWrapper}>
              <Text style={styles.commentText}>{item.comment}</Text>

              <Text style={styles.commentData}>{item.date}</Text>
            </View>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={comment}
            onChangeText={handleCommentChange}
            style={styles.input}
            placeholder="Коментувати..."
            onFocus={() => setIsShowKeyboard(true)}
            onBlur={() => setIsShowKeyboard(false)}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.sendBtn}>
            <AntDesign
              style={styles.sendIcon}
              name="arrowup"
              size={24}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    position: "relative",
    paddingTop: 55,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  arrowleftIcon: {
    position: "absolute",
    paddingHorizontal: 16,
    top: 54,
  },
  galleryItem: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
  galleryItemImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  userPhoto: {
    width: 32,
    height: 32,
    borderRadius: 50,
  },
  commentContainer: {
    display: "flex",
    gap: 24,
    marginHorizontal: 16,
    marginBottom: 31,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  commentTextWrapper: {
    width: "100%",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentData: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  inputContainer: {
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    paddingVertical: 16,
    paddingLeft: 16,
    marginBottom: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 9,
    right: 9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
  },
});
