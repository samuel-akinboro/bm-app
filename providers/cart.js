import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeItem: (state, action) => {
      const updatedCart = [...state.cart];
      updatedCart.splice(action.payload.index, 1);
      state.cart = updatedCart;
    },
    incrementDecrementItem: (state, action) => {
      state.cart = [...state.cart].map((item, i) => {
        if(action.payload.index == i) {
          if(action.payload.type === 'increment') {
            item.quantity += 1
          }else{
            if(item.quantity > 1) {
              item.quantity -= 1
            }
          }
          return item;
        }
        return item;
      })
    },
    clear: (state) => {
      state.cart = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, incrementDecrementItem, clear } = cartSlice.actions;

export const totalAmount = (state) => state.cart.cart.reduce((total, item) => total + (item.price * item.quantity), 0)

export default cartSlice.reducer