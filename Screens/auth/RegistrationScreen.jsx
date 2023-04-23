import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
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
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  mail: "",
  password: "",
  login: "",
  photo: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [camera, setCamera] = useState(null);

  const dispatch = useDispatch();

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const photo = await camera.takePictureAsync();
    setState((prev) => ({ ...prev, photo: photo.uri }));
  };

  const registration = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state)).then(console.log).catch(alert);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/img/photo-bg.jpg")}
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
                  paddingBottom: isShowKeyboard ? 0 : 78,
                },
              }),
            }}
          >
            <Camera
              style={styles.camera}
              ref={setCamera}
              type={CameraType.front}
            >
              {state.photo && (
                <>
                  <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: state.photo }} style={styles.photo} />
                  </View>
                </>
              )}
            </Camera>
            {state.photo && (
              <TouchableOpacity
                onPress={() => {
                  setState((prev) => ({ ...prev, photo: "" }));
                }}
                style={{
                  position: "absolute",
                  bottom: 510,
                  right: 136,
                  width: 24,
                  height: 24,
                  backgroundColor: "#ffffff",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#E8E8E8",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="close" size={20} color="#BDBDBD" />
              </TouchableOpacity>
            )}
            {!state.photo && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 510,
                  right: 136,
                }}
                onPress={takePhoto}
              >
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            )}
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                value={state.login}
                style={styles.input}
                placeholder="Логін"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) => {
                  setState((prev) => ({ ...prev, login: value }));
                }}
              />
              <TextInput
                value={state.mail}
                style={styles.input}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) => {
                  setState((prev) => ({ ...prev, mail: value }));
                }}
              />
              <View style={{ position: "relative" }}>
                <TextInput
                  value={state.password}
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={isPasswordSecure}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) => {
                    setState((prev) => ({ ...prev, password: value }));
                  }}
                />
                <Text
                  onPress={() => {
                    setIsPasswordSecure(!isPasswordSecure);
                  }}
                  style={styles.showPassword}
                >
                  {isPasswordSecure ? "Показати" : "Приховати"}
                </Text>
              </View>

              <TouchableOpacity style={styles.btn} onPress={registration}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Вже є аккаунт? Увійти</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 78,
    // height: 549,
  },
  camera: {
    position: "absolute",
    top: -60,
    left: "35%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",

    borderRadius: 16,
    overflow: "hidden",
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    marginBottom: 16,
    // marginTop: 92,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    backgroundColor: "#F6F6F6",

    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 43,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  showPassword: {
    position: "absolute",
    top: 32,
    right: 32,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  takePhotoContainer: {
    position: "absolute",
  },
});
