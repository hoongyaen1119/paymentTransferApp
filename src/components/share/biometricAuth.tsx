import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';


const BiometricAuth = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
  const rnBiometrics = new ReactNativeBiometrics();

  const [biometricSupported, setBiometricSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    async function fetchFunction() {
      try{
        
        const isAvailable = await rnBiometrics.isSensorAvailable();
        if(isAvailable.available){
          setBiometricSupported(true);
        }else{
          setBiometricSupported(false);
        }
      }catch(err) {
        setError('Biometric sensor not available');
      }
    }
    fetchFunction()
  }, [])

  const authenticateUser = () => {
    if (!biometricSupported) {
      Alert.alert('Biometrics not supported', 'This device does not support biometric authentication');
      return;
    }

    rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' })
      .then((result) => {
        if (result.success) {
          onAuthenticated();
        } else {
          Alert.alert('Authentication failed', 'Please try again');
        }
      })
      .catch(() => {
        Alert.alert('Authentication failed', 'Something went wrong');
      });
  };

  return (
    <View>
      {biometricSupported === null ? (
        <Text>Checking biometric sensor...</Text>
      ) : biometricSupported ? (
        <>
          <Text>Biometrics supported. Please authenticate.</Text>
          <Button title="Authenticate" onPress={authenticateUser} />
        </>
      ) : (
        <Text>Biometrics not supported on this device</Text>
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default BiometricAuth;