import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define CreditCardDetails type
interface CreditCardDetails {
  id: string;
  brand: string;
  complete: boolean;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  postalCode: string;
  validCVC: string;
  validExpiryDate: string;
  validNumber: string;
}

// Define state type
interface CreditCardState {
  cards: CreditCardDetails[];
}

const initialState: CreditCardState = {
  cards: [],
};

// Define the slice
const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState,
  reducers: {
    // Action to add a card to the state
    addCard: (state, action: PayloadAction<CreditCardDetails>) => {
      state.cards.push(action.payload);
    },
    
    // Action to reset the cards
    resetCards: (state) => {
      state.cards = [];
    },

    // Action to fetch cards from an API (like Stripe) and process the response
    fetchCards: (state, action: PayloadAction<any>) => {
      console.log('Fetching cards: ', action.payload);

      // Map the incoming data to the CreditCardDetails format
      const mappedCards = action.payload.map((paymentMethod: any) => ({
        id: paymentMethod.id,
        brand: paymentMethod.card.brand, // Extract card brand
        complete: true, // Assuming the card is complete
        expiryMonth: paymentMethod.card.exp_month,
        expiryYear: paymentMethod.card.exp_year,
        last4: paymentMethod.card.last4,
        postalCode: paymentMethod.billing_details.address?.postal_code || '', // Address postal code
        validCVC: 'Valid', // You may want to validate CVC in a real app
        validExpiryDate: 'Valid', // You may want to validate expiry date in a real app
        validNumber: 'Valid', // You may want to validate card number in a real app
      }));

      // Store the mapped cards in the state
      state.cards = mappedCards;
    },
  },
});

export const { addCard, resetCards, fetchCards } = creditCardSlice.actions;
export default creditCardSlice.reducer;