import { StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { mockCarparks } from '@/constants/carpark'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [filteredCarparks, setFilteredCarparks] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(true); // State to control welcome notification visibility

  // Navigates to a specific carpark detail page based on ID
  const handleMarkerPress = (id: string) => {
    router.push(`/carpark/${id}`);
  };

  // Opens the favourites screen if user has any stored favourites
  const handleFavouritesPress = async () => {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites) {
      router.push('/favourites');
    }
  };

  // Filters the carpark list based on the search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockCarparks.filter(carpark =>
      carpark.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCarparks(filtered);
  };

  // When a user selects a suggestion from the list
  const handleSuggestionPress = (id: string) => {
    router.push(`/carpark/${id}`);
    setSearchQuery('');
    setFilteredCarparks([]);
  };

  // Detect keyboard show/hide events to adjust component layout accordingly
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.fullContainer}>
        {/* Map View showing all carpark markers */}
        <View style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: -37.7175,
              longitude: 145.0480,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {mockCarparks.map((carpark) => (
              <Marker
                key={carpark.id}
                coordinate={{
                  latitude: carpark.latitude,
                  longitude: carpark.longitude,
                }}
                title={carpark.name}
                description={carpark.notes}
                onPress={() => handleMarkerPress(carpark.id)}
              />
            ))}
          </MapView>
        </View>

        {/* Search bar and Add Carpark button */}
        <View style={[styles.controlsContainer, { top: keyboardVisible ? 50 : undefined, bottom: keyboardVisible ? undefined : 50 }]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for locations"
            placeholderTextColor="#222"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/add-carpark')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Suggestions dropdown from search input */}
        {filteredCarparks.length > 0 && (
          <View style={styles.suggestionWrapper}>
            <FlatList
              data={filteredCarparks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.suggestionItem} 
                  onPress={() => handleSuggestionPress(item.id)}
                >
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Favourites quick-access button */}
        <TouchableOpacity
          style={[styles.favouritesButton, { bottom: keyboardVisible ? 150 : 120 }]}
          onPress={handleFavouritesPress}
        >
          <Text style={styles.favouritesButtonText}>❤️ Favourites</Text>
        </TouchableOpacity>

        {/* Welcome screen that appears on app launch */}
        {showWelcome && (
          <View style={styles.welcomeOverlay}>
            <View style={styles.welcomeBox}>
              <Text style={styles.welcomeTitle}>Welcome to CarParkFinder!</Text>
              <Text style={styles.welcomeMessage}>
                🅿️ Find available car parks near your location.
                {"\n\n"}❤️ Save your favourites for quick access.
                {"\n\n"}📍 Tap on any marker to view more details.
                {"\n\n"}➕ Add your own car parks to the map!
              </Text>
              <TouchableOpacity 
                style={styles.findButton} 
                onPress={() => setShowWelcome(false)}
              >
                <Text style={styles.findButtonText}>Find Car Parks</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// StyleSheet used across the UI components
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  mapContainer: {
    flex: 1,
    zIndex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 2,
    bottom: 20, 
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  favouritesButton: {
    position: 'absolute',
    left: 20,
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    zIndex: 3, 
  },
  favouritesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionWrapper: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 4,
    zIndex: 10,
    maxHeight: 150,
    elevation: 6,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
  welcomeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  welcomeBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  findButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  findButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
