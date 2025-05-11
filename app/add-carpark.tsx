import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebaseConfig';
import { useRouter } from 'expo-router';

const db = getFirestore(firebaseApp);

export default function AddCarParkScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [availableSpots, setAvailableSpots] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddCarpark = async () => {
    if (!name || !latitude || !longitude) {
      Alert.alert('Error', 'Name, latitude and longitude are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'carparks'), {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        availableSpots: parseInt(availableSpots) || 0,
        priceInfo,
        notes,
      });
      Alert.alert('Success', 'Car park added successfully!');
      router.push('/'); // Go back to home
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to add car park.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Car Park</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#222"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        placeholderTextColor="#222"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        placeholderTextColor="#222"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Available Spots"
        placeholderTextColor="#222"
        value={availableSpots}
        onChangeText={setAvailableSpots}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Price Info"
        placeholderTextColor="#222"
        value={priceInfo}
        onChangeText={setPriceInfo}
      />

      <TextInput
        style={styles.input}
        placeholder="Notes"
        placeholderTextColor="#222"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Car Park" onPress={handleAddCarpark} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
