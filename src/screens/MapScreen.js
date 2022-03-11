import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
export default function MapScreen() {
  const [latitude, setlatitude] = useState(37.78825);
  const [longitude, setlongitude] = useState(-122.4324);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      let lat = info.coords.latitude;
      let lon = info.coords.longitude;
      setlatitude(lat ? lat : 37.78825);
      setlongitude(lon ? lon : -122.4324);
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{latitude: latitude, longitude: longitude}}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
