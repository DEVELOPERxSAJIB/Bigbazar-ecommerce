import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/productSlice';
import authSlice from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';
import productsListSlice from '../features/productsList/productsListSlice';
import orderSlice from '../features/order/orderSlice';
import orderListSlice from '../features/orderList/orderListSlice';
import usersListSlice from '../features/usersList/usersListSlice';
import reviewsListSlice from '../features/reviewsList/reviewsListSlice';
import brandSlice from "../features/brand/brandSlice"
import categorySlice from "../features/category/categorySlice"
import bannerSlice from "../features/banner/bannerSlice"

export const store = configureStore({
  reducer: {
    product : productSlice,
    banner : bannerSlice,
    brand : brandSlice,
    category : categorySlice,
    auth : authSlice,
    cart : cartSlice,
    order : orderSlice,
    productsList : productsListSlice,
    ordersList : orderListSlice,
    usersList : usersListSlice,
    reviewsList : reviewsListSlice
  },
});
