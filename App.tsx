import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import PaymentScreen from './src/screens/paymentScreen';
import AddCardScreen from './src/screens/addCardScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

const Stack = createStackNavigator();

const App = () => {  
  return (
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
  );
};

export default App;