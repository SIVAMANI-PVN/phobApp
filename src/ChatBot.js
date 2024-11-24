import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import axios from 'axios';
import { GEMINI_API_KEY } from '@env'; // Import your API key from .env file

function ChatBot({ visible, onClose }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api.gemini-ai.com/v1/analyze',
        {
          prompt: `Analyze phobia: ${userInput}`,
          model: 'gpt-4',
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${GEMINI_API_KEY}`, // Use the environment variable
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = { text: response.data.result || 'No response provided.', sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    visible && (
      <View style={styles.chatWindow}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={item.sender === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
            </View>
          )}
        />
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Ask about phobias..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={isLoading}>
          <Text style={styles.sendText}>{isLoading ? 'Loading...' : 'Send'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  chatWindow: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 300,
    height: 400,
    elevation: 10,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    maxWidth: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sendText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  closeText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ChatBot;
