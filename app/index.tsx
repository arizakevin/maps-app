import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const Page = () => {
  const [region, setRegion] = React.useState(INITIAL_REGION)
  const mapRef = useRef<MapView>(null)

  const onRegionChange = (region: Region) => {
    console.log('onRegionChange', region);
    setRegion(region)
  }

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
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        style={StyleSheet.absoluteFill}
        initialRegion={region}
        showsMyLocationButton
        showsIndoors
        showsCompass
        showsBuildings
        showsScale
        showsTraffic
        showsIndoorLevelPicker
        showsUserLocation
        showsPointsOfInterest
        onRegionChange={onRegionChange}
      />

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
    top: 10,
    right: 10,
    gap: 10,
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