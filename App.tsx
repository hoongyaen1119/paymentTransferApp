import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import PaymentScreen from './src/screens/paymentScreen';
import AddCardScreen from './src/screens/addCardScreen';
import StripePaymentScreen from './src/screens/stripePaymentScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();

const App = () => {
  const [publishableKey, setPublishableKey] = useState('pk_test_51QNV3YLaBrjzRD5YUcvNnXxonnTfxJf1iaJ08ZmIRgQ5y4DyWpF0ZbxGwDNzrpMlo3HBdmyQc2NXxs4lQuU3QFbk00HqljMHEj');
  
  return (
    <StripeProvider publishableKey={publishableKey}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Payment">
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: 'white' }
              }}
            />
            <Stack.Screen
              name="AddCard"
              component={AddCardScreen}
              options={{ 
                headerShown: false,
                cardStyle: { backgroundColor: 'white' }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
};

export default App;