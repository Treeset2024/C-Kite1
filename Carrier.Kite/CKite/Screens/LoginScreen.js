import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../contexts/UserContext';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const storedEmail = 'user@example.com';

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleForgotPassword = () => {
    if (!forgotPasswordEmail) {
      Alert.alert('Error', 'Please enter your email address.');
    } else if (!validateEmail(forgotPasswordEmail)) {
      Alert.alert('Error', 'Invalid email format.');
    } else if (forgotPasswordEmail !== storedEmail) {
      Alert.alert('Error', 'Email not found.');
    } else {
      Alert.alert('Success', 'A password reset link has been sent to your email.');
      setModalVisible(false);
    }
  };

  const handleLogin = () => {
    if (!usernameOrEmail || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
    } else if (!validateEmail(usernameOrEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      const userName = usernameOrEmail.split('@')[0];
      setUser({ name: userName });
      // Alert.alert('Login Successful', Welcome, ${userName});
      navigation.navigate('Home1');
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Sign in with Google', 'This feature is under development.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/l2.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}> Email</Text>
      <TextInput
        style={styles.input}
        placeholder=" Email "
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}> Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder=" Password "
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.modalDescription}>
              Please enter your registered email address.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>New here? Create your account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleSignIn} onPress={handleGoogleSignIn}>
        {/* <Icon name="google" size={20} color="#DB4437" style={styles.googleIcon} />
        <Text style={styles.googleSignInText}>Sign in with Google</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.5,
    height: height * 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0DCAF0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontSize: 16,
    color: '#0DCAF0',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  googleSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleSignInText: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default LoginScreen;