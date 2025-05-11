import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavouritesScreen() {
  const [favouriteCarparks, setFavouriteCarparks] = useState<string[]>([]);

  useEffect(() => {
    async function loadFavourites() {
      const favourites = await AsyncStorage.getItem('favourites');
      
      const favouritesArray = favourites ? JSON.parse(favourites) : [];

      if (Array.isArray(favouritesArray)) {
        setFavouriteCarparks(favouritesArray);
      }
    }

    loadFavourites();
  }, []);

  const handleRemoveFavourite = async (id: string) => {
    let favourites = await AsyncStorage.getItem('favourites');
    
    favourites = favourites ? JSON.parse(favourites) : [];

    // Check that favourites is an array before calling .filter()
    if (Array.isArray(favourites)) {
      const updatedFavourites = favourites.filter((fav: string) => fav !== id);

      await AsyncStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      setFavouriteCarparks(updatedFavourites);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourites</Text>
      <ScrollView>
        {favouriteCarparks.length === 0 ? (
          <Text style={styles.noFavouritesText}>No favourites added yet.</Text>
        ) : (
          favouriteCarparks.map((id: string) => (
            <View key={id} style={styles.carparkItem}>
              <Text style={styles.carparkText}>Car Park ID: {id}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavourite(id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noFavouritesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  carparkItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  carparkText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
