import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  // const { longitude, latitude } = route?.params?.location;
  const { coords } = route?.params?.location;
  console.log('coords', coords);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coords?.latitude,
          longitude: coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          }}
        />
      </MapView>
    </View>
  );
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
});
