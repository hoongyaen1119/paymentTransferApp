import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import TransactionList from '../payment/transaction/transactionList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../share/customHeader';
import { signOut } from '../../redux/store/authSlice';
import Action from '../../actions/index'
import PaymentModal from '../payment/paymentModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '../share/successModal';
import ErrorModal from '../share/errorModal';

const { width } = Dimensions.get('window');

const WalletTransfer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [topUpAmount, setTopUpAmount] = useState(null);
  const [topUpVisible, setTopUpVisible] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const transactions = useSelector((state: RootState) => state.transaction.transactions);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(null);

  React.useEffect(() => {
    async function fetchFunction() {
      let balance = await AsyncStorage.getItem('ewallet_balance')
      setUserBalance(balance ? JSON.parse(balance) :10000)
    }
    fetchFunction()
  }, []);

  // Handle Top-Up (Add Funds)
  const handleTopUp = async () => {
    setTopUpVisible(!topUpVisible)
  };

  const modalAction = (action) => {
    setMessageModalVisible(action)
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const logout = () => {
    dispatch(signOut());
    navigation.goBack()
  };

  const topUp = () => {
    if(!topUpAmount){
      Alert.alert('Top up failed!', 'Field is empty.');
      return;
    }
    setUserBalance(userBalance+(topUpAmount*100))
    AsyncStorage.setItem('ewallet_balance', JSON.stringify(userBalance+(topUpAmount*100)));
    setTopUpVisible(!topUpVisible)
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Payment" rightIcon="logout" onRightPress={logout} iconType="MaterialIcons" />

      <View style={{ alignItems: "center", margin: 10 }}>
        {
          topUpVisible ?
          <View style={styles.balanceContainer}>
            {
              topUpVisible ?
              <TextInput
                autoFocus
                style={styles.input}
                placeholderTextColor={'grey'}
                placeholder="Amount"
                keyboardType='numeric'
                value={topUpAmount}
                onChangeText={setTopUpAmount}
              />
              :null
            }
            <TouchableOpacity onPress={topUp} style={styles.button}>
            <Text style={styles.buttonText}>Top Up</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Your Balance</Text>
            <Text style={styles.balanceAmount}>RM{(userBalance / 100).toFixed(2)}</Text>
          </View>
        }
        
        <View style={styles.paymentMethodContainer}>
          <TouchableOpacity onPress={()=>{navigation.navigate("CardPayment")}} style={{ width: "25%", justifyContent: "center", height: 40, alignItems: "center" }}>
            <Icon name={"card-outline"} size={20} color="black" />
            <Text style={{ textAlign: "center", marginTop: 5 }}>Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showModal} style={{ width: "25%", height: 40, justifyContent: "center", alignItems: "center" }}>
            <Icon name={"send-outline"} size={20} color="black" />
            <Text style={{ textAlign: "center", marginTop: 5 }}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{Alert.alert("Function not ready!")}} style={{ width: "25%", height: 40, justifyContent: "center", alignItems: "center" }}>
            <Icon name={"scan"} size={20} color="black" />
            <Text style={{ textAlign: "center", marginTop: 5 }}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTopUp} style={{ width: "25%", height: 40, justifyContent: "center", alignItems: "center" }}>
            <Icon name={"wallet-outline"} size={20} color="black" />
            <Text style={{ textAlign: "center", marginTop: 5 }}>Top Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TransactionList transactions={transactions} paymentType={"ewallet"}/>
        
      {
        modalVisible ?
        <PaymentModal 
          visible={modalVisible}
          modalAction={modalAction}
          onClose={hideModal}
          ewalletBalance={userBalance}
          ewalletAmountAction={setUserBalance}
        />
        :null
      }
      
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
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    fontSize:24,
    borderRadius: 5,
    color:"white",
    width:width*0.8, 
    textAlign:"center",
    fontWeight:"600"
  },
  balanceContainer: {
    backgroundColor: '#014766',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: "center",
    width: width,
    height: 250,
  },
  paymentMethodContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: "center",
    height: 60,
    width: width * 0.85,
    flexDirection: "row",
  },
  topUpButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  balanceText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WalletTransfer;