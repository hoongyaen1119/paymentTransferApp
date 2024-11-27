import { checkExistingCustomer, createNewCustomer } from "./auth";
import { 
  fetchPaymentMethod, 
  addPaymentMethodToCustomer, 
  createPaymentMethod,
  submitPayment,
  fetchAllPayment,
  createPayment 
} from "./payment";

// Exporting all functions together as a single object
export default {
  fetchPaymentMethod, 
  addPaymentMethodToCustomer, 
  createPaymentMethod,
  submitPayment,
  fetchAllPayment,
  createPayment,
  checkExistingCustomer,
  createNewCustomer 
};