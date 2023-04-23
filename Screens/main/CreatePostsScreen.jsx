import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import { Camera, CameraType } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'
import db from '../../firebase/config'
import { nanoid } from 'nanoid'

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState(null)
  const [place, setPlace] = useState('')

  const { userId, login } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
      let locationRes = await Location.getCurrentPositionAsync({})
      setLocation(locationRes)
    })()
  }, [])

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync()
    setPhoto(uri)
  }

  const sendData = () => {
    uploadPostToServer()
    navigation.navigate('Home')
    setPhoto('')
    setTitle('')
    setPlace('')
  }

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer()
    const createPost = await db.firestore().collection('posts').add({
      photo,
      title,
      location: location.coords,
      place,
      userId,
      login,
    })
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo)
    const file = await response.blob()

    const uniquePostId = nanoid()

    await db.storage().ref(`postImage/${uniquePostId}`).put(file)

    const processedPhoto = await db
      .storage()
      .ref('postImage')
      .child(uniquePostId)
      .getDownloadURL()

    return processedPhoto
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          )}
          {!photo && (
            <TouchableOpacity onPress={takePhoto} style={styles.snap}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          )}
          {photo && (
            <TouchableOpacity
              onPress={() => {
                setPhoto('')
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </Camera>
        <Text style={styles.text}>
          {!photo ? 'Завантажити фото' : 'Редагувати фото'}
        </Text>
        <View>
          <TextInput
            style={styles.title}
            placeholder={'Назва...'}
            value={title}
            onChangeText={(value) => {
              setTitle((prev) => ({ ...prev, value }))
            }}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
          />
          <TextInput
            style={styles.place}
            placeholder={'Місцевість...'}
            value={place}
            onChangeText={(value) => {
              setPlace((prev) => ({ ...prev, value }))
            }}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
          />
          <View style={{ position: 'absolute', top: 65, left: 16 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendData}>
          <Text style={styles.btnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePhotoContainer: {
    position: 'absolute',
  },
  photo: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  text: {
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
  },
  btnSubmit: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  title: {
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  place: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 28,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
})
