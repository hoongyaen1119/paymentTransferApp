import axios from "axios";
import Core from '../core/core'; 

export const getPaymentMethodByCustomerId = async(customerId) => {
  try {
    const response = await axios.get(
      `https://api.stripe.com/v1/payment_methods`,
      {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`, 
        },
        params: {
          customer: customerId, 
          type: 'card',  
        },
      }
    );

    if (response.data && response.data.data) {
      return response.data.data
    } else {
      return {error: "Failed to fetch payment methods."}
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
}

export const attachPaymentMethodToCustomer = async (paymentMethodId,customerId) => {
  try {
    const response = await axios.post(
      'https://api.stripe.com/v1/payment_methods/' + paymentMethodId + '/attach',
      {
        customer: customerId,
      },
      {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`, 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.data.id) {
      return response.data.id
    }else {
      return {error: "Failed to attach payment method"}
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
};

export const createCardPaymentMethod = async(card_details,createPaymentMethod) => {
  try {
    const { error, paymentMethod } = await createPaymentMethod({
      paymentMethodType: 'Card', 
      card: card_details,
    });
    if (error) {
      return {error: error.message}
    }else{
      return paymentMethod.id
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
}

export const confirmPayment = async(paymentIntentId,paymentMethodId) =>{
  try {
    const response = await axios.post(
      'https://api.stripe.com/v1/payment_intents/' + paymentIntentId + '/confirm', 
      new URLSearchParams({
        payment_method: paymentMethodId, 
      }).toString(),
      {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if(response.data){
      return response.data
    }else{
      return {error: "Payment confirmation failed"}
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
}

export const getAllPaymentIntent = async(customerId) =>{
  try {
    const response = await axios.get('https://api.stripe.com/v1/payment_intents', {
      params: { customer: customerId },
      headers: {
        Authorization: `Bearer ${Core.stripe_secret_key}`, 
      },
    });
    if(response.data.data){
      return response.data.data
    }else{
      return {error: ""}
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
}

export const createPaymentIntent = async(params) => {
  try {
    const response = await axios.post(
      'https://api.stripe.com/v1/payment_intents',
      params,
      {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`, 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
  
    if(response.data){
      return response.data.id
    }else{
      return {error: ""}
    }
  } catch (error) {
    return {error: error.response.data.error.code}
  }
}