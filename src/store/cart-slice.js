import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: { wishListData: [], cartList: [] },
  reducers: {
    handleWishListData(state, action) {
      let { type, currentItem } = action.payload;
      
      if (type === "cartToWishlist") {
        const wishlistItems = currentItem.map((item) => item.item);
        wishlistItems.forEach((item) => {
          let parsedItem = { ...item };
          const isItemExist = state.wishListData.find((apperal) =>
            apperal.id === parsedItem.id ? true : false
          );
          if (!isItemExist) {
            parsedItem.wishlisted = !parsedItem.wishlisted;
            state.wishListData.push(item);
          }
        });
      } else {
        const item = { ...currentItem };
        const isItemExist = state.wishListData.find((apperal) =>
          apperal.id === item.id ? true : false
        );
        if (!isItemExist) {
          item.wishlisted = !item.wishlisted;
          state.wishListData.push(item);
        } else {
          if (item.wishlisted === true) {
            state.wishListData = state.wishListData.filter(
              (_item) => _item.id !== item.id
            );
          }
        }
      }
    },

    handleWishListDataDelete(state, action) {
      const item = { ...action.payload.currentItem };
      state.wishListData = state.wishListData.filter(
        (_item) => _item.id !== item.id
      );
    },
  },
});

export const wishListAction = wishListSlice.actions;

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCartItems(state, action) {
      const cartItem = { ...action.payload.currentItem };
      let newItem;
      if (state.cartItems.length === 0) {
        if(action.payload.isCategoriesSizeAvailable === false){
             newItem = {
                id: action.payload.id,
                quantity: 1,
                totalQuantityPrice: cartItem.price,
                item: { ...cartItem },
              };
        } else {
             newItem = {
                id: action.payload.id,
                quantity: 1,
                size: action.payload.size,
                totalQuantityPrice: cartItem.price,
                item: { ...cartItem },
              };
        }   
        
        state.cartItems.push(newItem);
      } else {
        let itemList = [];
        state.cartItems.forEach((eachIttem) => {
            if(action.payload.isCategoriesSizeAvailable === false && eachIttem.item.id !== cartItem.id){
                const newItem = {
                    id: action.payload.id,
                    quantity: 1,
                    totalQuantityPrice: cartItem.price,
                    item: { ...cartItem },
                  };
                  const isExist = itemList.find((cart) =>
                    cart.id === newItem.id ? true : false
                  );
                  if (!isExist) {
                    itemList.push(newItem);
                  }
            } else {
                if (
                    eachIttem.item.id === cartItem.id &&
                    eachIttem.size !== action.payload.size
                  ) {
                    const newItem = {
                      id: action.payload.id,
                      quantity: 1,
                      size: action.payload.size,
                      totalQuantityPrice: cartItem.price,
                      item: { ...cartItem },
                    };
                    const isExist = itemList.find((cart) =>
                      cart.id === newItem.id ? true : false
                    );
                    if (!isExist) {
                      itemList.push(newItem);
                    }
                  } else if (eachIttem.item.id !== cartItem.id) {
                    const newItem = {
                      id: action.payload.id,
                      quantity: 1,
                      size: action.payload.size,
                      totalQuantityPrice: cartItem.price,
                      item: { ...cartItem },
                    };
                    const isExist = itemList.find((cart) =>
                      cart.id === newItem.id ? true : false
                    );
                    if (!isExist) {
                      itemList.push(newItem);
                    }
                  }
            }

        });
        state.cartItems = [...state.cartItems, ...itemList];
      }
    },

    deleteCartitem(state, action) {
      if (action.payload.type === "checked") {
        action.payload.currentItem.forEach((item) => {
          state.cartItems = state.cartItems.filter(
            (filterItem) => filterItem.id !== item.id
          );
        });
      } else {
        const item = { ...action.payload.currentItem };
        state.cartItems = state.cartItems.filter(
          (_item) => _item.id !== item.id
        );
      }
    },

    handleQuantityInc(state, action) {
      state.cartItems.forEach((item) => {
        if(action.payload.isCategoriesSizeAvailable === false){
            item.quantity++;
          item.totalQuantityPrice += item.item.price;
        } else if(
          item.id === action.payload.currentItem.id &&
          item.size === action.payload.currentItem.size &&
          item.quantity <= 9
        ) {
          item.quantity++;
          item.totalQuantityPrice += item.item.price;
        }
      });
    },
    handleQuantityDec(state, action) {
      state.cartItems.forEach((item) => {
        if(action.payload.isCategoriesSizeAvailable === false){
            item.quantity--;
          item.totalQuantityPrice -= item.item.price;
        } else if (
          item.id === action.payload.currentItem.id &&
          item.size === action.payload.currentItem.size &&
          item.quantity >= 2
        ) {
          item.quantity--;
          item.totalQuantityPrice -= item.item.price;
        }
      });
    },
  },
});

export const cartSliceAction = cartSlice.actions;
