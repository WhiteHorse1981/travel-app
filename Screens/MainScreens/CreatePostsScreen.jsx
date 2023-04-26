import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  Alert,
} from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import db from '../../firebase/config';
import { nanoid } from 'nanoid';

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState('');

  console.log('location', location);

  const { userId, login } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log('locationuseEffect', location);
    })();
  }, []);

  const takePhoto = async () => {
    console.log('locationtakePhoto', location);
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const createPost = await db.firestore().collection('posts').add({
        photo,
        title,
        // location,
        location: location?.coords,
        place,
        userId,
        login,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePostId = nanoid();

      await db.storage().ref(`postImage/${uniquePostId}`).put(file);

      const processedPhoto = await db
        .storage()
        .ref('postImage')
        .child(uniquePostId)
        .getDownloadURL();

      return processedPhoto;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const sendData = () => {
    uploadPostToServer();
    if (title.trim() && place.trim()) {
      navigation.navigate('Home');
      setPhoto('');
      setTitle('');
      setPlace('');
    } else {
      Alert.alert('Please fill in the fields');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            )}
            {!photo ? (
              <TouchableOpacity onPress={takePhoto} style={styles.snap}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={takePhoto}
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
        </View>
        <Text style={styles.text}>{!photo ? 'Upload a photo' : 'Edit photo'}</Text>
        <View>
          <TextInput
            style={styles.title}
            placeholder={'Name...'}
            value={title}
            onChangeText={setTitle}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <TextInput
            style={styles.place}
            placeholder={'Terrain...'}
            value={place}
            onChangeText={setPlace}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <View style={{ position: 'absolute', top: 80, left: 16 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendData}>
          <Text style={styles.btnText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cameraContainer: {
    borderRadius: 8,
  },
  camera: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
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
    borderRadius: 8,
    width: Dimensions.get('window').width - 32,
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
    // color: '#fff',
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
});
