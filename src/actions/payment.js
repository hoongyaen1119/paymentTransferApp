import { Alert } from "react-native";
import Service from '../services'; 
import { setTransactions } from "../redux/store/transactionSlice";
import { Dispatch } from 'redux';
import { fetchCards } from "../redux/store/creditCardSlice";

export const fetchPaymentMethod = (customerId: string) => async (dispatch: Dispatch) => {
  let rslt = await Service.getPaymentMethodByCustomerId(customerId)
  if(rslt.error){
    return rslt
  }else{
    dispatch(fetchCards(rslt));
    return rslt
  }
}

export const addPaymentMethodToCustomer = (paymentMethodId: string, customerId: string) => async (dispatch: Dispatch) => {
  let rslt = await Service.attachPaymentMethodToCustomer(paymentMethodId,customerId)
  if(rslt.error){
    Alert.alert('Error', rslt.error);
    return false
  }else{
    dispatch(fetchPaymentMethod(customerId))
    return rslt
  }
};

export const createPaymentMethod = async(card_details,createPaymentMethod) => {
    let rslt = await Service.createCardPaymentMethod(card_details,createPaymentMethod)
    if(rslt.error){
      return rslt
    }else{
      return rslt
    }
}

export const submitPayment = (paymentIntentId: string,paymentMethodId: string,customerId: string) => async (dispatch: Dispatch) => {
  let rslt = await Service.confirmPayment(paymentIntentId,paymentMethodId)
  if(rslt.error){
    return rslt
  }else{
    dispatch(fetchAllPayment(customerId))
    return rslt
  }
}

export const fetchAllPayment = (customerId: string) => async (dispatch: Dispatch) => {
  let rslt = await Service.getAllPaymentIntent(customerId)
  if(rslt.error){
    return rslt
  }else{
    dispatch(setTransactions(rslt));
    return rslt
  }
}

export const createPayment = async(params) => {
    let rslt = await Service.createPaymentIntent(params)
    if(rslt.error){
      return rslt
    }else{
      return rslt
    }
}