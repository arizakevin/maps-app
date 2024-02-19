// Array of if interesting places in San Francisco

interface Marker {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  name: string;
}

export const markers: Marker[] = [
  {
    latitude: 37.8025259,
    longitude: -122.4351431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'San Francisco City Center',
  },
  {
    latitude: 37.7896386,
    longitude: -122.421646,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Ferry Building',
  },
  {
    latitude: 37.776685,
    longitude: -122.394032,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Pier 39',
  },
  {
    latitude: 37.808000,
    longitude: -122.417743,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Fisherman\'s Wharf',
  },
  {
    latitude: 37.769996,
    longitude: -122.466761,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Golden Gate Park',
  },
  {
    latitude: 37.769031,
    longitude: -122.483772,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Golden Gate Bridge',
  },
  {
    latitude: 37.774929,
    longitude: -122.419416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Chinatown',
  },
  {
    latitude: 37.808000,
    longitude: -122.417743,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Alcatraz Island',
  },
  {
    latitude: 37.774929,
    longitude: -122.419416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Lombard Street',
  },
  {
    latitude: 37.774929,
    longitude: -122.419416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Palace of Fine Arts',
  },
  {
    latitude: 37.774929,
    longitude: -122.419416,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: 'Coit Tower',
  },
]
