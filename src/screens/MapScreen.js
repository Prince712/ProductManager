import React, {useEffect, useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {
  Spinner,
  HStack,
  Heading,
  Center,
} from 'native-base';
import MapView from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
export default function MapScreen({navigation}) {
  const [latitude, setlatitude] = useState(0);
  const [longitude, setlongitude] = useState(0);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    requestLocationPermission()
  }, []);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Permission',
          'message': 'This App needs access to your location ' +
                     'so we can know where you are.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            // info => {

            ({ coords }) => {
              console.log("coords: ", coords)
              let lat = coords.latitude;
            let lon = coords.longitude;
            setlatitude(lat ? lat : 37.78825);
            setlongitude(lon ? lon : -122.4324);
            setloading(false)
          },
          (errObject) => {
              console.log("message: ", errObject) // it gets thrown her
              setlatitude(21.1702);
              setlongitude(72.8311);
              setloading(false)
          }
          );
      } else {
        console.log("Location permission denied")
        navigation.goBack();
      }
    } catch (err) {
      console.warn(err)
    }
  }

  if (loading) {
    return (
      <Center flex={1} px="3">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    );
  }

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
