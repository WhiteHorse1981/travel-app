import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from './Screens/auth/RegistrationScreen.jsx';
import LoginScreen from './Screens/auth/LoginScreen.jsx';
import PostsScreen from './Screens/MainScreens/PostsScreen.jsx';
import CreatePostsScreen from './Screens/MainScreens/CreatePostsScreen.jsx';
import ProfileScreen from './Screens/MainScreens/ProfileScreen.jsx';

// icons import
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveBackgroundColor: '#011f3b',
        tabBarActiveBackgroundColor: '#032845',
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarLabel: 'Posts',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={focused ? 28 : 24}
              color={focused ? '#FF6C00' : '#4D4D4D'}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarLabel: 'CreatePosts',
          headerTitleStyle: {
            color: '#212121',
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarShowLabel: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add" size={focused ? 32 : 24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={focused ? 28 : 24} color={focused ? '#FF6C00' : '#4D4D4D'} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
