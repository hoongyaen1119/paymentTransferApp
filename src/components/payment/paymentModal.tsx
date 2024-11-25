import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStripe, CardField } from '@stripe/stripe-react-native';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCard: { cardNumber: string; expirationDate: string; cvc:string } | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<any>>;
}

// const STRIPE_PUBLISHABLE_KEY = 'pk_test_51QNV3YLaBrjzRD5YUcvNnXxonnTfxJf1iaJ08ZmIRgQ5y4DyWpF0ZbxGwDNzrpMlo3HBdmyQc2NXxs4lQuU3QFbk00HqljMHEj';
// const STRIPE_SECRET_KEY = 'sk_test_51QNV3YLaBrjzRD5YHy2WR3N5fMXwnYfYn2blMsEYisBbCqlyIHfV3zkibTj2uxvxyhL4bpUVkFxXd3A4wBVwZkVO00mCPvYBxT';


const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose, selectedCard, setSelectedCard }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const translateY = useRef(new Animated.Value(500)).current;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { createPaymentMethod, confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0, 
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 500, 
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleAuthenticated = () => {
    // setIsAuthenticated(true);
    initiatePayment()
  };

  const clearInput = () => {
    setRecipient('')
    setAmount('')
  }

  // const handleCardChange = (cardDetails) => {
  //   setCardDetails(cardDetails);
  // };

  // const createPaymentMethodAction = async() => {
  //   try {
  //     const { error, paymentMethod } = await createPaymentMethod({
  //       paymentMethodType: 'Card', 
  //       card: cardDetails,
  //     });
  //     if (error) {
  //       alert(`Error: ${error.message}`);
  //       return;
  //     }else{
  //       return paymentMethod.id
  //     }
  //   } catch (error) {
  //     alert('Payment failed. Please try again.');
  //   }
  // }

  // const confirmPaymentAction = async() =>{
  //   const clientSecret = "pi_3QOwx5LaBrjzRD5Y2VVw9m1K_secret_1ZLZI37LbESSu6SaYw1QwncaH"; 
  //   const { error: confirmError, paymentIntent } = await confirmPayment(clientSecret, {
  //     paymentMethodType: 'Card',
  //     paymentMethodId: "pm_1QNVloLaBrjzRD5YnhAgLKIw",
  //   });
  //   console.log("jkdjhsakdhkasda",confirmError)

  //   if (confirmError) {
  //     console.log("Payment Confirmation Error:", confirmError);
  //     alert(`Payment failed: ${confirmError.message}`);
  //   } else if (paymentIntent) {
  //     console.log("Payment successful!", paymentIntent);
  //     alert('Payment Successful!');
  //   }
  // }

  // const getAllPaymentIntent = async() =>{
  //   try {
  //     const response = await axios.get('https://api.stripe.com/v1/payment_intents', {
  //       headers: {
  //         Authorization: `Bearer ${STRIPE_SECRET_KEY}`, // Authentication
  //       },
  //     });
  
  //     console.log('Transactions:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching transactions:', error.response?.data || error.message);
  //   }
  // }

  // const createPaymentIntentAction = async() => {
  //   const paymentIntentResponse = await axios.post(
  //     'https://api.stripe.com/v1/payment_intents',
  //     {
  //       amount: parseInt(amount)*100, 
  //       currency: 'myr',
  //       payment_method_types: ['card'], 
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${STRIPE_SECRET_KEY}`, 
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     }
  //   )
  //   const clientSecret = paymentIntentResponse.data.client_secret;
  //   return clientSecret
  // }

  const initiatePayment = async () => {
    if (!amount || !recipient || !selectedCard) {
      Alert.alert('Invalid Input', 'Please enter all the required fields');
      return;
    }
    try {
      // getAllPaymentIntent()
      //let getPaymentIntentId = await createPaymentIntentAction()
      // let getPaymentMethodId = await createPaymentMethodAction()
      // confirmPaymentAction()
      
    } catch (error) {
      console.log('Payment Failed', error.response.data);
    }
  };

  return (
    <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
      <View style={styles.modalContent}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={styles.modalTitle}>Payment Details</Text>
            <TouchableOpacity onPress={onClose}>
                <Icon name={"close"} size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{marginVertical:10}}>
          <TextInput
          style={styles.input}
          placeholder="Enter Amount (RM)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          />

          <TextInput
          style={styles.input}
          placeholder="Enter Recipient"
          value={recipient}
          onChangeText={setRecipient}
          />
        </View>

        <Text style={styles.selectedCardText}>
          {selectedCard ? `Selected Card:  **** **** **** ${selectedCard.cardNumber.slice(-4)}` : 'No card selected'}
        </Text>

        {/* {!isAuthenticated ? (
          !amount || !recipient ?
          null
          :
          <BiometricAuth onAuthenticated={handleAuthenticated} />
        ) : ( */}
          <TouchableOpacity onPress={initiatePayment} style={styles.transferModalButton}>
            <Text style={styles.transferModalText}>Transfer</Text>
          </TouchableOpacity>
        {/* )} */}

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
          }}
        />
        
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  selectedCardText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#777',
  },
  transferModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#014766',
    borderRadius: 5,
  },
  transferModalText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentModal;