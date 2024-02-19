import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import MapView, { Circle, PROVIDER_GOOGLE, Polygon, Polyline, Region } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { mapStyle } from '@/assets/mapStyle'

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const Page = () => {
  const [region, setRegion] = React.useState(INITIAL_REGION)
  const mapRef = useRef<MapView>(null)

  // const onRegionChange = (region: Region) => {
  //   console.log('onRegionChange', region);
  //   setRegion(region)
  // }

  const focusMap = () => {
    const newYorkRegion = {
      latitude: 40.7128,
      longitude: -74.0060,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    mapRef.current?.animateToRegion(newYorkRegion, 2000)
  }

  const zoomIn = () => {
    mapRef.current?.animateCamera({ zoom: 15 })
  }

  const zoomOut = () => {
    mapRef.current?.animateCamera({ zoom: 10 })
  }

  const takeSnapshotAndShare = async () => {
    const snapshot = await mapRef.current?.takeSnapshot({
      width: 300,
      height: 300,
      result: 'base64',
    })

    const uri = FileSystem.documentDirectory + 'snapshot.png'
    await FileSystem.writeAsStringAsync(
      uri,
      snapshot!,
      { encoding: FileSystem.EncodingType.Base64 }
    )
    await shareAsync(uri)
  }
  
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails
        onPress={(data, details = null) => {
          console.log('data', data)
          console.log('details', details)
          if (details) {
            const { lat, lng } = details.geometry.location
            // mapRef.current?.animateToRegion({
            //   latitude: lat,
            //   longitude: lng,
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            // }, 2000)
            setRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
          }
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            paddingLeft: 40,
          },
          textInputContainer: {
            padding: 4,
          },
        }}
        renderLeftButton={() => (
          <View
            style={{
              position: 'absolute',
              left: 15,
              top: 14,
              zIndex: 2,
            }}
          >
            <Ionicons name='search-outline' size={24} color='black' />
          </View>
        )}
        onFail={(error) => console.error('GooglePlacesAutocomplete error', error)}
      />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        style={[StyleSheet.absoluteFill, { zIndex: -1}]}
        initialRegion={region}
        region={region}
        showsMyLocationButton
        showsIndoors
        showsCompass
        showsBuildings
        showsScale
        showsTraffic
        showsIndoorLevelPicker
        showsUserLocation
        showsPointsOfInterest
        // onRegionChange={onRegionChange}
        customMapStyle={mapStyle}
      >
        <Polyline
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.7948605, longitude: -122.4596065 },
            { latitude: 37.8025259, longitude: -122.4351431 },
          ]}
          strokeColor='blue'
          strokeWidth={6}
        />
        <Circle
          center={{ latitude: 37.8025259, longitude: -122.4351431 }}
          radius={1000}
          fillColor='rgba(0, 0, 255, 0.1)'
          strokeColor='rgba(0, 0, 255, 0.5)'
          strokeWidth={2}
        />
        <Polygon
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.8025259, longitude: -122.4351431 },
          ]}
          fillColor='rgba(0, 0, 255, 0.1)'
          strokeColor='rgba(0, 0, 255, 0.5)'
          strokeWidth={2}
        />
      </MapView>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={takeSnapshotAndShare}>
          <Ionicons name='camera' size={32} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={focusMap}>
          <Ionicons name='business' size={32} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={zoomIn}>
          <Ionicons name='add' size={32} color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={zoomOut}>
          <Ionicons name='remove' size={32} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    gap: 10,
    zIndex: -1,
  },
  btn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
  },
})

export default Page