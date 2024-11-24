import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Slider from '@react-native-community/slider';

export default function ExposureTherapy() {
  const [currentStep, setCurrentStep] = useState(0);
  const [anxietyLevels, setAnxietyLevels] = useState([]);

  const steps = [
    {
      id: 1,
      description: 'Look at a picture of a dog.',
      image: require('../assets/s1.jpg'), // Updated for local image path
    },
    {
      id: 2,
      description: 'Watch a video of a dog from a safe distance.',
      image: require('../assets/s2.jpg'),
    },
    {
      id: 3,
      description: 'Stand near a dog (5 meters away).',
      image: require('../assets/s3.jpg'),
    },
    {
      id: 4,
      description: 'Pet a calm dog with supervision.',
      image: require('../assets/s4.jpg'),
    },
    {
      id: 5,
      description: 'Play with a friendly dog in a controlled environment.',
      image: require('../assets/s5.jpg'),
    },
  ];

  const handleNextStep = () => {
    setAnxietyLevels([...anxietyLevels, anxietyLevel]);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setAnxietyLevel(5); // Reset anxiety level for the next step
    } else {
      showSummary();
    }
  };

  const showSummary = () => {
    const averageAnxiety = (
      anxietyLevels.reduce((sum, level) => sum + level, 0) / anxietyLevels.length
    ).toFixed(1);

    let feedback = '';
    if (averageAnxiety <= 3) {
      feedback = 'You seem very comfortable with dogs. Great progress!';
    } else if (averageAnxiety <= 6) {
      feedback = 'You are making progress, but some anxiety persists. Keep practicing!';
    } else {
      feedback = 'It seems like you’re still quite anxious. Consider seeking further guidance.';
    }

    alert(`Therapy Summary:\n\nAverage Anxiety Level: ${averageAnxiety}\n\nFeedback: ${feedback}`);
  };

  const [anxietyLevel, setAnxietyLevel] = useState(5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exposure Therapy</Text>
      <Text style={styles.subtitle}>Step {steps[currentStep].id}: {steps[currentStep].description}</Text>
      <Image source={steps[currentStep].image} style={styles.image} />
      <Text style={styles.anxietyLabel}>Rate your anxiety level:</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={anxietyLevel}
        onValueChange={(value) => setAnxietyLevel(value)}
      />
      <Text style={styles.anxietyValue}>Current Anxiety Level: {anxietyLevel}</Text>
      <Button
        title={currentStep < steps.length - 1 ? 'Next Step' : 'Complete Therapy'}
        onPress={handleNextStep}
        color="#007BFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    justifyContent: 'center',
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
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  anxietyLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  anxietyValue: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
  },
});
