import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function MapScreen({ route }) {
  console.log('route.params', route.params.location)

  const { longitude, latitude } = route.params.location

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
