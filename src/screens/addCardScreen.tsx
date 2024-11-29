import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCards } from '../redux/store/creditCardSlice';
import CustomHeader from '../components/share/customHeader';
import Action from '../actions/index'
import { useStripe, CardField} from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

interface CreditCardDetails {
  id: string;
  brand: string;
  complete: boolean;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  postalCode: string;
  validCVC: string;
  validExpiryDate: string;
  validNumber: string;
}

const AddCardScreen = () => {  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { createPaymentMethod } = useStripe();
  const userDetails = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [creditCardDetails, setCreditCardDetails] = useState<CreditCardDetails>();

  const handleSubmit = async() => {
    console.log("creditCardDetailscreditCardDetails",creditCardDetails)
    // if (!creditCardDetails) {
    //   Alert.alert('Please enter all the required fields');
    //   return;
    // }
    setLoading(true)
    let paymentMethodId = await Action.createPaymentMethod(creditCardDetails,createPaymentMethod)
    if(paymentMethodId){
      await dispatch (Action.addPaymentMethodToCustomer(paymentMethodId,userDetails.user.id))
      setLoading(false)
      navigation.goBack()
    }
    
  };

  const handleCardChange = (cardDetails) => {
    setCreditCardDetails(cardDetails);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Credit / Debit Card"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
        iconType={"MaterialIcons"}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: "center", color: "white" }}>
          {"Verify and complete your card information"}
        </Text>
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          onCardChange={handleCardChange}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
            backgroundColor: '#7d7c7c',
          }}
        />
        {
          loading ?
          <View style={styles.addButton}>
            <ActivityIndicator />
          </View>
          :
          <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};

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