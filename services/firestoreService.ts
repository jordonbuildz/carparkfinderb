import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebaseConfig';

const db = getFirestore(firebaseApp);

export async function fetchCarparks() {
  const carparksCol = collection(db, 'carparks');
  const carparksSnapshot = await getDocs(carparksCol);
  const carparksList = carparksSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      availableSpots: data.availableSpots,
      priceInfo: data.priceInfo,
      notes: data.notes,
    };
  });

  return carparksList;
}
