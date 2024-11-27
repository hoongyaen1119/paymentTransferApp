import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice'; 
import authReducer from './authSlice'; 
import transactionReducer from './transactionSlice'; 

const store = configureStore({
  reducer: {
    creditCard: creditCardReducer,
    auth: authReducer,
    transaction: transactionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;