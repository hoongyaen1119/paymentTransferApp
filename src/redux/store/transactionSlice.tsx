// redux/transactionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  customer: string;
  created: string;
  recipientName: string
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<any>) => {
      const mappedTransactions = action.payload.map((transaction: any) => ({
        id: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        description: transaction.description,
        status: transaction.status,
        customer: transaction.customer,
        created: transaction.created,
        recipientName: transaction.metadata.recipient_name
      }));
      state.transactions = mappedTransactions;
    },
  },
});

export const { setTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;