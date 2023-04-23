import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import db from '../../firebase/config'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { authSignOutUser } from '../../redux/auth/authOperations'

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([])
  const { userId, photo, login } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const getUsersPost = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
  }

  useEffect(() => {
    getUsersPost()
  }, [])

  const signOut = () => {
    dispatch(authSignOutUser())
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/photo-bg.jpg')}
        style={styles.image}
      >
        <View style={styles.box}>
          <TouchableOpacity style={styles.out} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: -60,
              left: '35%',
            }}
          >
            <Image source={{ uri: photo }} style={styles.avatar} />
          </View>
          <Text style={styles.login}>{login}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 32 }}>
                <View>
                  <Image source={{ uri: item.photo }} style={styles.img} />
                  <Text style={styles.title}>{item.title.value}</Text>
                </View>
                <View style={styles.wraper}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.comments}
                      onPress={() =>
                        navigation.navigate('Comments', {
                          postId: item.id,
                          photo: item.photo,
                        })
                      }
                    >
                      <FontAwesome name="comment" size={24} color="#FF6C00" />
                      <Text style={styles.commentsCount}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.comments, marginLeft: 24 }}
                      // onPress={() =>
                      //   navigation.navigate('Comments', {
                      //     postId: item.id,
                      //     photo: item.photo,
                      //   })
                      // }
                    >
                      <AntDesign name="like2" size={24} color="#FF6C00" />
                      <Text style={styles.commentsCount}>0</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ display: 'flex', flexDirection: 'row' }}
                      onPress={() =>
                        navigation.navigate('Map', {
                          location: item.location,
                        })
                      }
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                      <Text style={styles.place}>{item.place.value}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 22,
    paddingBottom: 11,
    height: 665,
  },
  out: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  login: {
    marginTop: 46,
    marginBottom: 33,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,

    color: '#212121',
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  wraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  comments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsCount: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  place: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',

    color: '#212121',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
})
