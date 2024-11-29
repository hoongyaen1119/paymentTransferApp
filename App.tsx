import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import PaymentScreen from './src/screens/paymentScreen';
import AddCardScreen from './src/screens/addCardScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import AuthScreen from './src/screens/authScreen';
import CardPaymentScreen from './src/screens/cardPaymentScreen';
import Core from './src/core/core'; 

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <StripeProvider publishableKey={Core.publishable_key}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen} 
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: 'white' }
              }}
            />
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
            <Stack.Screen
              name="CardPayment"
              component={CardPaymentScreen}
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