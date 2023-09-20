import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brand: null,
  priceRange: null,
  sortBy: null,
  gender: null,
  color: null,
  activeFilters: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    brand: (state, action) => {
      state.brand = action.payload;
      state.activeFilters = Array.from(new Set([...state.activeFilters, 'brand'])); //remove duplicated filter
    },
    priceRange: (state, action) => {
      state.priceRange = action.payload;
      state.activeFilters = Array.from(new Set([...state.activeFilters, 'priceRange'])); //remove duplicated filter
    },
    sortBy: (state, action) => {
      state.sortBy = action.payload;
      state.activeFilters = Array.from(new Set([...state.activeFilters, 'sortBy'])); //remove duplicated filter
    },
    gender: (state, action) => {
      state.gender = action.payload;
      state.activeFilters = Array.from(new Set([...state.activeFilters, 'gender'])); //remove duplicated filter
    },
    color: (state, action) => {
      state.color = action.payload;
      state.activeFilters = Array.from(new Set([...state.activeFilters, 'color'])); //remove duplicated filter
    },
    reset: (state) => {
      state.brand = null;
      state.priceRange = null;
      state.sortBy = null;
      state.gender = null;
      state.color = null;
      state.activeFilters = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { brand, priceRange, sortBy, gender, color, reset } = filterSlice.actions

export default filterSlice.reducer