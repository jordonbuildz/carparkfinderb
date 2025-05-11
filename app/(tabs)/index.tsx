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

  const handleMarkerPress = (id: string) => {
    router.push(`/carpark/${id}`);
  };

  const handleFavouritesPress = async () => {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites) {
      router.push('/favourites');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

  
    const filtered = mockCarparks.filter(carpark =>
      carpark.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCarparks(filtered);
  };

  const handleSuggestionPress = (id: string) => {
  
    router.push(`/carpark/${id}`);
    setSearchQuery('');
    setFilteredCarparks([]);
  };

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
        {/* MAP */}
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

        {/* Search + Add Button */}
        <View style={[
          styles.controlsContainer,
          { top: keyboardVisible ? 50 : undefined, bottom: keyboardVisible ? undefined : 20 }
        ]}>
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

        {/* Suggestions List */}
        {filteredCarparks.length > 0 && (
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
            style={[styles.suggestionList, { top: 120, bottom: 70 }]}  
          />
        )}

        {/* Favourites Button */}
        <TouchableOpacity
          style={[
            styles.favouritesButton,
            { bottom: keyboardVisible ? 150 : 120 } 
          ]}
          onPress={handleFavouritesPress}
        >
          <Text style={styles.favouritesButtonText}>❤️ Favourites</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
  suggestionList: {
    position: 'absolute',
  },
});
