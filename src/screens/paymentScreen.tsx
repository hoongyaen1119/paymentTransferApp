import React, { useState } from 'react';
import { Button, Text, Alert, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import CustomHeader from '../components/share/customHeader';
import CreditCardCarousel from '../components/payment/creditCardCarousel';
import TransactionList from '../components/payment/transaction/transactionList';
import PaymentModal from '../components/payment/paymentModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store'; // Import RootState to type the selector

const sampleTransactions = [
  { id: '1', date: '2024-11-21', amount: '100', recipient: 'John Doe', status: 'Success' },
  { id: '2', date: '2024-11-20', amount: '50', recipient: 'Jane Smith', status: 'Failed' },
  { id: '3', date: '2024-11-18', amount: '200', recipient: 'Alex Johnson', status: 'Success' },
  { id: '4', date: '2024-11-21', amount: '100', recipient: 'John Doe', status: 'Success' },
  { id: '5', date: '2024-11-20', amount: '50', recipient: 'Jane Smith', status: 'Failed' },
  { id: '6', date: '2024-11-18', amount: '200', recipient: 'Alex Johnson', status: 'Success' }
];

const PaymentScreen = () => {
  const creditCard = useSelector((state: RootState) => state.creditCard); // Get card details from Redux

  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation(); // Use navigation hook


  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleCardPress = (id) => {
    setSelectedCard(creditCard.cards[id])
    showModal()   
  };

  const addCard = () => {
    navigation.navigate('AddCard'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Payment" rightIcon="add" onRightPress={addCard} iconType="MaterialIcons" />
      <CreditCardCarousel data={creditCard.cards} onCardPress={handleCardPress} />
      <TransactionList transactions={sampleTransactions} />
      <PaymentModal 
        visible={modalVisible}
        onClose={hideModal}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default PaymentScreen;