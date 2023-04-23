import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RegistrationScreen from './Screens/auth/RegistrationScreen.jsx'
import LoginScreen from './Screens/auth/LoginScreen.jsx'
import PostsScreen from './Screens/main/PostsScreen.jsx'
import CreatePostsScreen from './Screens/main/CreatePostsScreen.jsx'
import ProfileScreen from './Screens/main/ProfileScreen.jsx'

// icons import
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

const AuthStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

export const useRoute = (isAuth) => {
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
    )
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          title: 'Створити публікацію',
          headerTitleStyle: {
            color: '#212121',
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
            background: '#FFFFFF',
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={13} color="#FFFFFF" />
          ),
          tabBarIconStyle: {
            display: 'block',
            width: 70,
            height: 40,
            backgroundColor: '#FF6C00',
            borderRadius: 20,
            marginTop: 9,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
      />
    </MainTab.Navigator>
  )
}
