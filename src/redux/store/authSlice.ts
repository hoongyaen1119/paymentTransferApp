import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state and the types
interface AuthState {
  isSignedIn: boolean;
  user: { username: string; email: string, id: string } | null; // Optional: You can store more user details if needed.
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to sign in the user and set user data
    signIn: (state, action: PayloadAction<{ username: string; email: string, id: string }>) => {
      state.isSignedIn = true;
      state.user = action.payload;
    },

    // Action to sign out the user
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
});

// Export actions
export const { signIn, signOut } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;