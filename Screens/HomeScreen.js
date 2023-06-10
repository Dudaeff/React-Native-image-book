import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarIcon: () => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
          tabBarShowLabel: false,
          headerLeft: false,
          headerRight: () => (
            <Feather
              style={{ marginRight: 16 }}
              name="log-out"
              size={24}
              color="rgba(189, 189, 189, 1)"
            />
          ),
          headerTitle: "Публікації",
          headerStyle: {
            boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Medium",
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <View style={styles.addIconWrapper}>
              <MaterialIcons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  addIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});
