import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchCarparks } from '@/services/firestoreService';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CarParkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [carpark, setCarpark] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    async function loadCarpark() {
      const carparks = await fetchCarparks();
      const found = carparks.find((carpark) => carpark.id === id);
      setCarpark(found);
      setLoading(false);

      const favourites = await AsyncStorage.getItem('favourites');
      if (favourites) {
        const favouritesArray = JSON.parse(favourites);
        if (favouritesArray.includes(id)) {
          setIsFavourite(true);
        }
      }
    }
    loadCarpark();
  }, [id]);

  const toggleFavourite = async () => {
    const favourites = await AsyncStorage.getItem('favourites');
    let favouritesArray = favourites ? JSON.parse(favourites) : [];

    if (isFavourite) {
      favouritesArray = favouritesArray.filter((fav: string) => fav !== id);
    } else {
      favouritesArray.push(id);
    }

    await AsyncStorage.setItem('favourites', JSON.stringify(favouritesArray));
    setIsFavourite(!isFavourite);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!carpark) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Car Park not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{carpark.name}</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Available Spots:</Text>
          <Text style={styles.value}>{carpark.availableSpots ?? 'Unknown'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Price Info:</Text>
          <Text style={styles.value}>{carpark.priceInfo ?? 'Unknown'}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.value}>{carpark.notes ?? 'None'}</Text>
        </View>

        {/* Favourite Button */}
        <TouchableOpacity style={styles.favouriteButton} onPress={toggleFavourite}>
          <Text style={styles.favouriteButtonText}>
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#777',
  },
  favouriteButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  favouriteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 100,
  },
});
