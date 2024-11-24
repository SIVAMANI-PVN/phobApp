import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

export default function Relaxation() {
  const breathAnimation = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = React.useState('Breathe In');
  const timerRef = useRef(null);
  
  const circleSize = breathAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 250],
  });

  const updatePhase = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Schedule phase changes
    setPhase('Breathe In');
    
    timerRef.current = setTimeout(() => {
      setPhase('Hold');
      
      timerRef.current = setTimeout(() => {
        setPhase('Breathe Out');
        
        timerRef.current = setTimeout(() => {
          updatePhase(); // Restart the cycle
        }, 4000); // After breathe out
      }, 2000); // After hold
    }, 4000); // After breathe in
  };

  const startBreathingAnimation = () => {
    breathAnimation.setValue(0);
    textOpacity.setValue(1);

    const breatheIn = Animated.sequence([
      Animated.timing(breathAnimation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.delay(2000),
      Animated.timing(breathAnimation, {
        toValue: 0,
        duration: 5000,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }),
    ]);

    Animated.loop(breatheIn).start();
  };

  useEffect(() => {
    startBreathingAnimation();
    updatePhase();

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathing Exercise</Text>
      
      <View style={styles.exerciseContainer}>
        <Animated.View
          style={[
            styles.breathCircle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: Animated.divide(circleSize, 2),
            },
          ]}
        />
        
        <Text style={styles.instruction}>
          {phase}
        </Text>
      </View>
      
      <Text style={styles.description}>
        Follow the circle's movement to regulate your breathing
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  exerciseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
  },
  breathCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(103, 157, 255, 0.3)',
    borderWidth: 2,
    borderColor: '#679dff',
  },
  instruction: {
    fontSize: 24,
    color: '#333',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});