import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage
// const loadCartFromLocalStorage = () => {
//   try {
//     const cartItems = ;
//     return cartItems ? JSON.parse(cartItems) : [];
//   } catch (error) {
//     console.error("Error loading cart from localStorage:", error);
//     return [];
//   }
// };

// Save cart items to localStorage
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: action.payload.product._id,
        product: action.payload.product._id,
        name: action.payload.product.name,
        image: action.payload.product.images[0].url,
        quantity: action.payload.quantity || 1,
        stock: action.payload.product.stock,
        price: action.payload.product.price,
      };

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        if (newItem.stock === existingItem.stock) {
          existingItem.quantity;
        } else {
          existingItem.quantity++;
        }
      } else {
        state.cartItems.push(newItem);
      }

      saveCartToLocalStorage(state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const itemToUpdate = state.cartItems.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      saveCartToLocalStorage(state.cartItems);
    },

    removeItem: (state, action) => {
      console.log(action);
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      saveCartToLocalStorage(state);
    },

    addShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  },
});

// export actions
export const { addItem, updateQuantity, removeItem, addShippingInfo } =
  cartSlice.actions;

// export default
export default cartSlice.reducer;
