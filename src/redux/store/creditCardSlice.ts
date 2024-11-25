import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CreditCardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface CreditCardState {
  cards: CreditCardDetails[];
}

const initialState: CreditCardState = {
  cards: [],
};

const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CreditCardDetails>) => {
      state.cards.push(action.payload);
    },
    resetCards: (state) => {
      state.cards = [];
    },
  },
});

export const { addCard, resetCards } = creditCardSlice.actions;
export default creditCardSlice.reducer;