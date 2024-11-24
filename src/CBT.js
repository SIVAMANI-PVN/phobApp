import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function CBT() {
  const sections = [
    {
      title: "Understanding Your Fear",
      content: "Arachnophobia is a learned response that can be managed through structured therapy techniques. Most spiders we encounter are harmless, and your fear response can be gradually reduced through practice.",
      image: require('../assets/cbt1.jpg'),
      type: 'image'
    },
    {
      title: "Cognitive Restructuring",
      content: "Common negative thoughts:\n• 'All spiders are dangerous'\n• 'A spider will definitely bite me'\n• 'I can't handle seeing a spider'\n\nBalanced thoughts:\n• 'Most house spiders are harmless'\n• 'Spiders typically avoid humans'\n• 'I can learn to manage my response'",
      image: require('../assets/cbt2.png'),
      type: 'image'
    },
    {
      title: "Exposure Steps",
      content: "Progress at your own pace through these steps:\n1. View cartoon spiders\n2. Look at spider photos\n3. Watch spider videos\n4. Observe contained spider from distance\n5. Stay in room with contained spider\n6. Gradually decrease distance\n7. Practice with free spider",
      image: require('../assets/cbt3.jpg'),
      type: 'image'
    },
    {
      title: "Relaxation Techniques",
      content: "Use these when practicing exposure:\n• Deep breathing (4-4-4 pattern)\n• Progressive muscle relaxation\n• Grounding: Focus on 5 things you see, 4 you can touch\n• Mindful observation\n• Positive self-talk",
      image: require('../assets/cbt4.gif'),
      type: 'gif'
    },
    {
      title: "Track Your Progress",
      content: "Monitor your journey:\n• Rate anxiety (0-10) before and after exposure\n• Note successful encounters with spider images/videos\n• Record helpful thoughts and coping strategies\n• Celebrate small victories",
      image: require('../assets/cbt5.jpg'),
      type: 'image'
    },
    {
      title: "Safety Guidelines",
      content: "Important reminders:\n• Move at your comfortable pace\n• It's okay to step back if overwhelmed\n• Consistency matters more than speed\n• Consider working with a mental health professional",
      image: require('../assets/cbt6.png'),
      type: 'image'
    }
  ];

  const renderMedia = (section) => {
    try {
      if (section.type === 'gif') {
        return (
          <View style={styles.gifContainer}>
            <Image
              source={section.image}
              style={styles.gif}
              resizeMode="contain"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={section.image}
            style={styles.sectionImage}
            resizeMode="contain"
          />
        );
      }
    } catch (error) {
      return (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Media Placeholder</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        
        
        <Text style={styles.mainTitle}>Arachnophobia CBT Guide</Text>
        <Text style={styles.subtitle}>
          Your journey to managing spider fear
        </Text>
        
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            {renderMedia(section)}
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Remember: Recovery is a journey, not a race. Take each step at your own pace.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerImage: {
    width: windowWidth - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  gifContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
  },
  footer: {
    marginTop: 10,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#2980b9',
  }
});