import { View, Text, StyleSheet } from 'react-native';

type CarparkCardProps = {
  name: string;
  priceInfo: string;
  availableSpots: number;
  notes?: string;
};

export const CarparkCard = ({
  name,
  priceInfo,
  availableSpots,
  notes,
}: CarparkCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.text}>💰 {priceInfo}</Text>
      <Text style={styles.text}>🚗 {availableSpots} spots available</Text>
      {notes && <Text style={styles.notes}>📌 {notes}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  notes: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 6,
    color: '#555',
  },
});
