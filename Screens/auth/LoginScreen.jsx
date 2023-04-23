import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useDispatch } from 'react-redux'
import { authSignInUser } from '../../redux/auth/authOperations'

const initialState = {
  email: '',
  password: '',
}

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [state, setState] = useState(initialState)
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)

  const dispatch = useDispatch()

  const login = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    dispatch(authSignInUser(state))
    setState(initialState)
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/img/photo-bg.jpg')}
          style={styles.image}
        >
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 180 : 0,
                },
                android: {
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 0 : 140,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : ''}
            >
              <Text style={styles.title}>Вхід</Text>

              <TextInput
                value={state.email}
                style={styles.input}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  setIsShowKeyboard(true)
                }}
                onChangeText={(value) => {
                  setState((prev) => ({ ...prev, email: value }))
                }}
              />
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={state.password}
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={isPasswordSecure}
                  onFocus={() => {
                    setIsShowKeyboard(true)
                  }}
                  onChangeText={(value) => {
                    setState((prev) => ({ ...prev, password: value }))
                  }}
                />
                <Text
                  onPress={() => {
                    setIsPasswordSecure(!isPasswordSecure)
                  }}
                  style={styles.showPassword}
                >
                  {isPasswordSecure ? 'Показати' : 'Приховати'}
                </Text>
              </View>

              <TouchableOpacity style={styles.btn} onPress={login}>
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
              >
                <Text style={styles.login}>
                  Немає аккаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 144,
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
  },
  input: {
    backgroundColor: '#F6F6F6',

    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  btn: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  login: {
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  showPassword: {
    position: 'absolute',
    top: 32,
    right: 32,
    color: '#1B4371',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  },
})
