const STRIPE_PUBLISHABLE_KEY = 'pk_test_51QNV3YLaBrjzRD5YUcvNnXxonnTfxJf1iaJ08ZmIRgQ5y4DyWpF0ZbxGwDNzrpMlo3HBdmyQc2NXxs4lQuU3QFbk00HqljMHEj';
const STRIPE_SECRET_KEY = 'sk_test_51QNV3YLaBrjzRD5YHy2WR3N5fMXwnYfYn2blMsEYisBbCqlyIHfV3zkibTj2uxvxyhL4bpUVkFxXd3A4wBVwZkVO00mCPvYBxT';

const createPaymentMethodAction = async() => {
    try {
      const { error, paymentMethod } = await createPaymentMethod({
        paymentMethodType: 'Card', 
        card: cardDetails,
      });
      if (error) {
        alert(`Error: ${error.message}`);
        return;
      }else{
        return paymentMethod.id
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  }

  const confirmPaymentAction = async() =>{
    const clientSecret = "pi_3QOwx5LaBrjzRD5Y2VVw9m1K_secret_1ZLZI37LbESSu6SaYw1QwncaH"; 
    const { error: confirmError, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodId: "pm_1QNVloLaBrjzRD5YnhAgLKIw",
    });
    console.log("jkdjhsakdhkasda",confirmError)

    if (confirmError) {
      console.log("Payment Confirmation Error:", confirmError);
      alert(`Payment failed: ${confirmError.message}`);
    } else if (paymentIntent) {
      console.log("Payment successful!", paymentIntent);
      alert('Payment Successful!');
    }
  }

  const getAllPaymentIntent = async() =>{
    try {
      const response = await axios.get('https://api.stripe.com/v1/payment_intents', {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`, // Authentication
        },
      });
  
      console.log('Transactions:', response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
    }
  }

  const createPaymentIntentAction = async() => {
    const paymentIntentResponse = await axios.post(
      'https://api.stripe.com/v1/payment_intents',
      {
        amount: parseInt(amount)*100, 
        currency: 'myr',
        payment_method_types: ['card'], 
      },
      {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`, 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    const clientSecret = paymentIntentResponse.data.client_secret;
    return clientSecret
  }