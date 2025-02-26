import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  searchQuery: "",
  selectedCategory: "",
  selectedBrand: "",
  currentPage: 0,
  itemsPerPage: 10,
  totalProducts:0,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      // Extract unique categories & brands
      // state.categories = [...new Set(action.payload.products.map((p) => p.category))];
      // state.brands = [...new Set(action.payload.map((p) => p.brand))];
    },
    //set all categories
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
    //set all brands
    allBrands: (state, action) => {
      state.brands = action.payload;
    },
    //search term filter
    stSearch: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 0;
    },
    //selected category filter
    stCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 0;
    },
    //selected brand filter
    stBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.currentPage = 0;
    },
    //page number
    stCurrentPage: (state, action) => {
      state.currentPage = action.payload-1;
    },
    stRowsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    }

   
    
  },
});

export const { allProducts, allCategories, allBrands, stSearch, stCategory, stBrand, stCurrentPage,stRowsPerPage } =
  productSlice.actions;
export default productSlice.reducer;
