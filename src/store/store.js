import { configureStore } from "@reduxjs/toolkit";
import {wishListSlice, cartSlice } from "./cart-slice";

const store = configureStore({
    reducer: {wishlist: wishListSlice.reducer, cart: cartSlice.reducer}
});

export default store;