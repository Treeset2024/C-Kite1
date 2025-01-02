import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { ProfileContext } from './ProfileContext'; // Importing the ProfileContext

export default function RegisterScreen({ navigation }) {
  const { setProfileData } = useContext(ProfileContext); // Access the context to store profile data

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

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [stream, setStream] = useState('');
  const [degree, setDegree] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [streamError, setStreamError] = useState('');
  const [degreeError, setDegreeError] = useState('');
  const [instituteNameError, setInstituteNameError] = useState('');
  const { width, height } = Dimensions.get('window');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[cC][oO][mM]$/;
    return emailRegex.test(email);
  };

  const handlePhoneNumberChange = (text) => {
    let cleanedText = text.replace(/[^0-9]/g, '');
    if (cleanedText.length <= 10) {
      setPhoneNumber(cleanedText);
    }
    if (cleanedText.length === 10) {
      setPhoneError('');
    } else {
      setPhoneError('Enter a valid phone number');
    }
  };

  const handleUppercaseValidation = (text, setter, setError) => {
    setter(text);
    if (text !== text.toUpperCase()) {
      setError('Please enter text in uppercase only.');
    } else {
      setError('');
    }
  };

  const handleNameChange = (text, setter, setError) => {
    let cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
    cleanedText = cleanedText.replace(/\s+/g, ' ');
    setter(cleanedText);
    if (cleanedText === '') {
      setError('Name should not be empty and should only contain letters.');
    } else {
      setError('');
    }
  };

  const handleDegreeChange = (text, setter, setError) => {
    let cleanedText = text.replace(/[^a-zA-Z.-]/g, '');
    let dotCount = (cleanedText.match(/\./g) || []).length;
    if (dotCount > 1) {
      cleanedText = cleanedText.substring(0, cleanedText.lastIndexOf('.'));
    }
    setter(cleanedText);
    const specialCharRegex = /[^a-zA-Z.-]/;
    if (specialCharRegex.test(text)) {
      setError('Special characters are not allowed, only letters, hyphens, and one dot.');
    } else {
      setError('');
    }
  };

  const handleStreamChange = (text, setter, setError) => {
    let cleanedText = text.replace(/[^a-zA-Z.-]/g, '');
    let dotCount = (cleanedText.match(/\./g) || []).length;
    if (dotCount > 1) {
      cleanedText = cleanedText.substring(0, cleanedText.lastIndexOf('.'));
    }
    setter(cleanedText);
    if (cleanedText !== cleanedText.toUpperCase()) {
      setError('Please enter the stream in uppercase only.');
    } else if (/[^a-zA-Z.-]/.test(text)) {
      setError('Special characters are not allowed, only letters, hyphens, and one dot.');
    } else {
      setError('');
    }
  };

  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !stream ||
      !degree ||
      !instituteName ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all the details');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
    } else if (streamError || degreeError || instituteNameError) {
      Alert.alert('Error', 'Please resolve the errors in the form.');
    } else {
      setProfileData({ firstName, lastName, email, phone: phoneNumber, instituteName, stream, degree });
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <LinearGradient
      colors={['#e3f2fd', '#90caf9']}
      style={[styles.gradientContainer, { height: height }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create Account</Text>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, firstNameError ? styles.errorInput : null, { width: width * 0.9 }]}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={(text) => handleNameChange(text, setFirstName, setFirstNameError)}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, lastNameError ? styles.errorInput : null, { width: width * 0.9 }]}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={(text) => handleNameChange(text, setLastName, setLastNameError)}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null, { width: width * 0.9 }]}
          placeholder="Enter Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Contact Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.fixedPrefix}>+91 </Text>
          <TextInput
            style={[styles.phoneInput, phoneError ? styles.errorInput : null]}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <Text style={styles.label}>Institute Name</Text>
        <TextInput
          style={[styles.input, { width: width * 0.9 }]}
          placeholder="Enter Institute Name"
          value={instituteName}
          onChangeText={(text) => handleUppercaseValidation(text, setInstituteName, setInstituteNameError)}
        />

        <Text style={styles.label}>Degree</Text>
        <TextInput
          style={[styles.input, degreeError ? styles.errorInput : null, { width: width * 0.9 }]}
          placeholder="Enter Degree"
          value={degree}
          onChangeText={(text) => handleDegreeChange(text, setDegree, setDegreeError)}
        />
        {degreeError ? <Text style={styles.errorText}>{degreeError}</Text> : null}

        <Text style={styles.label}>Stream</Text>
        <TextInput
          style={[styles.input, streamError ? styles.errorInput : null, { width: width * 0.9 }]}
          placeholder="Enter Stream"
          value={stream}
          onChangeText={(text) => handleStreamChange(text, setStream, setStreamError)}
        />
        {streamError ? <Text style={styles.errorText}>{streamError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <View style={[styles.passwordContainer, { width: width * 0.9 }]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={[styles.passwordContainer, { width: width * 0.9 }]}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.button, { width: width * 0.9 }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 10,
  },
  fixedPrefix: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  errorInput: {
    borderColor: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#0DCAF0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 15,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
  },
});