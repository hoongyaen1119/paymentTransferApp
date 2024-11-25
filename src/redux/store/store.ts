import { configureStore } from '@reduxjs/toolkit';
import creditCardReducer from './creditCardSlice'; 

const store = configureStore({
  reducer: {
    creditCard: creditCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;