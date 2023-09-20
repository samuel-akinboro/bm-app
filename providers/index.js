import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filter'
import cartReducer from './cart'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer
  },
})