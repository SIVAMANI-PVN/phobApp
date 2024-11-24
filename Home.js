import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  const techniques = [
    { id: 1, name: 'Cognitive Behavioral Therapy (CBT)', route: 'CBT' },
    { id: 2, name: 'Exposure Therapy', route: 'Exposure Therapy' },
    { id: 3, name: 'Relaxation Techniques', route: 'Relaxation Techniques' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Phobia Treatment Dashboard</Text>
      <Text style={styles.subtitle}>Explore techniques to manage your phobia:</Text>
      <View style={styles.cardContainer}>
        {techniques.map((technique) => (
          <TouchableOpacity
            key={technique.id}
            style={styles.card}
            onPress={() => navigation.navigate(technique.route)}
          >
            <Text style={styles.technique}>{technique.name}</Text>
            <View style={styles.buttonWrapper}>
              <Button title="Learn More" onPress={() => navigation.navigate(technique.route)} color="#007BFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Button title="Back to Main" onPress={() => navigation.navigate('Main')} color="#841584" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  technique: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  footer: {
    marginTop: 20,
    width: '90%',
  },
});
