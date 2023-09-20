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
      state.cart = state.cart.filter(item => item.id != action.payload.id)
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
export const { addItem, removeItem, incrementDecrementItem, clear } = cartSlice.actions

export default cartSlice.reducer