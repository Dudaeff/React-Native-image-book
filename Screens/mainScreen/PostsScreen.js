import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { DefaultPostsScreen } from "../nestedScreens/DefaultPostsScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const headerStylesOptions = {
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
  headerTitleAlign: "center",
};

export const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          ...headerStylesOptions,
          headerLeft: false,
          headerRight: () => (
            <Feather
              style={{ marginRight: 16 }}
              name="log-out"
              size={24}
              color="rgba(189, 189, 189, 1)"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: "Публікації",
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerLeft: () => (
            <Feather
              style={{ marginLeft: 16 }}
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate("DefaultPostsScreen")}
            />
          ),
          headerTitle: "Коментарі",
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerLeft: () => (
            <Feather
              style={{ marginLeft: 16 }}
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate("DefaultPostsScreen")}
            />
          ),
          headerTitle: "Карта",
        }}
      />
    </NestedScreen.Navigator>
  );
};
