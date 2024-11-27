import React, { useState } from 'react';
import {  SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../components/share/customHeader';
import CreditCardCarousel from '../components/payment/creditCardCarousel';
import TransactionList from '../components/payment/transaction/transactionList';
import PaymentModal from '../components/payment/paymentModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { fetchCards } from '../redux/store/creditCardSlice';
import { signOut } from '../redux/store/authSlice';
import Action from '../actions/index'
import SuccessModal from '../components/share/successModal';
import ErrorModal from '../components/share/errorModal';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const creditCard = useSelector((state: RootState) => state.creditCard); 
  const userDetails = useSelector((state: RootState) => state.auth);
  const transactions = useSelector((state: RootState) => state.transaction.transactions);

  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(null);

  const navigation = useNavigation();

  React.useEffect(() => {
    async function fetchFunction() {
      await dispatch (Action.fetchPaymentMethod(userDetails.user.id))
      dispatch(Action.fetchAllPayment(userDetails.user.id))
    }
    fetchFunction()
  }, []);

  const modalAction = (action) => {
    setMessageModalVisible(action)
  };

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

  const toAddCard = () => {
    navigation.navigate('AddCard'); 
  };

  const logout = () => {
    dispatch(signOut());
    navigation.goBack()
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Payment" leftIcon="logout" onLeftPress={logout} rightIcon="add" onRightPress={toAddCard} iconType="MaterialIcons" />
      <CreditCardCarousel onCardPress={handleCardPress} />
      <TransactionList transactions={transactions} />
      <PaymentModal 
        visible={modalVisible}
        modalAction={modalAction}
        onClose={hideModal}
        selectedCard={selectedCard}
      />
      {
        messageModalVisible ?
        <SuccessModal modalAction={modalAction}/>
        :
        messageModalVisible==false ?
        <ErrorModal modalAction={modalAction}/>
        :null
      }

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