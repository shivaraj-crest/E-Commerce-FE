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

  //user products
  filterCategory:[],
  filterBrand:[],
  filterPriceRange:[0,10000],
  filterRatings:0,
  filterSearch:"",
  userCurrentPage:1,
  userItemsPerPage:9

};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

    //Admin slices
    allProducts: (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      // Extract unique categories & brands
      // state.categories = [...new Set(action.payload.products.map((p) => p.category))];
      // state.brands = [...new Set(action.payload.map((p) => p.brand))];
    },
    //call all categories
    allCategories: (state, action) => {
      state.categories = action.payload;
    },
    //call all brands
    allBrands: (state, action) => {
      state.brands = action.payload;
    },
    //search term filter used for both admin and user
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

    //page number for admin use
    stCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    //this is universal
    stRowsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },


    //user products
    stFilterCategory: (state, action) => {
      
      if (!state.filterCategory.includes(action.payload)) {
        state.filterCategory.push(action.payload);
      } else {
        state.filterCategory = state.filterCategory.filter(
          (category) => category !== action.payload
        );
      }
      state.userCurrentPage = 1;
    },
    
    stFilterBrand: (state, action) => {
      if (!state.filterBrand.includes(action.payload)) {
        state.filterBrand.push(action.payload);
      } else {
        state.filterBrand = state.filterBrand.filter(
          (brand) => brand !== action.payload
        );
      }
      state.userCurrentPage = 1;
    },
    stFilterPriceRange: (state, action) => {
      state.filterPriceRange = action.payload;
      state.userCurrentPage = 1;
    },
    stFilterRatings: (state, action) => {
      state.filterRatings = action.payload;
      state.userCurrentPage = 1;
    },
    //user Search
    stUserSearch: (state, action) => {
      state.filterSearch = action.payload;
      state.userCurrentPage = 1;
    },

    //this is for user page use
    stUserCurrentPage: (state, action) => {
      state.userCurrentPage = action.payload;
    },

    //clear filters reducer
    stClearFilters:(state,action)=>{
      state.filterCategory = [];
      state.filterBrand = [];
      state.filterPriceRange = [0, 10000];
      state.filterRatings = 0;
      state.userCurrentPage = 1;
    }
    
  },
});

export const { 
  allProducts,
  allCategories, 
  allBrands, 
  stSearch, 
  stCategory, 
  stBrand, 
  stCurrentPage,
  stRowsPerPage,
  
  //user product actions
  stFilterCategory, 
  stFilterBrand, 
  stFilterPriceRange, 
  stFilterRatings, 
  stUserCurrentPage,
  stUserSearch,
  stClearFilters
 } =
  productSlice.actions;
export default productSlice.reducer;
