import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Animated, TouchableOpacity, StyleSheet,Platform, Alert, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BiometricAuth from '../share/biometricAuth';
import Action from '../../actions/index'
import { RootState } from '../../redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPayment } from '../../actions/payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PaymentModalProps {
  visible: boolean;
  modalAction: () => void; 
  onClose: () => void;
  selectedCard: { 
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
  } | null;
  ewalletBalance?: boolean;
  ewalletAmountAction?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, modalAction, onClose, selectedCard, ewalletBalance, ewalletAmountAction }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state: RootState) => state.auth);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  React.useEffect(() => {
    if(Platform.OS==="ios"){
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const clearField = () => {
    setAmount('')
    setDescription('')
    setRecipientName('')
    setLoading(false)
  }

  const closeModal = () => {
    clearField()
    onClose()
    setIsAuthenticated(false);
    Keyboard.dismiss()
  }
  
  const initiatePayment = async () => {
    if (!amount || !description || !selectedCard) {
      Alert.alert('Invalid Input', 'Please enter all the required fields');
      return;
    }
    setLoading(true)
    
    try {
      let params = {
        customer: userDetails.user.id,
        amount: parseInt(amount)*100, 
        currency: 'myr',
        description: description,
        payment_method_types: ['card'], 
      }
      let paymentIntentId = await Action.createPayment(params)
      let createPaymentIntent = Action.submitPayment(paymentIntentId,selectedCard.id,userDetails.user.id)
      let rslt = await dispatch(createPaymentIntent)
      if(rslt && !rslt.error){
        setLoading(false)
        clearField()
        onClose()
        modalAction(true)
      }else{
        modalAction(false)
      }
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(false);
      console.log('Payment Failed', error.response.data);
    }
  };

  const transferPayment = async () => {
    if (!amount || !recipientName ) {
      Alert.alert('Invalid Input', 'Please enter all the required fields');
      return;
    }else if ((parseInt(amount)*100) > ewalletBalance) {
      Alert.alert('Insufficient balance. Please add funds to your wallet.');
      return;
    }
    setLoading(true)
    
    try {
      let params = {
        customer: userDetails.user.id,
        amount: parseInt(amount)*100, 
        currency: 'myr',
        metadata: { recipient_name: recipientName }
      }
      let rslt = await Action.createPayment(params)
      if(rslt && !rslt.error){
        let ewallet_balance = ewalletBalance-(parseInt(amount)*100)
        AsyncStorage.setItem('ewallet_balance', JSON.stringify(ewallet_balance));
        ewalletAmountAction(ewallet_balance)
        dispatch(fetchAllPayment(userDetails.user.id))
        setLoading(false)
        clearField()
        onClose()
        modalAction(true)
      }else{
        modalAction(false)
      }
      setIsAuthenticated(false);
    } catch (error) {
      setIsAuthenticated(false);
      console.log('Payment Failed', error.response.data);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={[styles.modalContainer,{justifyContent: keyboardVisible ? 'flex-end':'flex-start'}]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Animated.View style={[styles.modalContainer, { justifyContent: keyboardVisible ? 'flex-end':'flex-start'}]}>
          <View style={[styles.modalContent,{height: keyboardVisible ? 300:null}]}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={styles.modalTitle}>Payment Details</Text>
              <TouchableOpacity onPress={()=>closeModal()}>
                  <Icon name={"close"} size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical:10}}>
              <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Enter Amount (RM)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              />
              {
                !ewalletBalance ?
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Enter Payment Reference"
                  value={description}
                  onChangeText={setDescription}
                />
                :
                <TextInput
                  style={styles.input}
                  placeholderTextColor={'grey'}
                  placeholder="Enter Recipient Name"
                  value={recipientName}
                  onChangeText={setRecipientName}
                />
              }
              
            </View>
            {
              !ewalletBalance && selectedCard ?
              <Text style={styles.selectedCardText}>
                Selected Card:  **** **** **** ${selectedCard.last4}
              </Text>
              :null
            }
            
            {
              !ewalletBalance ?
                !isAuthenticated ? (
                  !amount || !description ?
                  null
                  :
                  <BiometricAuth onAuthenticated={handleAuthenticated} />
                ) : (
                  <TouchableOpacity onPress={initiatePayment} style={styles.transferModalButton}>
                    {
                      loading ?
                      <ActivityIndicator />
                      :
                      <Text style={styles.transferModalText}>Pay</Text>
                    }
                  </TouchableOpacity>
                )
               :
               !isAuthenticated ? (
                  !amount || !recipientName ?
                  null
                  :
                  <BiometricAuth onAuthenticated={handleAuthenticated} />
                ) : 
                  <TouchableOpacity onPress={transferPayment} style={styles.transferModalButton}>
                    {
                      loading ?
                      <ActivityIndicator />
                      :
                      <Text style={styles.transferModalText}>Transfer</Text>
                    }
                  </TouchableOpacity> 
            }
            
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
    color:"black"
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