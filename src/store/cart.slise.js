import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromStorage(),
  reducers: {
    addItem: (state, action) => {
      const exists = state.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeItem: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
