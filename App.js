// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Home from './Home';
import CBT from './src/CBT';
import ExposureTherapy from './src/ExposureTherapy';
import Relaxation from './Relaxation';
import ChatBot from './src/ChatBot'; // Import the ChatBot component

const Stack = createStackNavigator();

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Phobia Diagnosis Tool!</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default function App() {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CBT" component={CBT} />
        <Stack.Screen name="Exposure Therapy" component={ExposureTherapy} />
        <Stack.Screen name="Relaxation Techniques" component={Relaxation} />
      </Stack.Navigator>

      {/* Floating Button to Open Chatbot */}
      <TouchableOpacity style={styles.chatBotButton} onPress={toggleChatBot}>
        <Text style={styles.chatBotText}>Chat</Text>
      </TouchableOpacity>

      {/* Render ChatBot only when showChatBot is true */}
      {showChatBot && <ChatBot visible={showChatBot} onClose={toggleChatBot} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
    elevation: 10,
  },
  chatBotText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
