import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const mockCarparks = [
  {
    id: 'latrobe_visitors',
    name: 'La Trobe Visitors Car Park',
    latitude: -37.721499,
    longitude: 145.048386,
    availableSpots: 0,
    priceInfo: 'Costs dependent on zones',
    notes: 'Usually all spots are taken by 9AM',
  },
  {
    id: 'carpark_8',
    name: 'Car Park 8',
    latitude: -37.717437,
    longitude: 145.048710,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
  {
    id: 'carpark_2',
    name: 'Car Park 2',
    latitude: -37.718780,
    longitude: 145.043620,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
  {
    id: 'carpark_6',
    name: 'Car Park 6',
    latitude: -37.719845,
    longitude: 145.047782,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
  {
    id: 'carpark_7',
    name: 'Car Park 7A',
    latitude: -37.720650,
    longitude: 145.046700,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
  {
    id: 'carpark_11',
    name: 'Car Park 11',
    latitude: -37.716850,
    longitude: 145.051950,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
  {
    id: 'carpark_1',
    name: 'Car Park 1',
    latitude: -37.720250,
    longitude: 145.042000,
    availableSpots: 20,
    priceInfo: 'Costs dependent on zones; more cheap zones available',
    notes: 'Usually spots available',
  },
];

async function insertCarparks() {
  try {
    const carparksCollection = collection(db, 'carparks');

    for (const carpark of mockCarparks) {
      const docRef = doc(carparksCollection, carpark.id);
      await setDoc(docRef, {
        name: carpark.name,
        latitude: carpark.latitude,
        longitude: carpark.longitude,
        availableSpots: carpark.availableSpots,
        priceInfo: carpark.priceInfo,
        notes: carpark.notes,
      });
      console.log(`Added ${carpark.name}`);
    }

    console.log('All carparks added successfully!');
  } catch (error) {
    console.error('Error adding carparks:', error);
  }
}

insertCarparks();
