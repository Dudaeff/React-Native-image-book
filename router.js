import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  RegistrationScreen,
  LoginScreen,
  CreatePostsScreen,
  ProfileScreen,
  PostsScreen,
} from "./Screens";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
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

export const useRoute = (isAuth) => {
  if (!isAuth)
    return (
      <AuthStack.Navigator initialRouteName="LoginScreen">
        <AuthStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );

  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Feather
              style={{ marginRight: -69 }}
              name="grid"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.addIconWrapper}>
              <MaterialIcons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          ...headerStylesOptions,
          headerShown: false,
          tabBarIcon: () => (
            <Feather
              style={{ marginLeft: -69 }}
              name="user"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          ),
        }}
      />
    </MainTab.Navigator>
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
