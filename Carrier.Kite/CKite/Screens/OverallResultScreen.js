import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

export default function OverallResultScreen({ route, navigation }) {
  const { title, overallScore, overallProgress } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#90caf9', // Fallback color
      },
      headerBackground: () => (
        <LinearGradient
          colors={['#e3f2fd', '#90caf9']} // Gradient colors for the header
          style={{ flex: 1 }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
        />
      ),
      headerTintColor: '#fff', // Optional: Adjust text/icon color for contrast
    });
  }, [navigation]);

  // Determine performance level based on score
  let performanceLevel = '';
  let progressColor = '';

  if (overallScore <= 60) {
    performanceLevel = 'Poor';
    progressColor = '#d32f2f'; // Red
  } else if (overallScore > 60 && overallScore <= 65) {
    performanceLevel = 'Average';
    progressColor = '#fbc02d'; // Yellow
  } else if (overallScore >= 65) {
    performanceLevel = 'Good';
    progressColor = '#388e3c'; // Green
  }

  // Data for the Pie Chart
  const pieData = [
    {
      name: 'Achieved',
      population: overallScore,
      color: progressColor,
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Remaining',
      population: 100 - overallScore,
      color: '#e0e0e0',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.gradientContainer}>
      <Text style={styles.title}>{title} Overall Result</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Overall Score: {overallScore}</Text>
        <Text style={styles.resultText}>Overall Progress: {overallProgress}</Text>

        {/* Progress Meter */}
        <View style={styles.progressContainer}>
          <Text style={styles.performanceText}>Performance: {performanceLevel}</Text>
          <ProgressBar
            progress={overallScore / 100}
            color={progressColor}
            style={styles.progressBar}
          />
        </View>

        {/* Pie Chart */}
        <View style={styles.pieChartContainer}>
          <Text style={styles.pieChartTitle}>Score Breakdown</Text>
          <PieChart
            data={pieData}
            width={width * 0.9} // 90% of screen width
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.07, // Dynamic font size (7% of screen width)
    fontWeight: 'bold',
    marginBottom: height * 0.03, // Spacing based on screen height
    textAlign: 'center',
    color: '#0d47a1',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: width * 0.06, // Padding dynamically
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: width * 0.05, // 5% of screen width
    color: '#333',
    marginVertical: height * 0.005,
  },
  progressContainer: {
    marginTop: height * 0.02,
    width: '100%',
    alignItems: 'center',
  },
  performanceText: {
    fontSize: width * 0.045, // Dynamic font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  progressBar: {
    width: '100%',
    height: height * 0.02, // Dynamic height for the progress bar
    borderRadius: 6,
  },
  pieChartContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  pieChartTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height *0.02,
  },
});