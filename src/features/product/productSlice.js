import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  brands: [],
  searchTerm: "",
  selectedCategory: "",
  selectedBrand: "",
  currentPage: 1,
  itemsPerPage: 5,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      
      // Extract unique categories & brands
      // state.categories = [...new Set(action.payload.products.map((p) => p.category))];
      // state.brands = [...new Set(action.payload.map((p) => p.brand))];
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setSearchTerm: (state, action) => {
 
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload.products.category_id;
      state.currentPage = 1;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload.products.brand_id;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setProducts, setSearchTerm, setSelectedCategory, setSelectedBrand, setCurrentPage } =
  productSlice.actions;
export default productSlice.reducer;
