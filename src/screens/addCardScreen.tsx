import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateCardDetails } from '../validation';
import { useDispatch } from 'react-redux';
import { addCard } from '../redux/store/creditCardSlice';
import CustomHeader from '../components/share/customHeader';

// Define the types for the form fields
interface CreditCardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

const AddCardScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Initialize the form with an empty card
  const [creditCardDetails, setCreditCardDetails] = useState<CreditCardDetails>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  // Handle text input changes
  const handleInputChange = (field: keyof CreditCardDetails, value: string) => {
    setCreditCardDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Validate the credit card details
  const validateCard = () => {
    return validateCardDetails(creditCardDetails);
  };

  // Handle form submission
  const handleSubmit = () => {
    const errorMessage = validateCard();

    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }

    dispatch(addCard(creditCardDetails));
    navigation.goBack()

    // Reset the form fields after submission
    setCreditCardDetails({
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Credit / Debit Card"
        leftIcon="arrow-back-ios"
        onLeftPress={() => navigation.goBack()}
        iconType={"MaterialIcons"}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: "center", color: "white" }}>
          {"Verify and complete your card information"}
        </Text>
        <View style={styles.form}>
          {/* Card Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            keyboardType="numeric"
            value={creditCardDetails.cardNumber}
            onChangeText={(value) => handleInputChange('cardNumber', value)}
            placeholderTextColor={"grey"}
            maxLength={16}
          />

          {/* Expiration Date Input (MM/YY format) */}
          <TextInput
            style={styles.input}
            placeholder="Expiration Date (MM/YY)"
            keyboardType="numeric"
            value={creditCardDetails.expirationDate}
            onChangeText={(value) => handleInputChange('expirationDate', value)}
            placeholderTextColor={"grey"}
            maxLength={5}
          />

          {/* CVV Input */}
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            value={creditCardDetails.cvv}
            onChangeText={(value) => handleInputChange('cvv', value)}
            placeholderTextColor={"grey"}
            maxLength={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  form: {
    width: "90%",
    backgroundColor: '#363636',
    padding: 10,
    margin: 20,
    borderColor: '#363636',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#333131',
    color: "white",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    width: "90%",
    marginTop: 20,
    padding: 10,
    backgroundColor: '#014766',
    borderRadius: 10,
  },
  cardItem: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#363636',
    borderRadius: 5,
  },
  cardText: {
    color: 'white',
  },
  cardList: {
    marginTop: 20,
    width: '90%',
  },
});

export default AddCardScreen;