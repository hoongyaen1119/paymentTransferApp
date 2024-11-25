import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCard: { cardNumber: string; expirationDate: string; cvc:string } | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<any>>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose, selectedCard, setSelectedCard }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const translateY = useRef(new Animated.Value(500)).current;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const initiatePayment = async () => {
    if (!amount || !recipient || !selectedCard) {
      Alert.alert('Invalid Input', 'Please enter all the required fields');
      return;
    }
    try {

    } catch (error) {
      Alert.alert('Payment Failed', 'Something went wrong');
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