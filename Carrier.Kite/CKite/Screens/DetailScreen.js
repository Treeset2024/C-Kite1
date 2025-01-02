import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailScreen({ route, navigation }) {
  const { submodules, title } = route.params;

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: '#90caf9', // Fallback color for the header
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#e3f2fd', '#90caf9']} // Header gradient colors
            style={{ flex: 1 }}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
          />
        ),
        headerTintColor: '#fff', // Optional: Adjust header text and icon color for better visibility
      });
    }, [navigation]);

  // State to hold submodule results
  const [dynamicScores, setDynamicScores] = useState(
    submodules.map((submodule) => ({
      name: submodule,
      score: 0, // Default score
      progress: '0%', // Default progress
    }))
  );

  useEffect(() => {
    // If new test results come back from navigation, update state
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.updatedScores) {
        setDynamicScores(route.params.updatedScores);
      }
    });
    return unsubscribe;
  }, [navigation, route.params?.updatedScores]);

  // Calculate overall results
  const overallScore = Math.round(
    dynamicScores.reduce((total, sub) => total + sub.score, 0) / dynamicScores.length
  );
  const overallProgress = `${Math.round(
    dynamicScores.reduce((total, sub) => total + parseInt(sub.progress), 0) / dynamicScores.length
  )}%`;

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.gradientContainer}>
      <Text style={styles.title}>{title} Modules</Text>

      <FlatList
        data={dynamicScores}
        keyExtractor={(submodule, index) => index.toString()}
        renderItem={({ item: submodule }) => (
          <TouchableOpacity
            style={styles.submoduleContainer}
            onPress={() =>
              navigation.navigate('CandidateTestReport', {
                subModuleName: submodule.name,
                score: submodule.score,
                maxScore: 100,
                percentage: Math.round((submodule.score / 100) * 100),
                questionsAttempted: Math.floor((parseInt(submodule.progress) / 100) * 20),
                totalQuestions: 20,
                timeTaken: '15 min',
                totalTime: '20 min',
              })
            }
          >
            <Text style={styles.submoduleText}>{submodule.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Score: {submodule.score}</Text>
              <Text style={styles.infoText}>Progress: {submodule.progress}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.overallResultButton}
        onPress={() =>
          navigation.navigate('OverallResult', {
            title,
            overallScore,
            overallProgress,
          })
        }
      >
        <Text style={styles.overallResultButtonText}>View Overall Result</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1',
    textShadowColor: '#bbdefb',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  submoduleContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submoduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16,
    color: '#757575',
  },
  overallResultButton: {
    backgroundColor: '#0d47a1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  overallResultButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
