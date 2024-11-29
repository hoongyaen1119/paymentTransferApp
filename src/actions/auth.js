import { Alert } from "react-native";
import Service from '../services'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkExistingCustomer = async (email) => {
  let rslt = await Service.checkCustomerExists(email)
  if(rslt.error){
    return rslt
  }else{
    return rslt
  }
};

export const getCusId = async (email) => {
  let rslt = await Service.getCustomerIdByEmail(email)
  if(rslt.error){
    return rslt
  }else{
    return rslt
  }
};

export const createNewCustomer = async(params) => {
  let checkEmail = await checkExistingCustomer(params.email)
  if(!checkEmail){
    let rslt = await Service.createCustomer(params)
    if(rslt.error){
      return rslt
    }else{
      AsyncStorage.setItem("ewallet_balance",JSON.stringify(10000))
      return rslt
    }
  }else{
    let rslt = await getCusId(params.email)
    return rslt
  }
}