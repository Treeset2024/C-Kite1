import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const { profileImage, username, email, phone, instituteName, stream, degree } =
    useContext(ProfileContext);

  const navigation = useNavigation();

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

  // Function to handle Edit button click
  const handleEditPress = () => {
    Alert.alert(
      'Action Restricted',
      'Editing is currently disabled. Please contact the administrator for further assistance.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#90caf9']} style={styles.linearBackground}>
      <ScrollView style={styles.container}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source= {require('../assets/images/Profile.jpg')} style={styles.profileImage} />
          <Text style={styles.name}>{username}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.headerSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Email Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.detail}>{email}</Text>
        </View>

        {/* Phone Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.detail}>{phone}</Text>
        </View>

        {/* Institute Name Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Institute Name</Text>
          <Text style={styles.detail}>{instituteName}</Text>
        </View>

        {/* Stream Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Stream</Text>
          <Text style={styles.detail}>{stream}</Text>
        </View>

        {/* Degree Section */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Degree</Text>
          <Text style={styles.detail}>{degree}</Text>
        </View>

        {/* Utilities */}
        <Text style={styles.sectionTitle}>Utilities</Text>

        {/* <TouchableOpacity
          style={styles.utilitiesSection}
          onPress={() => navigation.navigate('Home1')}
        >
          <Text style={styles.label}>Modules</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.utilitiesSection}
          onPress={() => navigation.navigate('Result')}
        >
          <Text style={styles.label}>View Result</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Reset navigation stack and navigate to HomeScreen.js
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }}
          >
            <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  headerBackButton: {
    marginLeft: width * 0.03,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: height * 0.01,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'black',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
  editButton: {
    backgroundColor: 'lightgrey',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
  },
  editText: {
    fontSize: width * 0.04,
    color: 'black',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.02,
  },
  label: {
    color: 'black',
    fontSize: width * 0.04,
    marginBottom: height * 0.005,
    fontWeight: 'bold',
  },
  detail: {
    color: '#555',
    fontSize: width * 0.04,
  },
  utilitiesSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.01,
    alignItems: 'center',
  },
  logoutSection: {
    paddingVertical: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.015,
    borderRadius: width * 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutIcon: {
    marginRight: width * 0.02,
  },
  logoutText: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
