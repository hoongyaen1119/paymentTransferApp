import React from 'react';
import {  View, StyleSheet } from 'react-native';
import WalletTransfer from '../components/ewallet/walletTransfer';
import CardPayment from '../components/payment/cardPayment';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../actions/index'
import { RootState } from '../redux/store/store';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    async function fetchFunction() {
      await dispatch (Action.fetchPaymentMethod(userDetails.user.id))
      dispatch(Action.fetchAllPayment(userDetails.user.id))
    }
    fetchFunction()
  }, []);

  return (
    <View style={styles.container}>
      <WalletTransfer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  }
});

export default PaymentScreen;