import { checkCustomerExists, createCustomer, getCustomerIdByEmail } from "./auth";
import { 
    getPaymentMethodByCustomerId, 
    getAllPaymentIntent, 
    attachPaymentMethodToCustomer,
    createCardPaymentMethod,
    confirmPayment,
    createPaymentIntent 
} from "./payment";

// Exporting all functions together as a single object
export default {
    getAllPaymentIntent,
    getPaymentMethodByCustomerId,
    attachPaymentMethodToCustomer,
    createCardPaymentMethod,
    confirmPayment,
    createPaymentIntent,
    checkCustomerExists,
    createCustomer,
    getCustomerIdByEmail
};