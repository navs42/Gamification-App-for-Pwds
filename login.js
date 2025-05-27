import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseconfig'; 

export default function LoginRegisterScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const router = useRouter();
  const auth = getAuth(app);

  const handleInput = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleAuth = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isLogin) {
      
      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        console.log('Login successful');
        router.push('/home'); 
      } catch (error) {
        console.log('Login error:', error.message);
        Alert.alert('Login Error', error.message);
      }
    } else {
     
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        console.log('Register successful');
        router.push('/userdetails'); 
      } catch (error) {
        console.log('Register error:', error.message);
        Alert.alert('Register Error', error.message);
      }
    }
  };

  return (
    <View style={styles.whiteBackground}>
      <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.card}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />


        <View style={styles.switchTabs}>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text style={[styles.tab, isLogin && styles.activeTab]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text style={[styles.tab, !isLogin && styles.activeTab]}>Register</Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Enter Name here"
            value={form.name}
            onChangeText={(text) => handleInput('name', text)}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter Email here"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleInput('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password here"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleInput('password', text)}
        />

        <TouchableOpacity onPress={handleAuth}>
          <LinearGradient colors={['#A259FF', '#5D0C9A']} style={styles.button}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
          </LinearGradient>
        </TouchableOpacity>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  logo: { width: 80, height: 80, marginBottom: 20 },
  switchTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 20,
    padding: 5,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: '#5D0C9A',
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  input: {
    backgroundColor: '#f3f3f3',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    marginTop: 15,
    width: 180,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  googleText: {
    color: '#000',
  },
});
