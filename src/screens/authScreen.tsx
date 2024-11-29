import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { signIn } from '../redux/store/authSlice';
import Action from '../actions/index'
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const [username, setUsername] = useState<string>('Test');
  const [email, setEmail] = useState<string>('test@gmail.com');
  const [password, setPassword] = useState<string>('Test!23');

  const handleSignIn = async() => {
    if (username && email && password) {
      let id = await Action.createNewCustomer({email:email, name:username})
      if(id && !id.error){
        dispatch(signIn({ username, email, id }));
        navigation.navigate('Payment'); 
      }else{
        Alert.alert('Invalid Email');
      }
    } else {
      Alert.alert('Please fill out all fields');
    }
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? 
        null
        : (
        <View>
          <Text style={styles.loginText}>Please sign in to continue.</Text>
          <Text style={[styles.loginText,{fontSize:12}]}>***default password: Test!23</Text>

          <TextInput
            style={styles.input}
            placeholderTextColor={'#b3b1b1'}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#b3b1b1'}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#b3b1b1'}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  loginText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    textAlign:"center"
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: '#7d7c7c',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    color:"white"
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#014766',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AuthScreen;