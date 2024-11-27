import axios from "axios";
import Core from '../core/core'; 

export const checkCustomerExists = async (email) => {  
    try {
      const response = await axios.get('https://api.stripe.com/v1/customers', {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`,
        },
        params: {
          email: email,
        },
      });
      return response.data.data.length > 0;
    } catch (error) {
      return {error: "Error checking customer existence"}
    }
  };
  
  
  export const createCustomer = async(params) => {
    try {
      const response = await axios.post(
        'https://api.stripe.com/v1/customers', 
        new URLSearchParams(params).toString(),
        {
          headers: {
            Authorization: `Bearer ${Core.stripe_secret_key}`, 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
        }
      );
      if(response.data){
        return response.data.id
      }
    } catch (error) {
      return {error: "Failed to create customer"}
    }
  }

  export const getCustomerIdByEmail = async(email) => {
    try {
      const response = await axios.get('https://api.stripe.com/v1/customers', {
        headers: {
          Authorization: `Bearer ${Core.stripe_secret_key}`,
        },
        params: {
          email: email, 
        },
      });
  
      if (response.data.data && response.data.data.length > 0) {
        const customer = response.data.data[0]; 
        return customer.id
      } else {
        return {error: "No customer found with that email"}
      }
    } catch (error) {
      return {error: "Failed to fetch customer"}
    }
  }

  